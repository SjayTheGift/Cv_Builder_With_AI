from django.urls import path
from .views import ResumeCreateAPIView, ResumeUpdateAPIView, ResumeListAPIView, ResumeRetrieveAPIView

urlpatterns = [
    path('api/resume/', ResumeListAPIView.as_view(), name='resume-list'),  # List resumes
    path('api/resume/<int:pk>/', ResumeRetrieveAPIView.as_view(), name='resume-detail'),  # Make sure this line exists
    path('api/resume/update/<int:pk>/', ResumeUpdateAPIView.as_view(), name='resume-update'),  # Update resume
    path('api/resume/create/', ResumeCreateAPIView.as_view(), name='resume-create'),  # Create resume
]