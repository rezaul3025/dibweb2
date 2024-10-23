from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
# from api.views import public_events
from django.views.decorators.csrf import csrf_exempt

from backend import viewsets, views

urlpatterns = [
   path('v1/attendees/', views.attendee_save),
   path('v1/events/', views.events),
   path('v1/events/<int:event_id>/', views.event_by_id),
]

urlpatterns = format_suffix_patterns(urlpatterns)
