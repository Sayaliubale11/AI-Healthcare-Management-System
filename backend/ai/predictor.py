# import joblib
# import pandas as pd
# from pathlib import Path

# BASE_DIR = Path(__file__).resolve().parent

# # Load trained model
# model = joblib.load(BASE_DIR / "disease_model.pkl")
# encoder = joblib.load(BASE_DIR / "symptom_encoder.pkl")


# def predict_disease(symptoms):
#     """
#     symptoms = ["itching", "skin_rash", "nodal_skin_eruptions"]
#     """

#     # Convert symptom list to binary vector
#     X = encoder.transform([symptoms])

#     # Predict disease
#     prediction = model.predict(X)[0]

#     return prediction



import joblib
from pathlib import Path


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "disease_model.pkl"
ENCODER_PATH = BASE_DIR / "symptom_encoder.pkl"


# ============================================================
# LOAD MODEL
# ============================================================

model = joblib.load(MODEL_PATH)
encoder = joblib.load(ENCODER_PATH)


# ============================================================
# NORMALIZE SYMPTOM
# ============================================================

def normalize_symptom(symptom):

    symptom = str(symptom).strip().lower()

    # Replace underscores with spaces
    symptom = symptom.replace("_", " ")

    # Remove duplicate spaces
    symptom = " ".join(symptom.split())

    return symptom


# ============================================================
# PREDICT DISEASE
# ============================================================

def predict_disease(symptoms):

    if not symptoms:
        return {
            "error": "Please select at least one symptom."
        }


    # --------------------------------------------------------
    # Normalize symptoms
    # --------------------------------------------------------

    normalized_symptoms = [
        normalize_symptom(symptom)
        for symptom in symptoms
    ]


    # --------------------------------------------------------
    # Keep only symptoms known by the model
    # --------------------------------------------------------

    known_symptoms = set(
        normalize_symptom(symptom)
        for symptom in encoder.classes_
    )


    valid_symptoms = [
        symptom
        for symptom in normalized_symptoms
        if symptom in known_symptoms
    ]


    unknown_symptoms = [
        symptom
        for symptom in normalized_symptoms
        if symptom not in known_symptoms
    ]


    # --------------------------------------------------------
    # No valid symptoms
    # --------------------------------------------------------

    if not valid_symptoms:

        return {
            "error": "None of the selected symptoms are recognized by the AI model.",
            "unknown_symptoms": unknown_symptoms
        }


    # --------------------------------------------------------
    # Encode symptoms
    # --------------------------------------------------------

    X = encoder.transform([valid_symptoms])


    # --------------------------------------------------------
    # Prediction
    # --------------------------------------------------------

    prediction = model.predict(X)[0]


    # --------------------------------------------------------
    # Confidence
    # --------------------------------------------------------

    probabilities = model.predict_proba(X)[0]

    classes = model.classes_


    # Sort diseases by probability
    ranked_predictions = sorted(
        zip(classes, probabilities),
        key=lambda x: x[1],
        reverse=True
    )


    # Top 3 predictions
    top_predictions = [
        {
            "disease": disease,
            "confidence": round(float(probability) * 100, 2)
        }
        for disease, probability in ranked_predictions[:3]
    ]


    # --------------------------------------------------------
    # Main prediction
    # --------------------------------------------------------

    confidence = float(
        probabilities[
            list(classes).index(prediction)
        ]
    )


    return {
        "prediction": prediction,
        "confidence": round(confidence * 100, 2),

        "top_predictions": top_predictions,

        "recognized_symptoms": valid_symptoms,

        "unknown_symptoms": unknown_symptoms
    }