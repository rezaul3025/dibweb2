# core/user/serializers.py
from rest_framework import serializers

from backend.models import Attendee, Event, ContactUs, Toggle


class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendee
        fields = ['id','name', 'email', 'phone','ticket_info','price','total_attendees','data_privacy_st_confirm','is_email_send','payment_type','is_payment_confirm','creation_date','payment_reference','is_checked_in','event']
        read_only_field = ['creation_date']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id','title', 'description', 'poster_image', 'address', "map_location", "enabled","place","event_datetime","attendee_limit","attendee_count"]

class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = ['name', 'email', 'phone','subject', 'message']

class ToggleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Toggle
        fields = ['name', 'enabled']
