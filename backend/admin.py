from django.contrib import admin
from django.utils.html import format_html
from .models import Payment, PaymentLine

# Register your models here.
from backend.SendEmail import SendEmail
from backend.models import Attendee, Event, ContactUs, Toggle, Shift, Teacher, StudentClass, Student, \
    NoticeBoardItem, AcademyNoticeBoard, DownloadItem, Notification, Payment


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


class StudentAdmin(admin.ModelAdmin):
    filter_horizontal = ('classes',)
    list_display = ('first_name', 'last_name', 'address', 'email','phone_number', 'shift', 'siblings', 'monthly_fee','get_classes')
    readonly_fields = ('get_classes',)
    fields = list_display+filter_horizontal
admin.site.register(Student, StudentAdmin)

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
        'status_display',
        'total_paid_amount',
        'total_expected_amount',
        'is_fully_paid_display'
    ]
    list_filter = [
        'status',
        'payment_method',
        'created_date'
    ]
    search_fields = [
        'student__name',
        'student__student_id',
        'notes'
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