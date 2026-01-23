# admin.py
from django import forms
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path
from django.utils.html import format_html
# Register your models here.
from backend.models import Attendee, Event, ContactUs, Toggle, Shift, Teacher, StudentClass, Student, \
    NoticeBoardItem, AcademyNoticeBoard, DownloadItem, Notification, Payment, LabelCategory
from .models import PaymentLine
from .utils.pdf_generator import generate_payment_receipt

S = 'Total Paid'


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

class LabelCategoryAdmin(admin.ModelAdmin):
    list_display = ('label', 'category')
    fields = list_display
admin.site.register(LabelCategory, LabelCategoryAdmin)

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

class PaymentLineForm(forms.ModelForm):
    class Meta:
        model = PaymentLine
        fields = '__all__'
        widgets = {
            'type': forms.Select(attrs={'class': 'form-control'}),
            'month': forms.Select(attrs={'class': 'form-control'}),
            'year': forms.Select(attrs={'class': 'form-control'}),
            'title': forms.TextInput(
                attrs={'class': 'form-control', 'placeholder': 'Auto-generated from type, month, and year'}),
        }


class PaymentLineInline(admin.TabularInline):
    model = PaymentLine
    form = PaymentLineForm
    extra = 1
    fields = ['type', 'month', 'year', 'expected_amount', 'paid_amount', 'title']
    readonly_fields = ['title']
    verbose_name = "Payment Line"
    verbose_name_plural = "Payment Lines"

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('payment_ref__student')


class PaymentForm(forms.ModelForm):
    class Meta:
        model = Payment
        fields = '__all__'
        widgets = {
            'payment_method': forms.Select(attrs={'class': 'form-control'}),
            'status': forms.Select(attrs={'class': 'form-control'}),
            'notes': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }


class PaymentInline(admin.TabularInline):
    model = Payment
    form = PaymentForm
    extra = 1
    fields = ['payment_method', 'status', 'created_date', 'notes', 'total_paid_amount', 'total_expected_amount',
              'is_fully_paid',]
    readonly_fields = ['created_date', 'total_paid_amount', 'total_expected_amount', 'is_fully_paid']
    verbose_name = "Payment"
    verbose_name_plural = "Payments"
    show_change_link = True
    classes = ['collapse']

    def total_paid_amount(self, obj):
        return f"€{obj.total_paid_amount:.2f}"

    total_paid_amount.short_description = S

    def total_expected_amount(self, obj):
        return f"€{obj.total_expected_amount:.2f}"

    total_expected_amount.short_description = 'Total Expected'

    def is_fully_paid(self, obj):
        if obj.is_fully_paid:
            return format_html('<span style="color: green;">✓ Fully Paid</span>')
        else:
            return format_html('<span style="color: orange;">Partial</span>')

    is_fully_paid.short_description = 'Status'

    def payment_actions(self, obj):
        return format_html(
            '<a class="button" href="{}" style="background-color: #28a745; color: white; padding: 5px 10px; text-decoration: none; border-radius: 3px; font-size: 12px; margin-right: 5px;">Receipt</a>'
            '<a class="button" href="{}" style="background-color: #17a2b8; color: white; padding: 5px 10px; text-decoration: none; border-radius: 3px; font-size: 12px;">Edit</a>',
            f'generate-receipt/{obj.id}/',
            f'{obj.id}/change/'
        )

    payment_actions.short_description = 'Actions'


