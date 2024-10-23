# core/user/viewsets.py
from datetime import datetime

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from backend.SendEmail import SendEmail
from backend.serializers import AttendeeSerializer, EventSerializer
from backend.models import Attendee, Event


class AttendeeViewSet(APIView):
    attendee_serializer = AttendeeSerializer

    def get(self, request, format=None):
        attendees = Attendee.objects.all()
        serializer = AttendeeSerializer(attendees, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AttendeeSerializer(data=request.data)
        print(serializer.is_valid())
        #if Attendee.objects.filter(email=request.data['email']).first():
        #    content = {'error': 'duplicate_error'}
        #    return Response(content, status=status.HTTP_409_CONFLICT)
        if serializer.is_valid():
            email = SendEmail()
            email.sendEmail(request.data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self, email):
        try:
            return Attendee.objects.get(email=email)
        except Attendee.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        attendee = self.get_object(pk)
        serializer = AttendeeSerializer(attendee)
        return Response(serializer.data)


class EventViewSet(APIView):
    event_serializer = EventSerializer

    def get(self, request, format=None):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def get_object(self, id):
        try:
            return Event.objects.get(id=id)
        except Attendee.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        event = self.get_object(id)
        serializer = self.event_serializer(event)
        return Response(serializer.data)