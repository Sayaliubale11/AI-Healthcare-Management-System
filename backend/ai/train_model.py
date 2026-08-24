# import pandas as pd
# import numpy as np
# import joblib
# from pathlib import Path

# from sklearn.ensemble import RandomForestClassifier
# from sklearn.preprocessing import MultiLabelBinarizer


# # Project root (AI-Healthcare-System)
# BASE_DIR = Path(__file__).resolve().parent.parent.parent

# # Dataset path
# DATASET_PATH = BASE_DIR / "dataset" / "dataset.csv"

# print("Loading dataset from:", DATASET_PATH)

# # Read CSV
# df = pd.read_csv(DATASET_PATH)

# # Fill empty symptom cells
# df = df.fillna("")

# # Collect symptom columns
# symptom_columns = [col for col in df.columns if col.startswith("Symptom")]

# # Convert each row into a symptom list
# symptom_lists = []

# for _, row in df.iterrows():
#     symptoms = []
#     for col in symptom_columns:
#         value = str(row[col]).strip()
#         if value != "":
#             symptoms.append(value)
#     symptom_lists.append(symptoms)

# # Convert symptoms into binary features
# mlb = MultiLabelBinarizer()
# X = mlb.fit_transform(symptom_lists)

# # Target
# y = df["Disease"]

# # Train model
# model = RandomForestClassifier(
#     n_estimators=200,
#     random_state=42
# )

# model.fit(X, y)

# # Save files
# joblib.dump(model, BASE_DIR / "backend" / "ai" / "disease_model.pkl")
# joblib.dump(mlb, BASE_DIR / "backend" / "ai" / "symptom_encoder.pkl")

# print("Model trained successfully!")
# print("Total diseases:", len(model.classes_))
# print("Total symptoms:", len(mlb.classes_))






import pandas as pd
import joblib
from pathlib import Path

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MultiLabelBinarizer


# ============================================================
# PATHS
# ============================================================

# Project root
# Example:
# AI-Healthcare-System/
# ├── backend/
# │   └── ai/
# │       └── train_model.py
# └── dataset/
#     └── dataset.csv

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DATASET_PATH = BASE_DIR / "dataset" / "dataset.csv"

MODEL_DIR = BASE_DIR / "backend" / "ai"

MODEL_PATH = MODEL_DIR / "disease_model.pkl"
ENCODER_PATH = MODEL_DIR / "symptom_encoder.pkl"


print("=" * 60)
print("AI SYMPTOM CHECKER - MODEL TRAINING")
print("=" * 60)

print("Dataset:", DATASET_PATH)
print("Model:", MODEL_PATH)
print("Encoder:", ENCODER_PATH)


# ============================================================
# CHECK DATASET
# ============================================================

if not DATASET_PATH.exists():
    raise FileNotFoundError(
        f"\nDataset not found!\n"
        f"Expected location:\n{DATASET_PATH}\n\n"
        f"Please make sure dataset.csv exists there."
    )


# ============================================================
# LOAD DATASET
# ============================================================

df = pd.read_csv(DATASET_PATH)

print("\nDataset loaded successfully!")
print("Rows:", len(df))
print("Columns:", list(df.columns))


# ============================================================
# CHECK DISEASE COLUMN
# ============================================================

if "Disease" not in df.columns:
    raise ValueError(
        "Dataset must contain a 'Disease' column."
    )


# ============================================================
# CLEAN DATA
# ============================================================

df = df.fillna("")


# Find all symptom columns
symptom_columns = [
    column
    for column in df.columns
    if column.lower().startswith("symptom")
]

if not symptom_columns:
    raise ValueError(
        "No symptom columns found in dataset."
    )

print("\nSymptom columns:")
print(symptom_columns)


# ============================================================
# CREATE SYMPTOM LIST FOR EACH ROW
# ============================================================

symptom_lists = []

for _, row in df.iterrows():

    symptoms = []

    for column in symptom_columns:

        value = str(row[column]).strip().lower()

        # Remove extra spaces
        value = " ".join(value.split())

        if value and value != "nan":
            symptoms.append(value)

    # Remove duplicate symptoms
    symptoms = list(set(symptoms))

    symptom_lists.append(symptoms)


# ============================================================
# ENCODE SYMPTOMS
# ============================================================

encoder = MultiLabelBinarizer()

X = encoder.fit_transform(symptom_lists)

y = df["Disease"].astype(str).str.strip()


print("\nTraining information:")
print("Total records:", len(X))
print("Total symptoms:", len(encoder.classes_))
print("Total diseases:", len(y.unique()))


# ============================================================
# TRAIN RANDOM FOREST
# ============================================================

model = RandomForestClassifier(
    n_estimators=300,
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    random_state=42,
    class_weight="balanced",
    n_jobs=-1
)


print("\nTraining Random Forest...")

model.fit(X, y)


# ============================================================
# SAVE MODEL
# ============================================================

MODEL_DIR.mkdir(parents=True, exist_ok=True)

joblib.dump(model, MODEL_PATH)

joblib.dump(
    encoder,
    ENCODER_PATH
)


# ============================================================
# COMPLETED
# ============================================================

print("\n" + "=" * 60)
print("MODEL TRAINED SUCCESSFULLY!")
print("=" * 60)

print("Diseases:", len(model.classes_))
print("Symptoms:", len(encoder.classes_))

print("\nModel saved to:")
print(MODEL_PATH)

print("\nEncoder saved to:")
print(ENCODER_PATH)

print("\nSample symptoms:")
print(list(encoder.classes_)[:20])

print("=" * 60)