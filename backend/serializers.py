# core/user/serializers.py
from rest_framework import serializers

from backend.models import Attendee, Event, ContactUs, Toggle, NoticeBoardItem, Student, StudentClass, \
    AcademyNoticeBoard, Teacher, Shift, DownloadItem, Notification
from .models import Payment, PaymentLine


class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendee
        fields = ['id','name', 'email', 'phone','ticket_info','price','total_attendees','data_privacy_st_confirm','is_email_send','payment_type','is_payment_confirm','creation_date','payment_reference','is_checked_in','event']
        read_only_field = ['creation_date']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id','title', 'description', 'poster_image', 'address', "map_location", "enabled","place","event_datetime","attendee_limit","attendee_count", "event_datetime_text", "event_type"]

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
        fields = ['id', 'name', 'description']


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 'name', 'description']


class StudentClassSerializer(serializers.ModelSerializer):
    teachers = TeacherSerializer(read_only=True, many=True)

    class Meta:
        model = StudentClass
        fields = ['id', 'name', 'day','description','teachers']

class NoticeBoardItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoticeBoardItem
        fields = ['title','description','date','document','document_name','document_size']

class AcademyNoticeBoardSerializer(serializers.ModelSerializer):
    documents = NoticeBoardItemSerializer(source='noticeboarddocument_set', many=True)
    class Meta:
        model = AcademyNoticeBoard
        fields = ['documents']

class DownloadItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DownloadItem
        fields = ['document', 'filename', 'filesize', 'date','department']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['headline','image','enabled']

class PaymentLineSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source='get_type_display', read_only=True)
    month_display = serializers.CharField(source='get_month_display', read_only=True)
    is_fully_paid = serializers.ReadOnlyField()
    remaining_amount = serializers.ReadOnlyField()
    payment_percentage = serializers.ReadOnlyField()

    class Meta:
        model = PaymentLine
        fields = [
            'id',
            'payment_ref',
            'paid_amount',
            'expected_amount',
            'created_at',
            'updated_at',
            'type',
            'type_display',
            'month',
            'month_display',
            'year',
            'title',
            'is_fully_paid',
            'remaining_amount',
            'payment_percentage',
        ]
        read_only_fields = [
            'id', 'created_at', 'updated_at', 'title',
            'is_fully_paid', 'remaining_amount', 'payment_percentage',
            'type_display', 'month_display'
        ]

    def validate(self, data):
        # Get current values or use instance values
        paid_amount = data.get('paid_amount')
        expected_amount = data.get('expected_amount')

        # If updating, use existing values for missing fields
        if self.instance:
            if paid_amount is None:
                paid_amount = self.instance.paid_amount
            if expected_amount is None:
                expected_amount = self.instance.expected_amount

        # Ensure amounts are provided
        if paid_amount is None:
            raise serializers.ValidationError({'paid_amount': 'Paid amount is required'})
        if expected_amount is None:
            raise serializers.ValidationError({'expected_amount': 'Expected amount is required'})

        # Convert to float for comparison
        try:
            paid_float = float(paid_amount)
            expected_float = float(expected_amount)
        except (TypeError, ValueError):
            raise serializers.ValidationError({
                'paid_amount': 'Invalid amount format'
            })

        if paid_float > expected_float:
            raise serializers.ValidationError({
                'paid_amount': 'Paid amount cannot exceed expected amount'
            })

        return data


class PaymentSerializer(serializers.ModelSerializer):
    payment_lines = PaymentLineSerializer(many=True, read_only=True)
    total_paid_amount = serializers.ReadOnlyField()
    total_expected_amount = serializers.ReadOnlyField()
    is_fully_paid = serializers.ReadOnlyField()
    payment_method_display = serializers.CharField(source='get_payment_method_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id',
            'student',
            'created_date',
            'payment_method',
            'payment_method_display',
            'payment_for',
            'status',
            'status_display',
            'notes',
            'payment_lines',
            'total_paid_amount',
            'total_expected_amount',
            'is_fully_paid',
        ]
        read_only_fields = ['id', 'created_date']

class StudentSerializer(serializers.ModelSerializer):
    classes = StudentClassSerializer(read_only=True, many=True)
    shift = ShiftSerializer(read_only=True)
    payments = PaymentSerializer(many=True, read_only=True)
    class Meta:
        model = Student
        fields = ['id','first_name', 'last_name','guardian_name','address', 'email','phone_number',
                  'shift','classes','has_siblings','shift','monthly_fee','status','date_of_birth','payment_status','payments']