# backend/app/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import pandas as pd
from pathlib import Path

from .schemas import MobileFeatures, PredictionResponse
from .model import predict as model_predict, load_model
from .utils import get_price_range

app = FastAPI(
    title="Mobile Price Prediction API",
    description="An API to predict mobile phone price ranges based on their features.",
    version="1.0.0"
)

# CORS is useful for local development when frontend is served on a different port
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """Load the model on startup."""
    try:
        load_model()
    except Exception as e:
        print(f"Error loading model: {e}")

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy"}

@app.post("/predict", response_model=PredictionResponse, tags=["Prediction"])
def predict_price(features: MobileFeatures):
    try:
        feature_df = pd.DataFrame([features.dict()])
        # Ensure column order is correct as per the schema
        feature_df = feature_df[list(MobileFeatures.model_fields.keys())]
        
        prediction = model_predict(feature_df)
        price_range, label = get_price_range(prediction)
        
        return PredictionResponse(
            predicted_class=prediction,
            price_range=price_range,
            label=label
        )
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

# --- Frontend Serving ---

# Path to the frontend directory
# Path two levels up: /app when running in container
project_root = Path(__file__).resolve().parent.parent
frontend_path = (project_root / "frontend").resolve()

# Endpoint to serve the landing page
@app.get("/", response_class=FileResponse, tags=["Frontend"])
async def get_landing_page():
    return FileResponse(frontend_path / "index.html")

# Endpoint to serve the prediction page
@app.get("/predict.html", response_class=FileResponse, tags=["Frontend"])
async def get_predict_page():
    return FileResponse(frontend_path / "predict.html")

# Mount the rest of the frontend directory for static files (CSS, JS)
# This must come AFTER the specific routes above
app.mount("/", StaticFiles(directory=frontend_path), name="static")

