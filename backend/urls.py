from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
# from api.views import public_events
from django.views.decorators.csrf import csrf_exempt

from backend import viewsets

urlpatterns = [
   path('v1/attendees/', viewsets.AttendeeViewSet.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
