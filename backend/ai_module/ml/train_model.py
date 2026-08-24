import pandas as pd
import joblib
from sklearn.preprocessing import MultiLabelBinarizer, LabelEncoder
from sklearn.ensemble import RandomForestClassifier

# Load Dataset
df = pd.read_csv("../datasets/dataset.csv")

# Get all symptom columns
symptom_columns = [col for col in df.columns if col.startswith("Symptom")]

# Replace NaN with empty string
df = df.fillna("")

# Convert symptoms into list
symptoms = []

for _, row in df.iterrows():

    symptom_list = []

    for col in symptom_columns:

        symptom = str(row[col]).strip()

        if symptom != "":
            symptom_list.append(symptom)

    symptoms.append(symptom_list)

# One-hot encode symptoms
mlb = MultiLabelBinarizer()

X = mlb.fit_transform(symptoms)

# Encode disease labels
label_encoder = LabelEncoder()

y = label_encoder.fit_transform(df["Disease"])

# Train Random Forest
model = RandomForestClassifier(
    n_estimators=300,
    random_state=42
)

model.fit(X, y)

# Save model
joblib.dump(model, "disease_model.pkl")

# Save encoders
joblib.dump(label_encoder, "label_encoder.pkl")

joblib.dump(mlb, "symptom_encoder.pkl")

print("===================================")
print("AI Model Trained Successfully")
print("===================================")

print("Diseases :", len(label_encoder.classes_))

print("Symptoms :", len(mlb.classes_))

print("Model Saved Successfully")