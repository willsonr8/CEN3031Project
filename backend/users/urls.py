from .views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    LogoutView,
    UserAccountDetailView
)
from django.urls import path

urlpatterns = [
    path("jwt/create/", CustomTokenObtainPairView.as_view()),
    path("jwt/refresh/", CustomTokenRefreshView.as_view()),
    path("jwt/verify/", CustomTokenVerifyView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("user_info/", UserAccountDetailView.as_view())
]