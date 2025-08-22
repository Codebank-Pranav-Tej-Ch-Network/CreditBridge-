import joblib
import pandas as pd
from pathlib import Path
import json

# Build a path to the model file relative to the function file
MODEL_PATH = Path(__file__).parent / "stacked_ensemble_pipeline.pkl"
pipeline = joblib.load(MODEL_PATH)

def handler(event, context):
    # Netlify provides the request body as a JSON string
    body = json.loads(event['body'])

    # Create a pandas DataFrame from the input data
    feature_cols = [
        'Bank transaction average(per month)', 'social media screentime',
        'e-commerce screen time', 'CIBIL score', 'geographical movement',
        'social media reach'
    ]

    input_df = pd.DataFrame([[
        body.get('bank_transaction_average'),
        body.get('social_media_screentime'),
        body.get('ecommerce_screen_time'),
        body.get('cibil_score'),
        body.get('geographical_movement'),
        body.get('social_media_reach')
    ]], columns=feature_cols)

    # Make prediction and get probability
    prediction = pipeline.predict(input_df)[0]
    probability = pipeline.predict_proba(input_df)[0][1]

    # Return the result in the format Netlify expects
    response = {
        "prediction": int(prediction),
        "approval_probability": float(probability)
    }

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps(response)
    }
