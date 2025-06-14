# backend/app/model.py
import joblib
import pandas as pd
from pathlib import Path

# Path to the model file, assuming the script is run from the project root
MODEL_PATH = Path(__file__).parent.parent.parent / "models" / "best_model_SVM_20250614_191042.pkl"

model = None

def load_model():
    """Loads the pre-trained model from the file."""
    global model
    if not MODEL_PATH.exists():
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully.")

def predict(features: pd.DataFrame) -> int:
    """Makes a prediction using the loaded model."""
    if model is None:
        raise RuntimeError("Model is not loaded. Call load_model() first.")
    
    prediction = model.predict(features)
    return int(prediction[0])
