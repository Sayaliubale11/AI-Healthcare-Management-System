from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from patients.models import PatientProfile
from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentListCreateView(generics.ListCreateAPIView):

    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        if user.role == "DOCTOR":
            return Appointment.objects.filter(
                doctor__user=user
            )

        elif user.role == "PATIENT":
            return Appointment.objects.filter(
                patient__user=user
            )

        return Appointment.objects.all()

    def perform_create(self, serializer):

        patient = PatientProfile.objects.get(
            user=self.request.user
        )

        serializer.save(patient=patient)


class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]


class AppointmentStatusUpdateView(generics.UpdateAPIView):

    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):

        appointment = self.get_object()

        status_value = request.data.get("status")

        doctor_notes = request.data.get("doctor_notes", "")

        appointment.status = status_value
        appointment.doctor_notes = doctor_notes

        appointment.save()

        return Response(
            AppointmentSerializer(appointment).data,
            status=status.HTTP_200_OK
        )


class DoctorAppointmentList(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "DOCTOR":
            return Response(
                {
                    "error": "Only doctors can access this."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        doctor = request.user.doctor_profile

        appointments = Appointment.objects.filter(
            doctor=doctor
        )

        serializer = AppointmentSerializer(
            appointments,
            many=True
        )

        return Response(serializer.data)