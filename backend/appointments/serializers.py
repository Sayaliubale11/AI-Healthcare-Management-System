from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):

    patient_name = serializers.CharField(
        source="patient.user.email",
        read_only=True
    )

    doctor_name = serializers.CharField(
        source="doctor.user.email",
        read_only=True
    )

    class Meta:
        model = Appointment
        fields = "__all__"
        read_only_fields = ("patient",)

    def validate(self, data):

        doctor = data["doctor"]
        date = data["appointment_date"]
        time = data["appointment_time"]

        appointment = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=date,
            appointment_time=time,
            status__in=["PENDING", "APPROVED"]
        )

        if appointment.exists():
            raise serializers.ValidationError(
                "This time slot is already booked."
            )

        return data