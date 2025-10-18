# core/user/serializers.py
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Payment, Student  # adjust import to your app layout
from decimal import Decimal

from backend.models import Attendee, Event, ContactUs, Toggle, NoticeBoardItem, Student, StudentClass, \
    AcademyNoticeBoard, Teacher, Shift, DownloadItem, Notification


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

class StudentSerializer(serializers.ModelSerializer):
    classes = StudentClassSerializer(read_only=True, many=True)
    shift = ShiftSerializer(read_only=True)
    class Meta:
        model = Student
        fields = ['id','first_name', 'last_name','address', 'contact_details','shift','classes','siblings','shift']

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

class PaymentSerializer(serializers.ModelSerializer):
    # Read-only convenience fields
    month_name = serializers.SerializerMethodField(read_only=True)
    due_amount = serializers.SerializerMethodField(read_only=True)
    student_name = serializers.SerializerMethodField(read_only=True)
    payment_method_display = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Payment
        fields = [
            "id",
            "student",                 # expects student id on write
            "student_name",           # read-only
            "year",
            "month",
            "month_name",             # read-only
            "expected_amount",
            "paid_amount",
            "due_amount",             # read-only
            "payment_date",
            "payment_method",
            "payment_method_display", # read-only
            "status",
            "notes",
        ]
        read_only_fields = ("month_name", "due_amount", "student_name", "payment_method_display")
        validators = [
            UniqueTogetherValidator(
                queryset=Payment.objects.all(),
                fields=["student", "year", "month"],
                message="A payment record for this student/month already exists."
            )
        ]

    # ---------- Read-only helpers ----------
    def get_month_name(self, obj):
        return obj.get_month_display()

    def get_due_amount(self, obj):
        # mirror model property if you have one; otherwise compute safely
        return str(max(Decimal(obj.expected_amount) - Decimal(obj.paid_amount), Decimal("0.00")))

    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}".strip()

    def get_payment_method_display(self, obj):
        return obj.get_payment_method_display() if hasattr(obj, "get_payment_method_display") else obj.payment_method

    # ---------- Validation ----------
    def validate_month(self, value):
        if not 1 <= int(value) <= 12:
            raise serializers.ValidationError("Month must be between 1 and 12.")
        return value

    def validate(self, attrs):
        # Optional: sanity checks on amounts
        expected = Decimal(attrs.get("expected_amount", 0))
        paid = Decimal(attrs.get("paid_amount", 0))
        if expected < 0 or paid < 0:
            raise serializers.ValidationError("Amounts cannot be negative.")
        return attrs

    # ---------- Create / Update (keep status in sync) ----------
    def _sync_status(self, instance):
        # Use model method if available, else inline logic
        if hasattr(instance, "update_status"):
            instance.update_status()
        else:
            expected = Decimal(instance.expected_amount)
            paid = Decimal(instance.paid_amount)
            if paid >= expected and expected > 0:
                instance.status = "paid"
            elif Decimal("0") < paid < expected:
                instance.status = "partial"
            else:
                instance.status = "unpaid"
            instance.save(update_fields=["status"])

    def create(self, validated_data):
        instance = super().create(validated_data)
        self._sync_status(instance)
        return instance

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        self._sync_status(instance)
        return instance
