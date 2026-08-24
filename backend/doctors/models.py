from django.db import models
from django.conf import settings


class DoctorProfile(models.Model):

    SPECIALIZATION = (
        ("Cardiology", "Cardiology"),
        ("Neurology", "Neurology"),
        ("Orthopedic", "Orthopedic"),
        ("Dermatology", "Dermatology"),
        ("Pediatrics", "Pediatrics"),
        ("General Physician", "General Physician"),
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="doctor_profile"
    )

    specialization = models.CharField(
        max_length=100,
        choices=SPECIALIZATION
    )

    qualification = models.CharField(max_length=200)

    experience = models.PositiveIntegerField()

    consultation_fee = models.DecimalField(
        max_digits=8,
        decimal_places=2
    )

    hospital = models.CharField(max_length=200)

    license_number = models.CharField(max_length=100)

    biography = models.TextField(blank=True)

    available = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Dr. {self.user.email}"


class DoctorAvailability(models.Model):

    DAYS = (
        ("Monday", "Monday"),
        ("Tuesday", "Tuesday"),
        ("Wednesday", "Wednesday"),
        ("Thursday", "Thursday"),
        ("Friday", "Friday"),
        ("Saturday", "Saturday"),
        ("Sunday", "Sunday"),
    )

    doctor = models.ForeignKey(
        DoctorProfile,
        on_delete=models.CASCADE,
        related_name="availability"
    )

    day = models.CharField(
        max_length=20,
        choices=DAYS
    )

    start_time = models.TimeField()

    end_time = models.TimeField()

    available = models.BooleanField(default=True)

    class Meta:
        unique_together = ("doctor", "day")
        ordering = ["day"]

    def __str__(self):
        return f"{self.doctor.user.email} - {self.day}"