from django.urls import path
from .views import ResumeCreateAPIView, ResumeUpdateAPIView, ResumeListAPIView

urlpatterns = [
    path('api/resume/', ResumeListAPIView.as_view(), name='resume-list'),  # List resumes
    path('api/resume/create/', ResumeCreateAPIView.as_view(), name='resume-create'),  # Create resume
    path('api/resume/<int:pk>/', ResumeUpdateAPIView.as_view(), name='resume-update'),  # Update resume
]