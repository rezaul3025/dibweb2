from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('login/', index),
    path('signup/', index),
    path('about/', index),
    path('activities/', index),
    path('prayer-time/', index),
    path('donation/', index),
]
