# core/routers.py
from rest_framework.routers import SimpleRouter
from backend.viewsets import UserViewSet, NoticeViewSet
from backend.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet

routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
routes.register(r'user', UserViewSet, basename='user')

# Notice.js
routes.register(r'notice', NoticeViewSet, basename='notice')

urlpatterns = [
    *routes.urls
]
