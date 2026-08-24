# from rest_framework import serializers
# from .models import DoctorProfile, DoctorAvailability


# class DoctorProfileSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = DoctorProfile
#         fields = "__all__"


# class DoctorAvailabilitySerializer(serializers.ModelSerializer):

#     class Meta:
#         model = DoctorAvailability
#         fields = "__all__"






from rest_framework import serializers
from .models import DoctorProfile, DoctorAvailability


class DoctorProfileSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source="user.email", read_only=True)

    class Meta:
        model = DoctorProfile
        fields = [
            "id",
            "doctor_name",
            "specialization",
            "qualification",
            "experience",
            "consultation_fee",
            "hospital",
            "license_number",
            "biography",
            "available",
        ]


class DoctorAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorAvailability
        fields = "__all__"