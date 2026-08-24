from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from .views import home


urlpatterns = [

    path("admin/", admin.site.urls),

    path("api/accounts/", include("accounts.urls")),

    path("api/patients/", include("patients.urls")),

    path("api/doctors/", include("doctors.urls")),

    path("api/appointments/", include("appointments.urls")),

    path("api/ai/", include("ai_module.urls")),

    path("", home, name="home"),

    path("api/ai/", include("ai.urls")),

    path(
    "api/dashboard/",
    include("dashboard.urls")
),

    
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )