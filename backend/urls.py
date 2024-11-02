from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
# from api.views import public_events
from django.views.decorators.csrf import csrf_exempt

from backend import viewsets, views

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
]

urlpatterns = format_suffix_patterns(urlpatterns)
