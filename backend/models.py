import random
import string
from datetime import datetime
from pathlib import Path

from ckeditor.fields import RichTextField
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError


class Event(models.Model):
    EVENT_TYPE_CHOICES = (
        ("None", "None"),
        ("CURRENT", "Current event or activity"),
        ("FUTURE", "Future event or activity"),
    )
    title = models.CharField(max_length=255)
    description = RichTextField()
    poster_image = models.FileField(upload_to='uploads', blank = True)
    place=models.CharField(max_length=255, blank = True)
    address = models.CharField(max_length=255)
    map_location = models.CharField(max_length=255)
    event_datetime = models.DateTimeField(blank = True, default=None)
    event_datetime_text = models.CharField(max_length=255, blank = True)
    enabled = models.BooleanField(default=True)
    attendee_limit = models.IntegerField(default=0)
    attendee_count = models.IntegerField(default=0)
    event_type = models.CharField(max_length=50, choices=EVENT_TYPE_CHOICES, default="CURRENT")

def get_img_upload_path(instance, filename):
        return settings.UPLOAD_PATH

class Attendee(models.Model):
    PAYMENT_TYPE_CHOICES = (
        ("None", "None"),
        ("PP", "PayPal"),
        ("CR", "Credit Card"),
        ("BT", "Bank Transfer"),
        ("CP", "Cash Payment"),
    )
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    ticket_info = models.CharField(max_length=255,blank=True)
    payment_reference = models.CharField(max_length=255, blank=True)
    price = models.CharField(max_length=10)
    creation_date = models.DateTimeField(default=datetime.now)
    is_email_send = models.BooleanField(default=False)
    payment_type = models.CharField(max_length=50, choices=PAYMENT_TYPE_CHOICES, default="None")
    is_payment_confirm = models.BooleanField(default=False)
    data_privacy_st_confirm = models.BooleanField(default=False)
    total_attendees = models.IntegerField(default=0)
    is_checked_in = models.BooleanField(default=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

class ContactUs(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=255, blank=True)
    subject = models.CharField(max_length=255)
    message = models.TextField()

    def __str__(self):
        return f"{self.name},{self.email},{self.phone}, {self.creation_date}"

class Toggle(models.Model):
    name = models.CharField(max_length=255)
    enabled = models.BooleanField(default=False)

class Shift(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return f"{self.name} {self.description}"

class Teacher(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return f"{self.name} {self.description}"

class StudentClass(models.Model):
    name = models.CharField(max_length=255)
    teachers = models.ManyToManyField(Teacher)
    day = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True)
    def __str__(self):
        return f"{self.name} {self.description}"

class LabelCategory(models.Model):
    label = models.CharField(max_length=255)
    category = models.CharField(max_length=255)

class Student(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    guardian_name = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)
    email = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=255, blank=True)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    classes = models.ManyToManyField(StudentClass)
    label_category = models.OneToOneField(LabelCategory, on_delete=models.SET_NULL, null=True, blank=True)
    has_siblings = models.BooleanField(default=False)
    monthly_fee = models.IntegerField(default=0)
    status = models.CharField(default="active", max_length=50)
    date_of_birth = models.DateField(null=True, blank=True)
    payment_status = models.CharField(max_length=50, blank=True)
    class Meta:
        ordering = ["first_name"]

    @property
    def get_classes(self):
        return ",".join([str(c.name) for c in self.classes.all()])

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.address}"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def student_id(self):
        return f"{self.get_classes}_{self.id}"

    @property
    def total_payments_count(self):
        return self.payments.count()

    @property
    def total_amount_paid(self):
        return sum(payment.total_paid_amount for payment in self.payments.all())




