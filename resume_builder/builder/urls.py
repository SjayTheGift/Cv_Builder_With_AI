from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ResumeCreateAPIView, ResumeUpdateAPIView, ResumeListAPIView

urlpatterns = [
    path('api/resumes/', ResumeCreateAPIView.as_view(), name='resume-create'),
    path('api/resumes/<int:pk>/', ResumeUpdateAPIView.as_view(), name='resume-update'),
    path('api/resumes/users/', ResumeListAPIView.as_view(), name='resume-list'), 
]