from django.contrib import admin

# Register your models here.
from backend.SendEmail import SendEmail
from backend.models import Attendee, Event


class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone','ticket_info','price','data_privacy_st_confirm','is_email_send','payment_type','is_payment_confirm','payment_reference','creation_date',)
    readonly_fields = ('creation_date','price','is_email_send','payment_type','is_payment_confirm','payment_reference',)
    fields = list_display

admin.site.register(Attendee, AttendeeAdmin)

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'poster_image', 'address','map_location','event_datetime',)
    fields = list_display

admin.site.register(Event, EventAdmin)
