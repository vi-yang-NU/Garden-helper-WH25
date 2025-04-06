import json
import joblib
import os
import pandas as pd

# Load model on cold start
MODEL_PATH = os.path.join(os.path.dirname(__file__), "plant_health_model.joblib")
model = joblib.load(MODEL_PATH)

def lambda_handler(event, context):
    try:
        # Parse body
        body = json.loads(event["body"]) if isinstance(event["body"], str) else event["body"]

        # Extract input
        input_data = pd.DataFrame([{
            "avg_temp": float(body["avg_temp"]),
            "humidity": float(body["humidity"]),
            "sunlight_hrs": float(body["sunlight_hrs"]),
            "watering_frequency": float(body["watering_frequency"])
        }])

        # Predict
        prediction = model.predict(input_data)[0]
        label = "Plant is doing well" if prediction == 1 else "Plant is dying"

        return {
            "statusCode": 200,
            "body": json.dumps({"prediction": label})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
