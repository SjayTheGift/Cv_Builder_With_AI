from django.contrib import admin
from .models import Resume, Experience, Education

class ExperienceInline(admin.TabularInline):
    model = Experience
    extra = 1  # Number of empty forms to display

class EducationInline(admin.TabularInline):
    model = Education
    extra = 1  # Number of empty forms to display

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('firstname', 'lastname', 'email', 'phone')  # Fields to display in the list view
    search_fields = ('firstname', 'lastname', 'email')  # Fields to search in the admin interface
    inlines = [ExperienceInline, EducationInline]  # Add inlines for experiences and education

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('job_title', 'company', 'start_date', 'end_date')  # Fields to display in the list view
    list_filter = ('company',)  # Add filter options for company

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'graduation_date')  # Fields to display in the list view
    list_filter = ('institution',)  # Add filter options for institution