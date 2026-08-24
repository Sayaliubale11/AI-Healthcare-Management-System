from django.urls import path

from .views import (
    PredictDiseaseView,
    SymptomListView,
)

urlpatterns = [

    path(
        "predict/",
        PredictDiseaseView.as_view(),
    ),

    path(
        "symptoms/",
        SymptomListView.as_view(),
    ),

]