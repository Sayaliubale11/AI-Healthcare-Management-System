from django.urls import path

from .views import RegisterView
from .views import ProfileView

from rest_framework_simplejwt.views import TokenRefreshView
from .jwt_views import CustomTokenObtainPairView

urlpatterns = [

    path(
        'register/',
        RegisterView.as_view()
    ),

    path(
    "login/",
    CustomTokenObtainPairView.as_view(),
),

    path(
        'refresh/',
        TokenRefreshView.as_view()
    ),

    path(
        'profile/',
        ProfileView.as_view()
    ),

]