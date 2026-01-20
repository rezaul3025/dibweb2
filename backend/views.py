import json
import logging
import re
import urllib
from decimal import Decimal
from http.client import HTTPException

import requests
from bs4 import BeautifulSoup
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from django.db import transaction
from django.db.models.query_utils import Q
from django.http import JsonResponse
from django.http.response import HttpResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from backend.SendEmail import SendEmail
from backend.models import Event, Attendee, Toggle, StudentClass, Teacher, Shift, DownloadItem, NoticeBoardItem, \
    Notification, LabelCategory, PaymentLine
from backend.serializers import AttendeeSerializer, EventSerializer, ContactUsSerializer, ToggleSerializer, \
    StudentSerializer, StudentClassSerializer, TeacherSerializer, ShiftSerializer, DownloadItemSerializer, \
    NoticeBoardItemSerializer, NotificationSerializer, LabelCategorySerializer
from .models import Payment, Student
from .serializers import PaymentSerializer
from .utils.pdf_generator import generate_payment_receipt
from .utils.require_header import require_header

logger = logging.getLogger(__name__)

@api_view(['POST'])
#@csrf_exempt
def attendee_save(request):
    try:
        event = Event.objects.get(id=request.data['event'], enabled=True)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    if event.attendee_count > event.attendee_limit:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    serializer = AttendeeSerializer(data=request.data)
    # print(request.data['recap_token'])
    # if Attendee.objects.filter(email=request.data['email']).first():
    #    content = {'error': 'duplicate_error'}
    #    return Response(content, status=status.HTTP_409_CONFLICT)
    if serializer.is_valid() and is_recaptcha_valid(request.data):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def attendee_update_after_success(request, attendee_id, payment_reference, event_id):
    event=Event.objects.get(id=event_id)
    attendee = Attendee.objects.get(id=attendee_id)
    attendee.payment_reference = payment_reference
    attendee.is_payment_confirm = True
    attendee.is_email_send = True
    attendee.payment_type = 'PP'

    email = SendEmail()
    email.ticket_confirmation(attendee,event)
    attendee_count = event.attendee_count + attendee.total_attendees
    event.attendee_count = attendee_count
    event.save()
    attendee.save()

    if not attendee:
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(AttendeeSerializer(attendee).data, status=status.HTTP_200_OK)


@api_view(['GET'])
def attendee_attendee_verification(request, attendee_id, payment_reference):
    try:
        attendee = Attendee.objects.get(id=attendee_id, payment_reference=payment_reference, is_payment_confirm=True)
    except Attendee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(AttendeeSerializer(attendee).data, status=status.HTTP_200_OK)


@api_view(['GET'])
def attendee_by_id(request, attendee_id):
    try:
        attendee = Attendee.objects.get(id=attendee_id)
    except Attendee.DoesNotExist:
        return Response(Attendee.objects.none(),status=status.HTTP_404_NOT_FOUND)
    serializer = AttendeeSerializer(attendee)
    return Response(serializer.data)

