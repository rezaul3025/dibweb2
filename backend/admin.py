from django.contrib import admin
from django.http.response import HttpResponse
from django.urls.conf import path
from django.utils.html import format_html
from .models import Payment, PaymentLine

# Register your models here.
from backend.SendEmail import SendEmail
from backend.models import Attendee, Event, ContactUs, Toggle, Shift, Teacher, StudentClass, Student, \
    NoticeBoardItem, AcademyNoticeBoard, DownloadItem, Notification, Payment
from .utils.pdf_generator import generate_payment_receipt


class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'email', 'phone','ticket_info','price','total_attendees','data_privacy_st_confirm','is_email_send','payment_type','is_payment_confirm','payment_reference','creation_date','is_checked_in','event',)
    readonly_fields = ('id','creation_date','price','total_attendees','event',)
    #'is_email_send','payment_type','is_payment_confirm','payment_reference',
    fields = list_display

admin.site.register(Attendee, AttendeeAdmin)

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'poster_image', 'address','map_location','enabled','place','event_datetime','attendee_limit',"attendee_count","event_datetime_text", "event_type",)
    fields = list_display

admin.site.register(Event, EventAdmin)

class ContactUsAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone','subject', 'message')
    fields = list_display
admin.site.register(ContactUs, ContactUsAdmin)

class ToggleAdmin(admin.ModelAdmin):
    list_display = ('name', 'enabled')
    fields = list_display
admin.site.register(Toggle, ToggleAdmin)

class ShiftAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    fields = list_display
admin.site.register(Shift, ShiftAdmin)

class TeacherAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    fields = list_display
admin.site.register(Teacher, TeacherAdmin)

class StudentClassAdmin(admin.ModelAdmin):
    filter_horizontal = ('teachers',)
    list_display = ('name', 'description', 'day')
    fields = list_display+filter_horizontal
admin.site.register(StudentClass, StudentClassAdmin)

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('headline','image', 'enabled')
    fields = list_display
admin.site.register(Notification, NotificationAdmin)

class NoticeBoardDocumentAdmin(admin.StackedInline):
    model = NoticeBoardItem

@admin.register(AcademyNoticeBoard)
class AcademyNoticeBoardAdmin(admin.ModelAdmin):
    inlines = [NoticeBoardDocumentAdmin]

@admin.register(NoticeBoardItem)
class NoticeBoardDocumentAdmin(admin.ModelAdmin):
    pass

class DownloadItemAdmin(admin.ModelAdmin):
    list_display = ('filename', 'document', 'filesize', 'date', 'department')
    readonly_fields = ('filesize', 'date')
admin.site.register(DownloadItem, DownloadItemAdmin)


