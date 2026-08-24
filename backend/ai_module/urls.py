from django.urls import path

from .views import SymptomPredictionView

urlpatterns = [

    path(
        "predict/",
        SymptomPredictionView.as_view(),
        name="predict-disease",
    ),

]