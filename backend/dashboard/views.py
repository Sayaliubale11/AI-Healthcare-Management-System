from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from appointments.models import Appointment
from doctors.models import DoctorProfile
from patients.models import PatientProfile

User = get_user_model()


class AdminDashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != "ADMIN":
            return Response(
                {"error": "Admin access only"},
                status=403
            )

        return Response({
            "total_users": User.objects.count(),
            "total_doctors": DoctorProfile.objects.count(),
            "total_patients": PatientProfile.objects.count(),
            "total_appointments": Appointment.objects.count(),

            "pending_appointments":
                Appointment.objects.filter(
                    status="PENDING"
                ).count(),

            "approved_appointments":
                Appointment.objects.filter(
                    status="APPROVED"
                ).count(),

            "completed_appointments":
                Appointment.objects.filter(
                    status="COMPLETED"
                ).count(),

            "cancelled_appointments":
                Appointment.objects.filter(
                    status="CANCELLED"
                ).count(),
        })