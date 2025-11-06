import json
import re
import urllib
from http.client import HTTPException

import requests
from bs4 import BeautifulSoup
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.utils import timezone
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.core.exceptions import ValidationError

from backend.SendEmail import SendEmail
from backend.models import Event, Attendee, Toggle, StudentClass, Teacher, Shift, DownloadItem, NoticeBoardItem, \
    Notification
from backend.serializers import AttendeeSerializer, EventSerializer, ContactUsSerializer, ToggleSerializer, \
    StudentSerializer, StudentClassSerializer, TeacherSerializer, ShiftSerializer, DownloadItemSerializer, \
    NoticeBoardItemSerializer, NotificationSerializer
from .models import Payment, Student
from .serializers import PaymentSerializer


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
    r = requests.get(f"https://mawaqit.net/en/{mosque_id}")
    if r.status_code == 200:
        soup = BeautifulSoup(r.text, 'html.parser')
        script = soup.find('script', string=re.compile(r'var confData = (.*?);', re.DOTALL))
        if script:
            mawaqit = re.search(r'var confData = (.*?);', script.string, re.DOTALL)
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
def allShifts(request):
    shifts = Shift.objects.all()
    serializer = ShiftSerializer(shifts, many=True)
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
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    print(username)
    user = authenticate(request, username=username, password=password)
    print(user)
    if user is not None:
        login(request, user)
        token = Token.generate_key()
        return Response({
            'token': token
        })
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


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
def add_student(request):
    # Expect application/json
    if request.content_type != "application/json":
        return JsonResponse(
            {"error": "Content-Type must be application/json"},
            status=415
        )

    payload = request.data  # ✅ DRF-parsed data (JSON, form, multipart)

    # Required fields
    missing = [f for f in ["first_name", "last_name", "shift"]
               if not payload.get(f)]
    if missing:
        return Response({"error": f"Missing: {', '.join(missing)}"},
                        status=status.HTTP_400_BAD_REQUEST)

    # Related objects
    shift = get_object_or_404(Shift, pk=payload["shift"])
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
            first_name=payload.get("first_name", ""),
            last_name=payload.get("last_name", ""),
            address=payload.get("address", ""),
            email=payload.get("email", ""),
            phone_number=payload.get("phone_number", ""),
            shift=shift,
            siblings=bool(payload.get("siblings", False)),  # note: "siblings"
            monthly_fee=int(payload.get("monthly_fee", 0)),
        )
        if class_ids:
            student.classes.set(classes_qs)

    return Response({
        "id": student.id,
        "first_name": student.first_name,
        "last_name": student.last_name,
        "address": student.address,
        "email": student.email,
        "phone_number": student.phone_number,
        "shift": student.shift.id,
        "classes": list(student.classes.values_list("id", flat=True)),
        "siblings": student.siblings,
        "monthly_fee": student.monthly_fee,
    }, status=status.HTTP_201_CREATED)