class Payment(models.Model):
    PAYMENT_METHODS = [
        ('CASH', 'Cash'),
        ('CARD', 'Credit/Debit Card'),
        ('BANK_TRANSFER', 'Bank Transfer'),
        ('UPI', 'UPI Payment'),
        ('CHEQUE', 'Cheque'),
        ('ONLINE', 'Online Payment'),
        ('OTHER', 'Other'),
    ]

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PAID', 'Paid'),
        ('FAILED', 'Failed'),
        ('PARTIAL', 'Partial'),
        ('REFUNDED', 'Refunded'),
        ('CANCELLED', 'Cancelled'),
    ]

    student = models.ForeignKey(
        'Student',
        on_delete=models.CASCADE,
        related_name='payments'
    )
    created_date = models.DateTimeField(
        default=timezone.now,
        verbose_name=_('Created Date')
    )
    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHODS,
        default='CASH',
        verbose_name=_('Payment Method')
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING',
        verbose_name=_('Status')
    )
    notes = models.TextField(
        blank=True,
        null=True,
        verbose_name=_('Notes'),
        help_text=_('Additional notes or comments')
    )

    class Meta:
        ordering = ['-created_date']
        verbose_name = _('Payment')
        verbose_name_plural = _('Payments')
        indexes = [
            models.Index(fields=['student', 'created_date']),
            models.Index(fields=['status', 'created_date']),
        ]

    def __str__(self):
        return f"Payment #{self.id} - {self.student} - {self.get_status_display()}"

    @property
    def total_paid_amount(self):
        """Calculate total paid amount from all payment lines"""
        try:
            return sum(
                line.paid_amount
                for line in self.payment_lines.all()
                if line.paid_amount is not None
            )
        except (AttributeError, TypeError):
            return 0.00

    @property
    def total_expected_amount(self):
        """Calculate total expected amount from all payment lines"""
        try:
            return sum(
                line.expected_amount
                for line in self.payment_lines.all()
                if line.expected_amount is not None
            )
        except (AttributeError, TypeError):
            return 0.00

    @property
    def is_fully_paid(self):
        """Check if all payment lines are fully paid"""
        try:
            if not self.payment_lines.exists():
                return False

            return all(
                line.is_fully_paid
                for line in self.payment_lines.all()
                if line.paid_amount is not None and line.expected_amount is not None
            )
        except (AttributeError, TypeError):
            return False

    @property
    def status_display(self):
        return dict(self.STATUS_CHOICES).get(self.status, self.status)

    @property
    def receipt_number(self):
        return f"{self.id}_{self.created_date.strftime('%m_%Y')}_{''.join(random.choices(string.ascii_uppercase+string.digits, k=10))}"

    def update_status(self):
        """Update payment status based on payment lines"""
        try:
            if not self.payment_lines.exists():
                self.status = 'PENDING'
            elif self.is_fully_paid:
                self.status = 'PAID'
            elif any(
                    line.paid_amount is not None and
                    line.paid_amount > 0
                    for line in self.payment_lines.all()
            ):
                self.status = 'PARTIAL'
            else:
                self.status = 'PENDING'
            self.save()
        except (AttributeError, TypeError):
            self.status = 'PENDING'
            self.save()

    @property
    def payment_for(self):
        return " ".join([line.title for line in self.payment_lines.all()])