class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = '__all__'
        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control'}),
            'address': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
            'phone_number': forms.TextInput(attrs={'class': 'form-control'}),
            'shift': forms.Select(attrs={'class': 'form-control'}),
            'classes': forms.SelectMultiple(attrs={'class': 'form-control'}),
            'monthly_fee': forms.NumberInput(attrs={'class': 'form-control'}),
        }


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    form = StudentForm
    list_display = ['student_id', 'full_name','age','get_classes', 'label_category', 'shift', 'monthly_fee', 'total_payments_count',
                    'total_amount_paid_display', 'student_actions']
    list_filter = ['shift', 'classes', 'has_siblings','status', 'monthly_fee']
    search_fields = ['first_name', 'last_name', 'email', 'phone_number', 'address']
    readonly_fields = ['student_id', 'total_payments_count', 'total_amount_paid_display', 'payment_history']
    inlines = [PaymentInline]

    fieldsets = (
        ('Personal Information', {
            'fields': (
                'first_name',
                'last_name',
                'guardian_name',
                'address',
                'email',
                'phone_number',
                'date_of_birth',
            )
        }),
        ('Academic Information', {
            'fields': (
                'shift',
                'classes',
                'label_category',
                'has_siblings',
                'monthly_fee'
            )
        }),
        ('System Information', {
            'fields': (
                'student_id',
                'total_payments_count',
                'total_amount_paid_display',
            ),
            'classes': ('collapse',)
        }),
        ('Payment History', {
            'fields': ('payment_history',),
            'classes': ('collapse',)
        }),
    )

    def get_classes(self, obj):
        return obj.get_classes

    get_classes.short_description = 'Classes'

    def total_amount_paid_display(self, obj):
        return f"€{obj.total_amount_paid:.2f}"

    total_amount_paid_display.short_description = 'Total Paid'

    def student_actions(self, obj):
        return format_html(
            '<div style="display: flex; gap: 5px;">'
            '<a class="button" href="{}" style="background-color: #17a2b8; color: white; padding: 5px 10px; text-decoration: none; border-radius: 3px; font-size: 12px;">View</a>'
            '<a class="button" href="{}" style="background-color: #28a745; color: white; padding: 5px 10px; text-decoration: none; border-radius: 3px; font-size: 12px;">Quick Pay</a>'
            '</div>',
            f'{obj.id}/change/',
            f'../payment/add/?student={obj.id}'
        )

    student_actions.short_description = 'Actions'

    def payment_history(self, obj):
        payments = obj.payments.all().prefetch_related('payment_lines')
        if not payments:
            return "No payment history found."

        history_html = []
        for payment in payments:
            status_color = {
                'PAID': 'green',
                'PENDING': 'orange',
                'FAILED': 'red',
                'PARTIAL': 'blue',
                'REFUNDED': 'gray',
                'CANCELLED': 'darkred'
            }.get(payment.status, 'black')

            history_html.append(
                f'<div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 5px;">'
                f'<strong>Payment for# {payment.payment_for}</strong> - Payment Date# {payment.created_date.strftime("%Y-%m-%d")} '
                f'<span style="color: {status_color}; font-weight: bold;">({payment.get_status_display()})</span>'
                f'<br>Method: {payment.get_payment_method_display()}'
                f'<br>Total: €{payment.total_paid_amount:.2f}'
                f'<br><a href="/admin-dj/backend/payment/{payment.id}/change/" style="font-size: 12px;">View Details</a>'
                f'<br><a href="/admin-dj/backend/payment/generate-receipt/{payment.id}/" style="font-size: 12px;">Receipt</a>'
                f'</div>'
            )

        return format_html(''.join(history_html))

    payment_history.short_description = 'Payment History'

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related(
            'classes',
            'payments',
            'payments__payment_lines'
        ).select_related('shift')


