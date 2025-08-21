import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel

# Initialize the FastAPI app
app = FastAPI()

# Load the trained pipeline once when the server starts
# This is efficient as it doesn't reload the model on every request
pipeline = joblib.load('api/stacked_ensemble_pipeline.pkl')

# Define the structure of the input data from the frontend using Pydantic
# These field names MUST match the JSON keys sent from your Next.js app
class UserInput(BaseModel):
    bank_transaction_average: float
    social_media_screentime: float
    ecommerce_screen_time: float
    cibil_score: int
    geographical_movement: float
    social_media_reach: int

# Define the prediction endpoint
@app.post("/predict")
def predict_loan_approval(data: UserInput):
    # Create a pandas DataFrame from the input data.
    # The column names MUST EXACTLY match the names the model was trained on.
    feature_cols = [
        'Bank transaction average(per month)',
        'social media screentime',
        'e-commerce screen time',
        'CIBIL score',
        'geographical movement',
        'social media reach'
    ]
    
    input_df = pd.DataFrame([[
        data.bank_transaction_average,
        data.social_media_screentime,
        data.ecommerce_screen_time,
        data.cibil_score,
        data.geographical_movement,
        data.social_media_reach
    ]], columns=feature_cols)

    # Make prediction and get probability
    prediction = pipeline.predict(input_df)[0]
    probability = pipeline.predict_proba(input_df)[0][1] # Probability of approval (class 1)

    # Return the result as JSON
    return {
        "prediction": int(prediction),
        "approval_probability": float(probability)
    }
