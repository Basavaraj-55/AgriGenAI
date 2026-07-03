import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

# Load Dataset
data = pd.read_csv("Crop_recommendation.csv")

# Features
X = data.drop("label", axis=1)

# Target
y = data["label"]

# Encode labels
encoder = LabelEncoder()
y = encoder.fit_transform(y)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train Model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# Prediction
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save Model
joblib.dump(model, "crop_model.pkl")

# Save Label Encoder
joblib.dump(encoder, "label_encoder.pkl")

print("✅ Model Saved Successfully!")
print("✅ Label Encoder Saved Successfully!")