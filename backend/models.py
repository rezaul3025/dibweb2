from datetime import datetime
from pathlib import Path
from django.utils import timezone
from decimal import Decimal

from ckeditor.fields import RichTextField
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models


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

class Student(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, blank=True)
    contact_details = models.CharField(max_length=255, blank=True)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    classes = models.ManyToManyField(StudentClass)
    siblings = models.BooleanField(default=False)
    class Meta:
        ordering = ["first_name"]

    def get_classes(self):
        return ",".join([str(c) for c in self.classes.all()])

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.address}"

class Payment(models.Model):
    PAYMENT_METHODS = [
        ('cash', 'Cash'),
        ('bank', 'Bank Transfer'),
        ('card', 'Credit/Debit Card'),
        ('online', 'Online Payment'),
    ]

    PAYMENT_STATUS = [
        ('paid', 'Paid'),
        ('partial', 'Partially Paid'),
        ('unpaid', 'Unpaid'),
    ]

    student = models.ForeignKey(
        'Student',
        on_delete=models.CASCADE,
        related_name='payments'
    )
    year = models.PositiveIntegerField(default=timezone.now().year)
    month = models.PositiveIntegerField(
        choices=[(i, timezone.datetime(2000, i, 1).strftime('%B')) for i in range(1, 13)]
    )

    # Financial details
    expected_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    payment_date = models.DateField(blank=True, null=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS, blank=True, null=True)
    status = models.CharField(max_length=10, choices=PAYMENT_STATUS, default='unpaid')
    notes = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('student', 'year', 'month')
        ordering = ['-year', '-month']
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'

    def __str__(self):
        return f"{self.student.first_name} {self.student.last_name} - {self.get_month_display()} {self.year}"

    @property
    def month_name(self):
        """Return month as text, e.g. 'October'."""
        return self.get_month_display()

    @property
    def due_amount(self):
        """Calculate how much is still owed."""
        return max(Decimal(self.expected_amount) - Decimal(self.paid_amount), Decimal('0.00'))

    def update_status(self):
        """Update payment status automatically based on paid vs expected."""
        if self.paid_amount >= self.expected_amount:
            self.status = 'paid'
        elif Decimal('0.00') < self.paid_amount < self.expected_amount:
            self.status = 'partial'
        else:
            self.status = 'unpaid'
        self.save()


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