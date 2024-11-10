import json
import urllib

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.SendEmail import SendEmail
from backend.models import Event, Attendee, Toggle
from backend.serializers import AttendeeSerializer, EventSerializer, ContactUsSerializer, ToggleSerializer


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