@api_view(['GET'])
def events(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def event_by_id(request, event_id):
    event = Event.objects.get(id=event_id)
    serializer = EventSerializer(event)
    return Response(serializer.data)

@api_view(['POST'])
def contact_us(request):
    serializer = ContactUsSerializer(data=request.data)
    if serializer.is_valid() and is_recaptcha_valid(request.data):
        serializer.save()
        return Response(status=status.HTTP_201_CREATED, data=serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def allToggles(request):
    toggles = Toggle.objects.all()
    serializer = ToggleSerializer(toggles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def resend_email_incomplete_payment(request, attendee_id):
    try:
        attendee=Attendee.objects.get(id=attendee_id)
    except Attendee.DoesNotExist:
        return Response(Attendee.objects.none(), status=status.HTTP_404_NOT_FOUND)

    if attendee.is_email_send and attendee.is_payment_confirm and attendee.payment_reference is not None:
        return JsonResponse({'message':'You have already purchased the ticket'}, status=status.HTTP_409_CONFLICT)

    try:
        event=Event.objects.get(id=attendee.event.id)
    except Event.DoesNotExist:
        return Response(Event.objects.none(), status=status.HTTP_404_NOT_FOUND)

    sendEmail = SendEmail()
    sendEmail.resend_ticket_purchase_email(attendee, event)
    return JsonResponse(data={'message':'Resend purchase link successfully !'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def mark_as_checked_in(request, attendee_id):
    try:
        attendee=Attendee.objects.get(id=attendee_id)
    except Attendee.DoesNotExist:
        return Response(Attendee.objects.none(), status=status.HTTP_404_NOT_FOUND)

    if not attendee.is_checked_in:
        attendee.is_checked_in = True
        attendee.save()
        return JsonResponse({'message': 'Checked in !'}, status=status.HTTP_200_OK)
    return JsonResponse({'message': 'Somethings went wrong! Cannot checked In ! Maybe already checked in'}, status=status.HTTP_409_CONFLICT)

@api_view(['GET'])
def prayer_times(request, mosque_id):
    print(mosque_id)
    r = requests.get(f"https://mawaqit.net/en/{mosque_id}")
    if r.status_code == 200:
        soup = BeautifulSoup(r.text, 'html.parser')
        script = soup.find('script', string=re.compile(r'let confData = (.*?);', re.DOTALL))
        if script:
            mawaqit = re.search(r'let confData = (.*?);', script.string, re.DOTALL)
            if mawaqit:
                conf_data_json = mawaqit.group(1)
                conf_data = json.loads(conf_data_json)
                return JsonResponse(conf_data, status=status.HTTP_200_OK)
            else:
                print("Failed to extract confData JSON")
                raise HTTPException(status_code=500, detail=f"Failed to extract confData JSON for {mosque_id}")
        else:
            print("Script containing confData not found.")
            raise HTTPException(status_code=500, detail=f"Script containing confData not found for {mosque_id}")
    if r.status_code == 404:
        raise HTTPException(status_code=404, detail=f"{mosque_id} not found")


def resend_email_with_qrcode(request, attendee_id):
    try:
        attendee = Attendee.objects.get(id=attendee_id)
    except Attendee.DoesNotExist:
        return Response(Attendee.objects.none(), status=status.HTTP_404_NOT_FOUND)

    try:
        event = Event.objects.get(id=attendee.event.id)
    except Event.DoesNotExist:
        return Response(Event.objects.none(), status=status.HTTP_404_NOT_FOUND)

    sendEmail = SendEmail()
    sendEmail.ticket_confirmation(attendee, event)
    return JsonResponse({'message':'Resend ticket with qrcode sent successfully !'}, status=status.HTTP_200_OK)



def is_recaptcha_valid(request_data):
    ''' Begin reCAPTCHA validation '''
    recaptcha_response = request_data['recap_token']
    url = 'https://www.google.com/recaptcha/api/siteverify'
    values = {
        'secret': '6Ldjm20aAAAAAEiOtGssFr9w7JCefe2UVkPIK5Uy',
        'response': recaptcha_response
    }
    data = urllib.parse.urlencode(values).encode()
    req =  urllib.request.Request(url, data=data)
    response = urllib.request.urlopen(req)
    result = json.loads(response.read().decode())
    ''' End reCAPTCHA validation '''
    return result['success'];

@api_view(['GET'])
def allStudents(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def allStudentBySearch(request, search_params):
    students = Student.objects.filter(Q(first_name__icontains=search_params) | Q(last_name__icontains=search_params))
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def studentsByClass(request, class_id):
    students = Student.objects.filter(classes__id=class_id)
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def studentsByTeacher(request, teacher_id):
    classes = StudentClass.objects.filter(teachers__id=teacher_id)
    students = Student.objects.filter(classes__in=classes)
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def studentsByShift(request, shift_id):
    students = Student.objects.filter(shift__id=shift_id)
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@require_header()
def allClasses(request):
    classes = StudentClass.objects.all()
    serializer = StudentClassSerializer(classes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def allTeachers(request):
    teaches = Teacher.objects.all()
    serializer = TeacherSerializer(teaches, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@require_header()
def allShifts(request):
    shifts = Shift.objects.all()
    serializer = ShiftSerializer(shifts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@require_header()
def labelCategories(request):
    labelCategoryData = LabelCategory.objects.all()
    serializer = LabelCategorySerializer(labelCategoryData, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def noticeBoard(request):
    notice_board_items= NoticeBoardItem.objects.all()
    serializer = NoticeBoardItemSerializer(notice_board_items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def downloadItems(request, department):
    downloads = DownloadItem.objects.filter(department=department)
    serializer = DownloadItemSerializer(downloads, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def notification(request):
    notifications = Notification.objects.all()
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@require_header()
#@csrf_exempt
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    #print(username)
    user = authenticate(request, username=username, password=password)
    print(user)
    if user is not None:
        login(request, user)
        token = Token.generate_key()
        print(token)
        #return JsonResponse({'token': token})
        return JsonResponse(data={
            'token': token
        }, status=200)
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

#@api_view(['POST'])
@require_header()
@csrf_exempt
def logout_user(request):
    print('test logout')
    logout(request)
    return JsonResponse({'message': 'Logged out'}, status=200)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])  # or IsAuthenticated for secure endpoints
def record_student_payment(request):
    """
    Create or update a student's payment record for a specific month/year.
    """
    student_id = request.data.get('student')
    year = int(request.data.get('year', timezone.now().year))
    month = int(request.data.get('month', timezone.now().month))

    try:
        student = Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        return Response({"error": "Student not found."}, status=status.HTTP_404_NOT_FOUND)

    payment_data = {
        "student": student.id,
        "year": year,
        "month": month,
        "expected_amount": request.data.get("expected_amount", "0.00"),
        "paid_amount": request.data.get("paid_amount", "0.00"),
        "payment_date": request.data.get("payment_date", timezone.now().date()),
        "payment_method": request.data.get("payment_method", "cash"),
        "notes": request.data.get("notes", "")
    }

    # Check if payment record already exists
    payment, created = Payment.objects.get_or_create(
        student=student, year=year, month=month,
        defaults=payment_data
    )

    # If existing, update it
    if not created:
        serializer = PaymentSerializer(payment, data=payment_data, partial=True)
    else:
        serializer = PaymentSerializer(payment)

    # If updating, validate and save
    if not created:
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Re-fetch to return updated values
    serializer = PaymentSerializer(payment)
    message = "Payment created." if created else "Payment updated."

    return Response(
        {"message": message, "payment": serializer.data},
        status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
    )

@api_view(['POST'])
@require_header()
@authentication_classes([])
@permission_classes([])
def add_student(request):
    print(request.data)
    # Expect application/json
    if request.content_type != "application/json":
        return JsonResponse(
            {"error": "Content-Type must be application/json"},
            status=415
        )

    payload = request.data  # ✅ DRF-parsed data (JSON, form, multipart)
    print(payload)

    # Required fields
    missing = [f for f in ["first_name", "last_name", "shift"]
               if not payload.get(f)]
    if missing:
        return Response({"error": f"Missing: {', '.join(missing)}"},
                        status=status.HTTP_400_BAD_REQUEST)

    # Related objects
    shift = get_object_or_404(Shift, pk=payload["shift"])
    label_category = getLabelCategory(payload["label_category"])
    class_ids = payload.get("classes", [])
    if class_ids and not isinstance(class_ids, list):
        return Response({"error": "class_ids must be a list of IDs"},
                        status=status.HTTP_400_BAD_REQUEST)
    classes_qs = StudentClass.objects.filter(pk__in=class_ids)
    if class_ids and classes_qs.count() != len(set(class_ids)):
        return Response({"error": "One or more class_ids are invalid"},
                        status=status.HTTP_400_BAD_REQUEST)

    # Create
    with transaction.atomic():
        student = Student.objects.create(
            student_id=payload.get("student_id", ""),
            first_name=payload.get("first_name", ""),
            last_name=payload.get("last_name", ""),
            guardian_name=payload.get("guardian_name", ""),
            address=payload.get("address", ""),
            email=payload.get("email", ""),
            date_of_birth=payload.get("date_of_birth", ""),
            phone_number=payload.get("phone_number", ""),
            shift=shift,
            label_category = label_category,
            has_siblings=bool(payload.get("has_siblings", False)),  # note: "siblings"
            monthly_fee=int(payload.get("monthly_fee", 0)),
            status=payload.get("status", ""),
            payment_status=payload.get("payment_status", "pending"),
        )
        if class_ids:
            student.classes.set(classes_qs)

    return Response({
        "id": student.id,
        "student_id": student.student_id,
        "first_name": student.first_name,
        "last_name": student.last_name,
        "address": student.address,
        "email": student.email,
        "phone_number": student.phone_number,
        "shift": student.shift.id,
        "classes": list(student.classes.values_list("id", flat=True)),
        "siblings": student.has_siblings,
        "monthly_fee": student.monthly_fee,
    }, status=status.HTTP_201_CREATED)

def getLabelCategory(id):
    try:
        return LabelCategory.objects.get(id=id)
    except ObjectDoesNotExist:
        return None

@api_view(['POST'])
@csrf_exempt
@require_header()
@authentication_classes([])
@permission_classes([])
def add_payment(request):
    try:
        # Parse request data
        try:
            data = json.loads(request.body)
            print(data)
        except json.JSONDecodeError:
            return JsonResponse({
                'error': 'Invalid JSON format'
            }, status=400)

        # Validate required fields
        validation_errors = validate_request_data(data)
        if validation_errors:
            return JsonResponse({
                'error': 'Validation failed',
                'details': validation_errors
            }, status=400)

        # Create payment with transaction to ensure atomicity
        with transaction.atomic():
            # Create Payment instance
            payment = create_payment(data)

            # Create PaymentLine instances
            payment_lines_data = data.get('payment_lines', [])
            payment_lines = create_payment_lines(payment, payment_lines_data)

            # Update payment status based on payment lines
            payment.update_status()

            # Prepare response data
            response_data = prepare_response_data(payment, payment_lines)

            return JsonResponse(response_data, status=201)

    except Student.DoesNotExist:
        return JsonResponse({
            'error': 'Student not found'
        }, status=404)
    except ValidationError as e:
        return JsonResponse({
            'error': 'Data validation failed',
            'details': e.message_dict if hasattr(e, 'message_dict') else str(e)
        }, status=400)
    except Exception as e:
        logger.error(f"Error creating payment: {str(e)}", exc_info=True)
        return JsonResponse({
            'error': 'Internal server error',
            'details': str(e)
        }, status=500)

def validate_request_data(data):
    """Validate the incoming request data"""
    errors = {}

    # Validate student_id
    student_id = data.get('student_id')
    if not student_id:
        errors['student_id'] = 'Student ID is required'
    elif not isinstance(student_id, int):
        errors['student_id'] = 'Student ID must be an integer'

    # Validate payment_method
    payment_method = data.get('payment_method', 'CASH')
    valid_payment_methods = [choice[0] for choice in Payment.PAYMENT_METHODS]
    if payment_method not in valid_payment_methods:
        errors['payment_method'] = f'Invalid payment method. Must be one of: {", ".join(valid_payment_methods)}'

    # Validate status if provided
    status = data.get('status', 'PENDING')
    valid_statuses = [choice[0] for choice in Payment.STATUS_CHOICES]
    if status not in valid_statuses:
        errors['status'] = f'Invalid status. Must be one of: {", ".join(valid_statuses)}'

    # Validate payment_lines
    payment_lines = data.get('payment_lines', [])
    if not payment_lines:
        errors['payment_lines'] = 'At least one payment line is required'
    else:
        for i, line in enumerate(payment_lines):
            line_errors = validate_payment_line(line)
            if line_errors:
                errors[f'payment_lines.{i}'] = line_errors

    return errors

def validate_payment_line(line_data):
    """Validate a single payment line"""
    errors = {}

    # Validate type
    line_type = line_data.get('type')
    valid_types = [choice[0] for choice in PaymentLine.TYPE_CHOICES]
    if not line_type:
        errors['type'] = 'Type is required'
    elif line_type not in valid_types:
        errors['type'] = f'Invalid type. Must be one of: {", ".join(valid_types)}'

    # Validate expected_amount
    expected_amount = line_data.get('expected_amount')
    if expected_amount is None:
        errors['expected_amount'] = 'Expected amount is required'
    else:
        try:
            expected_amount_decimal = Decimal(str(expected_amount))
            if expected_amount_decimal <= 0:
                errors['expected_amount'] = 'Expected amount must be greater than 0'
        except:
            errors['expected_amount'] = 'Expected amount must be a valid number'

    # Validate paid_amount
    paid_amount = line_data.get('paid_amount', 0)
    try:
        paid_amount_decimal = Decimal(str(paid_amount))
        if paid_amount_decimal < 0:
            errors['paid_amount'] = 'Paid amount cannot be negative'

        # Validate paid_amount doesn't exceed expected_amount
        if expected_amount and paid_amount_decimal > Decimal(str(expected_amount)):
            errors['paid_amount'] = 'Paid amount cannot exceed expected amount'
    except:
        errors['paid_amount'] = 'Paid amount must be a valid number'

    # Validate month if provided
    month = line_data.get('month')
    if month is not None:
        if not isinstance(month, int) or month < 1 or month > 12:
            errors['month'] = 'Month must be between 1 and 12'

    # Validate year if provided
    year = line_data.get('year', timezone.now().year)
    if not isinstance(year, int) or year < timezone.now().year - 5 or year > timezone.now().year + 5:
        errors['year'] = 'Year is invalid'

    return errors

def create_payment(data):
    """Create a Payment instance"""
    student = Student.objects.get(id=data['student_id'])

    payment = Payment.objects.create(
        student=student,
        payment_method=data.get('payment_method', 'CASH'),
        status=data.get('status', 'PENDING'),
        notes=data.get('notes')
    )

    return payment

def create_payment_lines(payment, payment_lines_data):
    """Create PaymentLine instances"""
    payment_lines = []

    for line_data in payment_lines_data:
        payment_line = PaymentLine.objects.create(
            payment_ref=payment,
            type=line_data['type'],
            expected_amount=Decimal(str(line_data['expected_amount'])),
            paid_amount=Decimal(str(line_data.get('paid_amount', 0))),
            month=line_data.get('month'),
            year=line_data.get('year', timezone.now().year)
        )
        payment_lines.append(payment_line)

    return payment_lines

def prepare_response_data(payment, payment_lines):
    """Prepare response data structure"""
    return {
        'id': payment.id,
        'student_id': payment.student.id,
        'student_name': str(payment.student),
        'created_date': payment.created_date.isoformat(),
        'payment_method': payment.payment_method,
        'payment_method_display': payment.get_payment_method_display(),
        'status': payment.status,
        'status_display': payment.status_display,
        'notes': payment.notes,
        'total_paid_amount': float(payment.total_paid_amount),
        'total_expected_amount': float(payment.total_expected_amount),
        'is_fully_paid': payment.is_fully_paid,
        'receipt_number': payment.receipt_number,
        'payment_for': payment.payment_for,
        'payment_lines': [
            {
                'id': line.id,
                'type': line.type,
                'type_display': line.get_type_display(),
                'expected_amount': float(line.expected_amount),
                'paid_amount': float(line.paid_amount),
                'remaining_amount': float(line.remaining_amount),
                'payment_percentage': line.payment_percentage,
                'is_fully_paid': line.is_fully_paid,
                'month': line.month,
                'month_display': line.get_month_display() if line.month else None,
                'year': line.year,
                'title': line.title,
                'created_at': line.created_at.isoformat()
            }
            for line in payment_lines
        ]
    }

@require_header()
def findStudentById(request, student_id):
    """Find student by id"""
    try:
        student = Student.objects.get(id=student_id)
        serializer = StudentSerializer(student)
        return JsonResponse(serializer.data)
    except Student.DoesNotExist:
        return JsonResponse(
            {"error": "Student not found"},
            status=status.HTTP_404_NOT_FOUND
        )

@require_header()
def studentStatusChange(request, student_id):
    """Student status update by id"""
    status = request.GET.get('status', '').strip()
    try:
        student = Student.objects.get(id=student_id)
        student.status = status
        student.save()
        serializer = StudentSerializer(student)
        return JsonResponse(serializer.data)
    except Student.DoesNotExist:
        return JsonResponse(
            {"error": "Can't update status, student not found"},
            status=status.HTTP_404_NOT_FOUND
        )

@require_header()
def updateStudentPaymentStatus(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
        student.payment_status = getPaymentStatus(student.payments)
        student.save()
        serializer = StudentSerializer(student)
        return JsonResponse(serializer.data)
    except Student.DoesNotExist:
        return JsonResponse(
            {"error": "Can't update status, student not found"},
            status=status.HTTP_404_NOT_FOUND
        )

def getPaymentStatus(payments):
    total = payments.count()
    paid = payments.filter(status="PAID").count()
    if total > 0 and total == paid:
        return "PAID"
    elif paid > 0:
        return "PARTIAL"
    else:
        return "UNPAID"


@api_view(['GET'])
@require_header()
def payment_receipt(request, payment_id):
    try:
        """Generate payment receipt"""
        payment = Payment.objects.get(id=payment_id)
        buffer = generate_payment_receipt(payment)

        filename = f"receipt_{payment.student.first_name}_{payment.receipt_number}.pdf"
        response = HttpResponse(buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response
    except Payment.DoesNotExist:
        return JsonResponse({"error": "Payment not found"},
            status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def check_student_id_duplicate(request):
    """
    Check if student_id already exists
    Example: GET /api/v1/check-academy-id/?student_id=ACD202412345
    """
    student_id = request.GET.get('student_id', '').strip()

    if not student_id:
        return Response({
            'success': False,
            'message': 'student_id parameter is required',
            'is_duplicate': False,
            'suggestions': []
        }, status=status.HTTP_400_BAD_REQUEST)

    # Check for exact match
    exists = Student.objects.filter(student_id__iexact=student_id).exists()

    # Find similar IDs for suggestions
    similar_ids = []
    if not exists:
        # Find IDs with similar patterns
        similar_ids = Student.objects.filter(
            Q(student_id__icontains=student_id[:4]) |  # First 4 chars
            Q(student_id__iregex=r'^{}\d+$'.format(re.escape(student_id.rstrip('0123456789'))))  # Same prefix
        ).values_list('student_id', flat=True)[:5]

    return Response({
        'success': True,
        'message': 'Duplicate check completed',
        'is_duplicate': exists,
        'student_id': student_id,
        'similar_existing_ids': list(similar_ids),
        'count': Student.objects.filter(student_id__iexact=student_id).count()
    }, status=status.HTTP_200_OK)