class PaymentLine(models.Model):
    TYPE_CHOICES = [
        ('TUITION', 'Tuition Fee'),
        ('HOSTEL', 'Hostel Fee'),
        ('MESS', 'Mess Fee'),
        ('LIBRARY', 'Library Fee'),
        ('LABORATORY', 'Laboratory Fee'),
        ('EXAMINATION', 'Examination Fee'),
        ('SPORTS', 'Sports Fee'),
        ('MEDICAL', 'Medical Fee'),
        ('TRANSPORT', 'Transport Fee'),
        ('DEVELOPMENT', 'Development Fee'),
        ('SECURITY', 'Security Fee'),
        ('CAUTION', 'Caution Deposit'),
        ('REGISTRATION', 'Registration Fee'),
        ('ADMISSION', 'Admission Fee'),
        ('LATE_FEE', 'Late Fee'),
        ('FINE', 'Fine'),
        ('OTHER', 'Other'),
    ]

    MONTH_CHOICES = [
        (1, 'January'),
        (2, 'February'),
        (3, 'March'),
        (4, 'April'),
        (5, 'May'),
        (6, 'June'),
        (7, 'July'),
        (8, 'August'),
        (9, 'September'),
        (10, 'October'),
        (11, 'November'),
        (12, 'December'),
    ]

    YEAR_CHOICES = [
        (year, str(year)) for year in range(timezone.now().year - 5, timezone.now().year + 6)
    ]

    payment_ref = models.ForeignKey(
        Payment,
        on_delete=models.CASCADE,
        related_name='payment_lines',
        verbose_name=_('Payment')
    )
    paid_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00,
        validators=[MinValueValidator(0)],
        verbose_name=_('Paid Amount')
    )
    expected_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name=_('Expected Amount')
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Created At')
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_('Updated At')
    )
    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        verbose_name=_('Type')
    )
    month = models.IntegerField(
        choices=MONTH_CHOICES,
        blank=True,
        null=True,
        verbose_name=_('Month')
    )
    year = models.IntegerField(
        choices=YEAR_CHOICES,
        default=timezone.now().year,
        verbose_name=_('Year')
    )
    title = models.CharField(
        max_length=200,
        blank=True,
        verbose_name=_('Title')
    )

    class Meta:
        ordering = ['-year', '-month', '-created_at']
        verbose_name = _('Payment Line')
        verbose_name_plural = _('Payment Lines')
        indexes = [
            models.Index(fields=['payment_ref', 'type']),
            models.Index(fields=['year', 'month']),
        ]

    def __str__(self):
        return f"{self.title} - ${self.paid_amount}/{self.expected_amount}"

    def save(self, *args, **kwargs):
        # Ensure amounts are not None
        if self.paid_amount is None:
            self.paid_amount = 0.00
        if self.expected_amount is None:
            self.expected_amount = 0.00

        # Generate title from type, month, and year
        self.title = self.generate_title()

        # Validate month based on type
        if self.type in ['TUITION', 'HOSTEL', 'MESS'] and not self.month:
            self.month = timezone.now().month

        super().save(*args, **kwargs)

        # Update parent payment status
        if self.payment_ref:
            self.payment_ref.update_status()

    def generate_title(self):
        """Generate title from type, month, and year"""
        type_display = self.get_type_display()

        if self.month and self.year:
            month_display = self.get_month_display()
            return f"{type_display} - {month_display} {self.year}"
        elif self.year:
            return f"{type_display} - {self.year}"
        else:
            return type_display

    @property
    def is_fully_paid(self):
        """Safely check if payment line is fully paid"""
        try:
            if self.paid_amount is None or self.expected_amount is None:
                return False
            return float(self.paid_amount) >= float(self.expected_amount)
        except (TypeError, ValueError):
            return False

    @property
    def remaining_amount(self):
        """Safely calculate remaining amount"""
        try:
            if self.paid_amount is None or self.expected_amount is None:
                return self.expected_amount or 0.00
            remaining = float(self.expected_amount) - float(self.paid_amount)
            return max(remaining, 0)
        except (TypeError, ValueError):
            return self.expected_amount or 0.00

    @property
    def payment_percentage(self):
        """Safely calculate payment percentage"""
        try:
            if (self.expected_amount is None or
                    float(self.expected_amount) == 0 or
                    self.paid_amount is None):
                return 0
            return (float(self.paid_amount) / float(self.expected_amount)) * 100
        except (TypeError, ValueError, ZeroDivisionError):
            return 0

    def clean(self):
        """Validate the payment line"""
        # Ensure amounts are not None
        if self.paid_amount is None:
            raise ValidationError({'paid_amount': 'Paid amount cannot be null'})
        if self.expected_amount is None:
            raise ValidationError({'expected_amount': 'Expected amount cannot be null'})

        # Validate that paid amount doesn't exceed expected amount
        if float(self.paid_amount) > float(self.expected_amount):
            raise ValidationError({
                'paid_amount': 'Paid amount cannot exceed expected amount'
            })

        # Validate month and year combination
        if self.month and self.year:
            current_date = timezone.now()
            if self.year > current_date.year or (
                    self.year == current_date.year and self.month > current_date.month
            ):
                raise ValidationError({
                    'month': 'Cannot select future month and year combination'
                })


class AcademyNoticeBoard(models.Model):
   pass

class NoticeBoardItem(models.Model):
    notice_board = models.ForeignKey(AcademyNoticeBoard, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateTimeField(default=datetime.now)
    document = models.FileField(upload_to='notice_board_docs', null = True, blank = True)

    @property
    def document_name(self):
        return Path(self.document.name).name

    @property
    def document_size(self):
        return getDocumentSize(self.document)

    def __str__(self):
        return f"{self.notice_board} - {self.description}"

class DownloadItem(models.Model):
    DEPARTMENT_CHOICES = (
        ("AC", "Academy"),
        ("DI", "DIB"),
    )
    document = models.FileField(upload_to='download_docs', null=True, blank=True)
    date = models.DateTimeField(default=datetime.now)
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES, default="DI")

    @property
    def filename(self):
        return Path(self.document.name).name

    @property
    def filesize(self):
        return getDocumentSize(self.document)

    def __str__(self):
        return self.filename

class Notification(models.Model):
    headline = models.CharField(max_length=255)
    image = models.FileField(upload_to='notification_images', null = True, blank = True)
    enabled = models.BooleanField(default=False)

def getDocumentSize(document):
    if document:
        size = document.size
        if size < 1024:
            return f"{size} bytes"
        elif size < 1024 * 1024:
            return f"{round(size / 1024, 2)} KB"
        else:
            return f"{round(size / (1024 * 1024), 2)} MB"
    return "0 bytes"