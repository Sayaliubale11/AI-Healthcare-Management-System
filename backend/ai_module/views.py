from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .serializers import SymptomPredictionSerializer

from .utils import (
    predict_disease,
    get_description,
    get_precautions,
    calculate_severity,
    recommend_specialization,
)


class SymptomPredictionView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = SymptomPredictionSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        symptoms = serializer.validated_data["symptoms"]

        disease = predict_disease(symptoms)

        description = get_description(disease)

        precautions = get_precautions(disease)

        severity = calculate_severity(symptoms)

        specialist = recommend_specialization(disease)

        return Response({

            "predicted_disease": disease,

            "description": description,

            "precautions": precautions,

            "severity": severity,

            "recommended_specialization": specialist,

        })