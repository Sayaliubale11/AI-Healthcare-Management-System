from django.urls import path

from .views import (
    AppointmentListCreateView,
    AppointmentDetailView,
    AppointmentStatusUpdateView,
    DoctorAppointmentList,
)

urlpatterns = [

    path(
        "",
        AppointmentListCreateView.as_view(),
        name="appointment-list"
    ),

    path(
        "doctor/",
        DoctorAppointmentList.as_view(),
        name="doctor-appointments"
    ),

    path(
        "<int:pk>/",
        AppointmentDetailView.as_view(),
        name="appointment-detail"
    ),

    path(
        "<int:pk>/status/",
        AppointmentStatusUpdateView.as_view(),
        name="appointment-status"
    ),

]