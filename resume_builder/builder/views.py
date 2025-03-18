from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Resume
from .serializers import ResumeSerializer

class ResumeCreateAPIView(generics.CreateAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]  

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 

class ResumeUpdateAPIView(generics.UpdateAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user) 

class ResumeListAPIView(generics.ListAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return resumes belonging to the authenticated user
        return Resume.objects.filter(user=self.request.user)

class ResumeRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        return generics.get_object_or_404(queryset, pk=self.kwargs['pk'])
