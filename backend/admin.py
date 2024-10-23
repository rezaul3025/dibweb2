from django.contrib import admin

# Register your models here.
from backend.SendEmail import SendEmail
from backend.models import Attendee, Event


class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'is_email_send','creation_date',)
    readonly_fields = ('creation_date',)
    fields = list_display

admin.site.register(Attendee, AttendeeAdmin)

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'poster_image', 'address','map_location','event_datetime',)
    fields = list_display

admin.site.register(Event, EventAdmin)
