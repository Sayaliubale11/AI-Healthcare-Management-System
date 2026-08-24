from rest_framework import serializers
from .models import User
from patients.models import PatientProfile
from doctors.models import DoctorProfile


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "password",
            "confirm_password",
            "role",
            "phone",
        )

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                "Passwords do not match."
            )

        return attrs

    def create(self, validated_data):

        validated_data.pop("confirm_password")

        password = validated_data.pop("password")

        user = User.objects.create(**validated_data)

        user.set_password(password)
        user.save()

        if user.role == "PATIENT":
            PatientProfile.objects.create(user=user)

        if user.role == "DOCTOR":
            DoctorProfile.objects.create(
                user=user,
                specialization="General Physician",
                qualification="MBBS",
                experience=0,
                consultation_fee=500,
                hospital="Not Added",
                license_number=f"LIC-{user.id}"
            )

        return user


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "phone",
            "gender",
            "dob",
            "address",
            "profile_image",
            "role",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "email",
            "role",
            "created_at",
            "updated_at",
        )