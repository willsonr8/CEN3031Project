from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from users.models import UserAccount
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Custom TokenObtainPairView to set the access and refresh tokens as cookies
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get("access")
            refresh_token = response.data.get("refresh")

            response.set_cookie(
                "access",
                access_token,
                max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

            response.set_cookie(
                "refresh",
                refresh_token,
                max_age=settings.AUTH_COOKIE_REFRESH_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

        return response
# Custom TokenRefreshView to get access token using the refresh token from the cookie
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIE.get("refresh")

        if refresh_token:
            request.data["refresh"] = refresh_token
        
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get("access")

            response.set_cookie(
                "access",
                access_token,
                max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
        
        return response

# Custom TokenVerifyView to verify the token from the cookie
class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIE.get("access")

        if access_token:
            request.data["token"] = access_token
        
        return super().post(request, *args, **kwargs)
# Custom view to logout the user by deleting the access and refresh tokens
class LogoutView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)

        response.delete_cookie("access")
        response.delete_cookie("refresh")

        return response

# Custom view to reset the password of the user, Send email implementation is not included,
# so I cannot send the reset password link to the user.'
@csrf_exempt
def reset_password(request):
    data = json.loads(request.body)
    email = data.get('email')
    new_password = data.get('new_password')
    try:
        user = UserAccount.objects.get(email=email)
        user.password = make_password(new_password)
        user.save()
        return JsonResponse({'status': 'success', 'message': 'Password has been reset.'})
    except UserAccount.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'User does not exist.'})


