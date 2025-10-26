import re

import json
import urllib
from http.client import HTTPException

import requests
from bs4 import BeautifulSoup
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.SendEmail import SendEmail
from backend.models import Event, Attendee, Toggle, Student, StudentClass, Teacher, Shift, AcademyNoticeBoard, \
    DownloadItem, NoticeBoardItem, Notification
from backend.serializers import AttendeeSerializer, EventSerializer, ContactUsSerializer, ToggleSerializer, \
    StudentSerializer, StudentClassSerializer, TeacherSerializer, ShiftSerializer, AcademyNoticeBoardSerializer, \
    DownloadItemSerializer, NoticeBoardItemSerializer, NotificationSerializer


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