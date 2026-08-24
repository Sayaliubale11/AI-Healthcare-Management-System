from rest_framework import serializers


class SymptomPredictionSerializer(serializers.Serializer):

    symptoms = serializers.ListField(
        child=serializers.CharField()
    )