from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from backend import views, PaymentCreateView

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
   path('v1/students/classes/<int:class_id>/', views.studentsByClass),
   path('v1/students/teacher/<int:teacher_id>/', views.studentsByTeacher),
   path('v1/students/shifts/<int:shift_id>/', views.studentsByShift),
   path('v1/students/search/<str:search_params>/', views.allStudentBySearch),
   path('v1/students/', views.allStudents),
   path('v1/students/<int:student_id>/', views.findStudentById),
   path("v1/students/payments/record/", views.record_student_payment, name="record_student_payment"),
   path("v1/students/add", views.add_student, name="add_student"),
   path("v1/payments/", views.add_payment, name='add-payment'),
   path('v1/classes/', views.allClasses),
   path('v1/shifts/', views.allShifts),
   path('v1/labelgategories/', views.labelCategories),
   path('v1/teachers/', views.allTeachers),
   path('v1/notice-board/', views.noticeBoard),
   path('v1/download-items/<str:department>/', views.downloadItems),
   path('v1/notification/', views.notification),
   path('v1/login/', views.login_user),
]

urlpatterns = format_suffix_patterns(urlpatterns)
