from django.contrib import admin
from .models import DoctorProfile, DoctorAvailability


@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):

    list_display = (
        "user",
        "specialization",
        "experience",
        "consultation_fee",
        "hospital",
        "available",
    )

    search_fields = (
        "user__email",
        "specialization",
        "hospital",
    )

    list_filter = (
        "specialization",
        "available",
    )


@admin.register(DoctorAvailability)
class DoctorAvailabilityAdmin(admin.ModelAdmin):

    list_display = (
        "doctor",
        "day",
        "start_time",
        "end_time",
        "available",
    )

    list_filter = (
        "day",
        "available",
    )