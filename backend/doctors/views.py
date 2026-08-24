from datetime import datetime

from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

from appointments.models import Appointment

from .models import DoctorProfile, DoctorAvailability
from .serializers import DoctorProfileSerializer
from .utils import generate_time_slots


class DoctorListView(generics.ListAPIView):

    queryset = DoctorProfile.objects.filter(
        available=True
    )

    serializer_class = DoctorProfileSerializer

    permission_classes = [AllowAny]


class DoctorDetailView(generics.RetrieveAPIView):

    queryset = DoctorProfile.objects.all()

    serializer_class = DoctorProfileSerializer

    permission_classes = [AllowAny]


class DoctorAvailableSlotsView(APIView):

    permission_classes = [AllowAny]

    def get(self, request, doctor_id):

        date = request.GET.get("date")

        if not date:

            return Response(
                {
                    "error": "Date parameter is required."
                },
                status=400
            )

        appointment_date = datetime.strptime(
            date,
            "%Y-%m-%d"
        ).date()

        day = appointment_date.strftime("%A")

        availability = DoctorAvailability.objects.filter(
            doctor_id=doctor_id,
            day=day,
            available=True
        ).first()

        if not availability:

            return Response([])

        slots = generate_time_slots(
            availability.start_time,
            availability.end_time
        )

        booked_slots = Appointment.objects.filter(
            doctor_id=doctor_id,
            appointment_date=appointment_date,
            status__in=["PENDING", "APPROVED"]
        ).values_list(
            "appointment_time",
            flat=True
        )

        available_slots = []

        for slot in slots:

            if slot not in booked_slots:

                available_slots.append(
                    slot.strftime("%H:%M")
                )

        return Response(available_slots)