from rest_framework import serializers
from .models import Resume, Experience, Education

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'
        extra_kwargs = {'resume': {'required': False}}  # Make resume field optional here

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'
        extra_kwargs = {'resume': {'required': False}}  # Make resume field optional here

class ResumeSerializer(serializers.ModelSerializer):
    experiences = ExperienceSerializer(many=True, required=False)
    educations = EducationSerializer(many=True, required=False)

    class Meta:
        model = Resume
        fields = ['id', 'user', 'name', 'email', 'phone', 'summary', 'experiences', 'educations']
        read_only_fields = ['user']  # Mark user as read-only

    def create(self, validated_data):
        experiences_data = validated_data.pop('experiences', [])
        educations_data = validated_data.pop('educations', [])
        
        # Create the Resume instance and set the user
        resume = Resume.objects.create(**validated_data)

        for experience_data in experiences_data:
            Experience.objects.create(resume=resume, **experience_data)

        for education_data in educations_data:
            Education.objects.create(resume=resume, **education_data)

        return resume

    def update(self, instance, validated_data):
        experiences_data = validated_data.pop('experiences', [])
        educations_data = validated_data.pop('educations', [])
        
        # Update the Resume instance
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.summary = validated_data.get('summary', instance.summary)
        instance.save()

        # Update experiences
        instance.experiences.all().delete()  # Remove existing experiences
        for experience_data in experiences_data:
            Experience.objects.create(resume=instance, **experience_data)

        # Update educations
        instance.educations.all().delete()  # Remove existing educations
        for education_data in educations_data:
            Education.objects.create(resume=instance, **education_data)

        return instance