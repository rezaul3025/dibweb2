from django.contrib import admin

# Register your models here.
from backend.SendEmail import SendEmail
from backend.models import Attendee


class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'creation_date',)
    readonly_fields = ('creation_date',)
    fields = list_display

admin.site.register(Attendee, AttendeeAdmin)
