from rest_framework import serializers
from .models import PatientProfile


class PatientProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = PatientProfile

        fields = (
            "id",
            "user",
            "blood_group",
            "height",
            "weight",
            "emergency_contact",
            "allergies",
            "medical_history",
        )

        read_only_fields = (
            "id",
            "user",
        )

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)