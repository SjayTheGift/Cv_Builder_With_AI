from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.conf import settings

from .serializers import (
    UserRegistrationSerializer, 
    PasswordResetSerializer,
    PasswordResetConfirmSerializer,
    UserProfileSerializer,
)

import time

User = get_user_model()

class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    View for retrieving and updating the user profile.
    """
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Return the current user
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserRegistrationAPIView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"detail": "User registered successfully"}, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            token = response.data
            
            access_token = token['access']
            refresh_token = token['refresh']

            res = Response({"detail": "Logged in successfully"}, status=status.HTTP_200_OK)

            # Set access token cookie
            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,  # Set to True in production
                samesite='None',  # or 'Lax' if needed in production 'Strict'
                path='/',
            )

            # Set refresh token cookie
            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,  # Set to True in production
                samesite='None',  # or 'Lax' if needed in production 'Strict'
                path='/',
            )
        
            # Get expiration time
            access_token_obj = AccessToken(access_token)
            expiration_time = access_token_obj['exp']  # Get expiration timestamp
            res.data['expires_in'] = expiration_time - int(time.time())  # Calculate remaining time
            return res

        except Exception as e:
            return Response({"detail": "Login failed", "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CustomRefreshToken(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            # Get the refresh token from cookies
            refresh_token = request.COOKIES.get('refresh_token')
            if not refresh_token:
                return Response({"detail": "Refresh token not found in cookies."}, status=status.HTTP_400_BAD_REQUEST)

            # Update request data with the refresh token
            request.data["refresh"] = refresh_token

            # Call the super class's post method to refresh the token
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            # Set the access token in cookies
            access_token = tokens.get("access")
            if access_token:
                res = Response({"detail": "Access token refreshed", "access": access_token}, status=status.HTTP_200_OK)
                res.set_cookie(
                    key="access_token",
                    value=access_token,
                    httponly=True,
                    secure=True,
                    samesite='None',  # or 'Lax' if needed in production 'Strict'
                    path='/',
                )
                
                # Get expiration time
                access_token_obj = AccessToken(access_token)
                expiration_time = access_token_obj['exp']  # Get expiration timestamp
                res.data['expires_in'] = expiration_time - int(time.time())  # Calculate remaining time
                return res
            else:
                return Response({"detail": "Access token not found."}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"detail": "Refresh unsuccessful", "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = (AllowAny,)
    # authentication_classes = ()

    def post(self, request):
        # Retrieve the refresh token from cookies
        refresh_token = request.COOKIES.get('refresh_token')
    
        if not refresh_token:
            return Response({"detail": "No refresh token provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()

            # Clear the cookies
            response = Response({"detail": "Successfully logged out"}, status=status.HTTP_200_OK)

            response.delete_cookie('access_token', 
                                    path='/',
                                    samesite='None',  # or 'Lax' if needed in production 'Strict'
                    )
            response.delete_cookie('refresh_token', 
                                    path='/',
                                    samesite='None',  # or 'Lax' if needed in production 'Strict'
                    )

            
            return response
        except (ObjectDoesNotExist, TokenError):
            return Response({"detail": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetAPIView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PasswordResetSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        
        try:
            user = User.objects.filter(email__iexact=email).first()
        except User.DoesNotExist:
            return Response({"email": "User with this email does not exist."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Generate token and send email
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.id)) # Ensure the user ID is encoded correctly
        url = settings.PASSWORDREST_URL
        reset_link = f"{url}?uid={uid}&token={token}"

        # Send email (customize this part)
        send_mail(
            'Password Reset Request',
            f'Please click the link to reset your password: {reset_link}',
            'from@example.com',
            [email],
            fail_silently=False,
        )

        return Response({"detail": "Password reset link has been sent."}, status=status.HTTP_200_OK)


class PasswordResetConfirmAPIView(generics.GenericAPIView):
    serializer_class = PasswordResetConfirmSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            uid = serializer.validated_data['uid']
            token = serializer.validated_data['token']
            password = serializer.validated_data['password']

            # Decode the user ID
            user_id = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=user_id)

            if default_token_generator.check_token(user, token):
                user.set_password(password)
                user.save()
                return Response({"detail": "Password has been reset."}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"detail": "Invalid token or user ID."}, status=status.HTTP_400_BAD_REQUEST)

class Is_Authenticated(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        return Response({'authenticated':True})