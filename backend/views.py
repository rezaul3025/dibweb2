from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.SendEmail import SendEmail
from backend.models import Event
from backend.serializers import AttendeeSerializer, EventSerializer


@api_view(['POST'])
def attendee_save(request):
    serializer = AttendeeSerializer(data=request.data)
    print(serializer.is_valid())
    # if Attendee.objects.filter(email=request.data['email']).first():
    #    content = {'error': 'duplicate_error'}
    #    return Response(content, status=status.HTTP_409_CONFLICT)
    if serializer.is_valid():
        email = SendEmail()
        email.sendEmail(request.data)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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