class PaymentLineInline(admin.TabularInline):
    model = PaymentLine
    extra = 1
    fields = ['type', 'month', 'year', 'expected_amount', 'paid_amount', 'is_fully_paid', 'title']
    readonly_fields = ['is_fully_paid', 'title']
    classes = ['collapse']

    def is_fully_paid(self, obj):
        if obj.is_fully_paid:
            return format_html('<span style="color: green;">✓ Fully Paid</span>')
        else:
            return format_html('<span style="color: orange;">{}% Paid</span>', int(obj.payment_percentage))
    is_fully_paid.short_description = 'Payment Status'


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'student',
        'created_date',
        'payment_method_display',
        'total_paid_amount',
        'total_expected_amount',
        'is_fully_paid_display',
        'receipt_actions'
    ]
    list_filter = [
        'status',
        'payment_method',
        'created_date'
    ]
    search_fields = [
        'student__first_name',
        'student__last_name',
        'student__address',
        'student__email',
        'student__phone_number',
    ]
    readonly_fields = [
        'created_date',
        'total_paid_amount',
        'total_expected_amount',
        'is_fully_paid_display'
    ]
    inlines = [PaymentLineInline]
    date_hierarchy = 'created_date'

    fieldsets = (
        ('Basic Information', {
            'fields': ('student', 'created_date')
        }),
        ('Payment Details', {
            'fields': ('payment_method', 'status', 'notes')
        }),
        ('Summary', {
            'fields': ('total_paid_amount', 'total_expected_amount', 'is_fully_paid_display'),
            'classes': ('collapse',)
        }),
    )

    def payment_method_display(self, obj):
        return obj.get_payment_method_display()
    payment_method_display.short_description = 'Payment Method'

    def status_display(self, obj):
        color_map = {
            'PAID': 'green',
            'PENDING': 'orange',
            'FAILED': 'red',
            'PARTIAL': 'blue',
            'REFUNDED': 'gray',
            'CANCELLED': 'darkred'
        }
        color = color_map.get(obj.status, 'black')
        return format_html('<span style="color: {};">{}</span>', color, obj.get_status_display())
    status_display.short_description = 'Status'

    def is_fully_paid_display(self, obj):
        if obj.is_fully_paid:
            return format_html('<span style="color: green; font-weight: bold;">✓ Fully Paid</span>')
        else:
            return format_html('<span style="color: orange;">Partial Payment</span>')
    is_fully_paid_display.short_description = 'Payment Status'

    def student_info(self, obj):
        return f"{obj.student.full_name} ({obj.student.classes})"

    student_info.short_description = 'Student'

    def receipt_actions(self, obj):
        return format_html(
            '<a class="button" href="{}" style="background-color: #28a745; color: white; padding: 5px 12px; text-decoration: none; border-radius: 4px; font-size: 12px; font-weight: bold;">Download Receipt</a>',
            f'generate-receipt/{obj.id}/'
        )

    receipt_actions.short_description = 'Receipt'

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('generate-receipt/<int:payment_id>/',
                 self.admin_site.admin_view(self.generate_receipt),
                 name='generate-receipt'),
        ]
        return custom_urls + urls

    def generate_receipt(self, request, payment_id):
        try:
            payment = Payment.objects.get(id=payment_id)
            buffer = generate_payment_receipt(payment)

            filename = f"receipt_{payment.receipt_number}.pdf"
            response = HttpResponse(buffer, content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response

        except Payment.DoesNotExist:
            from django.contrib import messages
            messages.error(request, "Payment not found.")
            from django.shortcuts import redirect
            return redirect('admin:index')

    def get_urls(self):
        from django.urls import path
        urls = super().get_urls()
        custom_urls = [
            path('generate-receipt/<int:payment_id>/',
                 self.admin_site.admin_view(self.generate_receipt),
                 name='generate-receipt'),
        ]
        return custom_urls + urls

    def generate_receipt(self, request, payment_id):
        payment = Payment.objects.get(id=payment_id)
        buffer = generate_payment_receipt(payment)

        response = HttpResponse(buffer, content_type='application/pdf')
        response[
            'Content-Disposition'] = f'attachment; filename="receipt_{payment.id}_{payment.student.student_id}.pdf"'
        return response


@admin.register(PaymentLine)
class PaymentLineAdmin(admin.ModelAdmin):
    list_display = [
        'title',
        'payment_ref',
        'expected_amount',
        'paid_amount',
        'remaining_amount_display',
        'payment_percentage_display',
        'created_at'
    ]
    list_filter = [
        'type',
        'month',
        'year',
        'created_at'
    ]
    search_fields = [
        'title',
        'payment_ref__student__name',
        'payment_ref__student__student_id'
    ]
    readonly_fields = [
        'title',
        'created_at',
        'updated_at',
        'is_fully_paid',
        'remaining_amount',
        'payment_percentage'
    ]
    list_editable = ['paid_amount']

    fieldsets = (
        ('Basic Information', {
            'fields': ('payment_ref', 'title')
        }),
        ('Payment Details', {
            'fields': ('type', 'month', 'year')
        }),
        ('Amount Information', {
            'fields': ('expected_amount', 'paid_amount', 'is_fully_paid', 'remaining_amount', 'payment_percentage')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def remaining_amount_display(self, obj):
        return f"${obj.remaining_amount:.2f}"
    remaining_amount_display.short_description = 'Remaining'

    def payment_percentage_display(self, obj):
        color = "green" if obj.payment_percentage == 100 else "orange" if obj.payment_percentage > 0 else "red"
        return format_html('<span style="color: {};">{}%</span>', color, int(obj.payment_percentage))
    payment_percentage_display.short_description = 'Paid %'

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        # Update parent payment status when payment line is saved
        if obj.payment_ref:
            obj.payment_ref.update_status()


class PaymentLineInline(admin.TabularInline):
    model = PaymentLine
    extra = 0
    fields = ['title', 'paid_amount']
    readonly_fields = ['title', 'paid_amount']
    can_delete = False
    max_num = 0  # Remove add functionality
    verbose_name = "Payment Line"
    verbose_name_plural = "Payment Lines"

    def has_add_permission(self, request, obj):
        return False


class PaymentInline(admin.TabularInline):
    model = Payment
    extra = 0
    fields = ['receipt_number', 'created_date',  'status_display', 'total_paid_amount',
              'receipt_actions']
    readonly_fields = ['receipt_number', 'created_date',  'status_display', 'total_paid_amount',
                       'receipt_actions']
    can_delete = False
    max_num = 0
    verbose_name = "Payment"
    verbose_name_plural = "All Payments"
    classes = ['collapse']  # Can be collapsed to save space

    def get_receipt_number(self, obj):
        return f"#{obj.receipt_number}"

    get_receipt_number.short_description = 'Receipt No.'

    def status_display(self, obj):
        color_map = {
            'PAID': 'green',
            'PENDING': 'orange',
            'FAILED': 'red',
            'PARTIAL': 'blue'
        }
        color = color_map.get(obj.status, 'black')
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display()
        )

    status_display.short_description = 'Status'

    def receipt_actions(self, obj):
        return format_html(
            '<a class="button" href="{}" style="background-color: #28a745; color: white; padding: 4px 8px; text-decoration: none; border-radius: 3px; font-size: 11px;">Download</a>',
            f'/admin-dj/backend/payment/generate-receipt/{obj.id}/'
        )
    receipt_actions.short_description = 'Receipt'

    def get_urls(self):
        from django.urls import path
        urls = super().get_urls()
        custom_urls = [
            path('generate-receipt/<int:payment_id>/',
                 self.admin_site.admin_view(self.generate_receipt),
                 name='generate-receipt'),
        ]
        return custom_urls + urls

    def has_add_permission(self, request, obj):
        return False

class StudentAdmin(admin.ModelAdmin):
    filter_horizontal = ('classes',)
    list_display = ('first_name', 'last_name', 'address', 'email','phone_number', 'shift', 'siblings', 'monthly_fee','get_classes')
    readonly_fields = ('get_classes',)
    search_fields = [
        'first_name', 'last_name', 'address', 'email','phone_number',
    ]
    fields = list_display+filter_horizontal
    inlines = [PaymentInline]
admin.site.register(Student, StudentAdmin)