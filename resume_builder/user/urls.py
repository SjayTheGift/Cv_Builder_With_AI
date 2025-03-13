from django.urls import path
from .views import (
    LogoutView, 
    CustomTokenObtainPairView,
    UserRegistrationAPIView,
    PasswordResetAPIView,
    PasswordResetConfirmAPIView,
    CustomRefreshToken,
    UserProfileView,
    Is_Authenticated,
)

urlpatterns = [
    path('api/auth/authenticated/', Is_Authenticated.as_view(), name='is_authenticated'),
    path('api/auth/user/', UserProfileView.as_view(), name='user_profile'),
    path('api/auth/register/', UserRegistrationAPIView.as_view(), name='register'),  
    path('api/auth/logout/', LogoutView.as_view(), name='logout'), 
    path('api/auth/password/reset/', PasswordResetAPIView.as_view(), name='password_rest'), 
    path('api/auth/password/confirm/reset/', PasswordResetConfirmAPIView.as_view(), name="confirm_password_rest"), 
    path('api/auth/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('api/auth/token/refresh/', CustomRefreshToken.as_view(), name='token_refresh'),  # Token refresh view
]
