from django.db import models
from django.conf import settings


class PatientProfile(models.Model):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="patient_profile"
    )

    blood_group = models.CharField(max_length=5, blank=True)

    height = models.FloatField(null=True, blank=True)

    weight = models.FloatField(null=True, blank=True)

    emergency_contact = models.CharField(max_length=15, blank=True)

    allergies = models.TextField(blank=True)

    medical_history = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email