# Custom Payment Admin with PaymentLine Inlines
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    form = PaymentForm
    list_display = ['id','notes', 'student_info', 'receipt_number', 'payment_method_display', 'status_display',
                    'total_paid_amount_display', 'created_date', 'payment_actions']
    list_filter = ['status', 'payment_method', 'created_date', 'student__shift']
    search_fields = ['student__first_name', 'student__last_name', 'student__email']
    readonly_fields = ['created_date', 'receipt_number_display', 'total_paid_amount_display',
                       'total_expected_amount_display', 'payment_status_summary']
    inlines = [PaymentLineInline]
    date_hierarchy = 'created_date'

    fieldsets = (
        ('Payment Information', {
            'fields': (
                'student',
                'payment_method',
                'status',
                'created_date',
                'receipt_number_display'
            )
        }),
        ('Amount Summary', {
            'fields': (
                'total_paid_amount_display',
                'total_expected_amount_display',
                'payment_status_summary'
            ),
            'classes': ('collapse',)
        }),
        ('Additional Information', {
            'fields': ('notes',),
            'classes': ('collapse',)
        }),
    )

    def student_info(self, obj):
        return format_html(
            '{}<br><small style="color: #666;">{} - {}</small>',
            obj.student.full_name,
            obj.student.get_classes,
            obj.student.shift
        )

    student_info.short_description = 'Student'

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
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display()
        )

    status_display.short_description = 'Status'

    def total_paid_amount_display(self, obj):
        return f"€{obj.total_paid_amount:.2f}"

    total_paid_amount_display.short_description = 'Total Paid'

    def total_expected_amount_display(self, obj):
        return f"€{obj.total_expected_amount:.2f}"

    total_expected_amount_display.short_description = 'Total Expected'

    def receipt_number_display(self, obj):
        return obj.receipt_number

    receipt_number_display.short_description = 'Receipt Number'

    def payment_status_summary(self, obj):
        if obj.is_fully_paid:
            return format_html(
                '<span style="color: green; font-weight: bold;">✓ Payment Complete - All items fully paid</span>')
        else:
            remaining = obj.total_expected_amount - obj.total_paid_amount
            return format_html(
                '<span style="color: orange; font-weight: bold;">ⓘ Payment Incomplete - €{:.2f} remaining</span>',
                remaining
            )

    payment_status_summary.short_description = 'Payment Summary'

    def payment_actions(self, obj):
        return format_html(
            '<a class="button" href="{}" style="background-color: #28a745; color: white; padding: 5px 10px; text-decoration: none; border-radius: 3px; font-size: 12px; margin-right: 5px;">Receipt</a>'
            '<a class="button" href="{}" style="background-color: #17a2b8; color: white; padding: 5px 10px; text-decoration: none; border-radius: 3px; font-size: 12px;">Edit</a>',
            f'generate-receipt/{obj.id}/',
            f'{obj.id}/change/'
        )

    payment_actions.short_description = 'Actions'

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
            buffer = generate_payment_receipt(payment, 'dib-logo.png')

            filename = f"receipt_{payment.student.first_name}_{payment.receipt_number}.pdf"
            response = HttpResponse(buffer, content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response

        except Payment.DoesNotExist:
            from django.contrib import messages
            messages.error(request, "Payment not found.")
            from django.shortcuts import redirect
            return redirect('admin:index')

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        student_id = request.GET.get('student')
        if student_id and not obj:
            try:
                student = Student.objects.get(id=student_id)
                form.base_fields['student'].initial = student
            except Student.DoesNotExist:
                pass
        return form

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('student').prefetch_related('payment_lines')


@admin.register(PaymentLine)
class PaymentLineAdmin(admin.ModelAdmin):
    list_display = ['payment_info', 'type_display', 'month_year', 'expected_amount', 'paid_amount',
                    'is_fully_paid_display']
    list_filter = ['type', 'month', 'year', 'payment_ref__status']
    search_fields = ['title', 'payment_ref__student__first_name', 'payment_ref__student__last_name']

    def payment_info(self, obj):
        return format_html(
            'Payment #{}<br><small>{}</small>',
            obj.payment_ref.id,
            obj.payment_ref.student.full_name
        )

    payment_info.short_description = 'Payment'

    def type_display(self, obj):
        return obj.get_type_display()

    type_display.short_description = 'Type'

    def month_year(self, obj):
        if obj.month and obj.year:
            return f"{obj.get_month_display()} {obj.year}"
        return "N/A"

    month_year.short_description = 'Period'

    def is_fully_paid_display(self, obj):
        if obj.paid_amount >= obj.expected_amount:
            return format_html('<span style="color: green;">✓ Paid</span>')
        else:
            percentage = (obj.paid_amount / obj.expected_amount) * 100
            return format_html('<span style="color: orange;">{}%</span>', int(percentage))

    is_fully_paid_display.short_description = 'Status'

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('payment_ref__student')

