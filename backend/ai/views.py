# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny

# from .predictor import predict_disease, encoder


# class PredictDiseaseView(APIView):

#     permission_classes = [AllowAny]

#     def post(self, request):

#         symptoms = request.data.get("symptoms", [])

#         if len(symptoms) == 0:
#             return Response(
#                 {
#                     "error": "Please select at least one symptom."
#                 },
#                 status=400
#             )

#         result = predict_disease(symptoms)

#         return Response(result)


# class SymptomListView(APIView):

#     permission_classes = [AllowAny]

#     def get(self, request):

#         return Response(sorted(list(encoder.classes_)))



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .predictor import predict_disease, encoder


class PredictDiseaseView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        symptoms = request.data.get("symptoms", [])


        # Make sure symptoms is a list
        if not isinstance(symptoms, list):

            return Response(
                {
                    "error": "Symptoms must be provided as a list."
                },
                status=400
            )


        # Remove empty values
        symptoms = [
            symptom
            for symptom in symptoms
            if str(symptom).strip()
        ]


        if len(symptoms) == 0:

            return Response(
                {
                    "error": "Please select at least one symptom."
                },
                status=400
            )


        try:

            result = predict_disease(symptoms)

            if "error" in result:

                return Response(
                    result,
                    status=400
                )

            return Response(
                result,
                status=200
            )

        except Exception as e:

            return Response(
                {
                    "error": "AI prediction failed.",
                    "details": str(e)
                },
                status=500
            )


class SymptomListView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        symptoms = sorted(
            list(encoder.classes_)
        )

        return Response(
            {
                "symptoms": symptoms
            }
        )