from django.contrib import admin

# Register your models here.
from backend.SendEmail import SendEmail
from backend.models import Attendee, Event, ContactUs, Toggle


class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'email', 'phone','ticket_info','price','total_attendees','data_privacy_st_confirm','is_email_send','payment_type','is_payment_confirm','payment_reference','creation_date','is_checked_in','event',)
    readonly_fields = ('id','creation_date','price','total_attendees','is_email_send','payment_type','is_payment_confirm','payment_reference','is_checked_in','event',)
    fields = list_display

admin.site.register(Attendee, AttendeeAdmin)

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'poster_image', 'address','map_location','enabled','place','event_datetime','attendee_limit',"attendee_count",)
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
