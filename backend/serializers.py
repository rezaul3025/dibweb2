# core/user/serializers.py
from rest_framework import serializers

from backend.models import Attendee, Event


class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendee
        fields = ['id','name', 'email', 'phone','ticket_info','price','data_privacy_st_confirm','is_email_send','payment_type','is_payment_confirm','creation_date','event']
        read_only_field = ['creation_date']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id','title', 'description', 'poster_image', 'address', "map_location", "event_datetime"]
