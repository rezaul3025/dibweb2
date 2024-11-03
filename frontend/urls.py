from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('about/', index),
    path('activities/', index),
    path('prayer-time/', index),
    path('donation/', index),
    path('newmember/', index),
    path('contact/', index),
    path('idealsvalue/', index),
    path('goalsobjective/', index),
    path('history/', index),
    path('registration/<int:num>/', index),
    path('event/', index),
    path('payment/<int:num>/', index),
    path('payment-success/<str:num>/<str:payType>/', index),
    path('dibvision/', index),
    path('terms-condition/', index),
    path('verify/<int:num>/<str:paymentRef>/', index),
    path('cash-sale/', index),
]
