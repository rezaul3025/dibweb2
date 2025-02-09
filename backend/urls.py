from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from backend import views

# from api.views import public_events

urlpatterns = [
   path('v1/attendees/', views.attendee_save),
   path('v1/attendees/<int:attendee_id>/', views.attendee_by_id),
   path('v1/attendees/<int:attendee_id>/<str:payment_reference>/<int:event_id>/', views.attendee_update_after_success),
   path('v1/events/', views.events),
   path('v1/events/<int:event_id>/', views.event_by_id),
   path('v1/attendees/verify/<int:attendee_id>/<str:payment_reference>/', views.attendee_attendee_verification),
   path('v1/contactus/', views.contact_us),
   path('v1/toggles/', views.allToggles),
   path('v1/resend-purchase-email/<int:attendee_id>/', views.resend_email_incomplete_payment),
   path('v1/mark-checked-in/<int:attendee_id>/', views.mark_as_checked_in),
   path('v1/resend-ticket-confirmation/<int:attendee_id>/', views.resend_email_with_qrcode),
   path('v1/prayer_times/<str:mosque_id>/', views.prayer_times),
   path('v1/students/', views.allStudents),
   path('v1/classes/', views.allClasses),
   path('v1/shifts/', views.allShifts),
   path('v1/teachers/', views.allTeachers)
]

urlpatterns = format_suffix_patterns(urlpatterns)
