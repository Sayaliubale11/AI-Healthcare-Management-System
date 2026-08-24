import os
import joblib
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

ML_DIR = os.path.join(BASE_DIR, "ml")

DATASET_DIR = os.path.join(BASE_DIR, "datasets")


model = joblib.load(
    os.path.join(ML_DIR, "disease_model.pkl")
)

label_encoder = joblib.load(
    os.path.join(ML_DIR, "label_encoder.pkl")
)

symptom_encoder = joblib.load(
    os.path.join(ML_DIR, "symptom_encoder.pkl")
)


description_df = pd.read_csv(
    os.path.join(DATASET_DIR, "symptom_Description.csv")
)

precaution_df = pd.read_csv(
    os.path.join(DATASET_DIR, "symptom_precaution.csv")
)

severity_df = pd.read_csv(
    os.path.join(DATASET_DIR, "Symptom-severity.csv")
)



def predict_disease(symptoms):

    encoded = symptom_encoder.transform([symptoms])

    prediction = model.predict(encoded)

    disease = label_encoder.inverse_transform(prediction)

    return disease[0]


def get_description(disease):

    row = description_df[
        description_df["Disease"] == disease
    ]

    if len(row):

        return row.iloc[0]["Description"]

    return ""


def get_precautions(disease):

    row = precaution_df[
        precaution_df["Disease"] == disease
    ]

    if len(row):

        precautions = []

        for i in range(1,5):

            precautions.append(
                row.iloc[0][f"Precaution_{i}"]
            )

        return precautions

    return []


def calculate_severity(symptoms):

    score = 0

    for symptom in symptoms:

        row = severity_df[
            severity_df["Symptom"] == symptom
        ]

        if len(row):

            score += int(row.iloc[0]["weight"])

    if score <= 8:

        return "Low"

    elif score <= 15:

        return "Medium"

    else:

        return "High"
    


def recommend_specialization(disease):

    mapping = {

        "Fungal infection":"Dermatology",

        "Acne":"Dermatology",

        "Psoriasis":"Dermatology",

        "Heart attack":"Cardiology",

        "Hypertension":"Cardiology",

        "Migraine":"Neurology",

        "Paralysis":"Neurology",

        "Diabetes":"General Physician",

        "GERD":"General Physician",

        "Pneumonia":"General Physician",

        "Arthritis":"Orthopedic",

        "Osteoarthritis":"Orthopedic",

    }

    return mapping.get(
        disease,
        "General Physician"
    )