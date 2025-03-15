from django.db import models
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class Resume(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE) 
    job_title = models.CharField(max_length=200)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    address = models.CharField(max_length=200, null=True, blank=True)
    website = models.CharField(max_length=200, null=True, blank=True)
    linkedin = models.CharField(max_length=200, null=True, blank=True)
    github = models.CharField(max_length=200, null=True, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    summary = models.TextField()
    themeColor = models.CharField(max_length=200, default="#ff6666")

    def __str__(self):
        return self.name

class Experience(models.Model):
    resume = models.ForeignKey(Resume, related_name='experiences', on_delete=models.CASCADE)
    job_title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField()

    def __str__(self):
        return f"{self.job_title} at {self.company}"

class Education(models.Model):
    resume = models.ForeignKey(Resume, related_name='educations', on_delete=models.CASCADE)
    degree = models.CharField(max_length=100)
    institution = models.CharField(max_length=100)
    graduation_date = models.DateField()

    def __str__(self):
        return f"{self.degree} from {self.institution}"
    
class Skill(models.Model):
    resume = models.ForeignKey(Resume, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.name} - skill"