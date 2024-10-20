# core/user/serializers.py
from rest_framework import serializers

from backend.models import Attendee


class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendee
        fields = ['name', 'email', 'phone', 'creation_date']
        read_only_field = ['creation_date']
