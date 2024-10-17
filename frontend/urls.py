from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('about/', index),
    path('activities/', index),
    path('prayer-time/', index),
    path('donation/', index),
    path('contact/', index),
    path('idealsvalue/', index),
    path('goalsobjective/', index),
    path('history/', index),
    path('registration/', index),
    path('event/', index),
    path('payment/', index),
    path('dibvision/', index),

]
