# core/user/serializers.py
from rest_framework import serializers

from backend.models import Attendee, Event, ContactUs, Toggle, Student, StudentClass, Teacher, Shift


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

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ['name', 'description']


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['name', 'description']


class StudentClassSerializer(serializers.ModelSerializer):
    teachers = TeacherSerializer(read_only=True, many=True)

    class Meta:
        model = StudentClass
        fields = ['name', 'day','description','teachers']

class StudentSerializer(serializers.ModelSerializer):
    classes = StudentClassSerializer(read_only=True, many=True)
    shift = ShiftSerializer(read_only=True)
    class Meta:
        model = Student
        fields = ['id','first_name', 'last_name','address', 'contact_details','shift','classes','siblings','shift']
