from rest_framework import serializers
from .models import Resume, Experience, Education, Skill

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

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
        extra_kwargs = {'resume': {'required': False}}  # Make resume field optional here

class ResumeSerializer(serializers.ModelSerializer):
    experiences = ExperienceSerializer(many=True, required=False)
    educations = EducationSerializer(many=True, required=False)
    skills = SkillSerializer(many=True, required=False)

    class Meta:
        model = Resume
        fields = [
            'id', 
            'user', 
            'job_title', 
            'firstname', 
            'lastname',
            'address',
            'email', 
            'phone',
            'website',
            'linkedin',
            'github', 
            'summary', 
            'experiences', 
            'educations',
            'skills',
            ]
        read_only_fields = ['user']  # Mark user as read-only

    def create(self, validated_data):
        experiences_data = validated_data.pop('experiences', [])
        educations_data = validated_data.pop('educations', [])
        skills_data = validated_data.pop('skills', [])
        
        # Create the Resume instance and set the user
        resume = Resume.objects.create(**validated_data)

        for experience_data in experiences_data:
            Experience.objects.create(resume=resume, **experience_data)

        for education_data in educations_data:
            Education.objects.create(resume=resume, **education_data)

        for skill_data in skills_data:
            Skill.objects.create(resume=resume, **skill_data)

        return resume

    def update(self, instance, validated_data):
        experiences_data = validated_data.pop('experiences', [])
        educations_data = validated_data.pop('educations', [])
        skills_data = validated_data.pop('skills', [])
        
        # Update the Resume instance
        instance.firstname = validated_data.get('firstname', instance.firstname)
        instance.lastname = validated_data.get('lastname', instance.lastname)
        instance.job_title = validated_data.get('job_title', instance.job_title)
        instance.address = validated_data.get('address', instance.address)
        instance.email = validated_data.get('email', instance.email)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.website = validated_data.get('website', instance.website)
        instance.github = validated_data.get('github', instance.github)
        instance.linkedin = validated_data.get('linkedin', instance.linkedin)
        instance.summary = validated_data.get('summary', instance.summary)
        instance.themeColor = validated_data.get('themeColor', instance.summary)
        instance.save()

        # Update experiences
        instance.experiences.all().delete()  # Remove existing experiences
        for experience_data in experiences_data:
            Experience.objects.create(resume=instance, **experience_data)

        # Update educations
        instance.educations.all().delete()  # Remove existing educations
        for education_data in educations_data:
            Education.objects.create(resume=instance, **education_data)

        # Update skills
        instance.skills.all().delete()  # Remove existing skills
        for skill_data in skills_data:
            Skill.objects.create(resume=instance, **skill_data)

        return instance