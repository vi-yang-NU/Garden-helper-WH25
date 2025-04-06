import json
import pandas as pd
import os

# Path to your file (assumes cleaned_plants.csv is bundled in the Lambda zip)
CSV_PATH = os.path.join(os.path.dirname(__file__), "cleaned_plants.csv")

# Preload data on cold start
df = pd.read_csv(CSV_PATH)
columns_used = ['brightness', 'temperature', 'solHumidity', 'watering']

def calculate_distance(row, input_data, weights=None, metric='euclidean'):
    total = 0.0
    for col in columns_used:
        diff = row[col] - input_data[col]
        weight = weights.get(col, 1.0) if weights else 1.0

        if metric == 'euclidean':
            total += (diff ** 2) * weight
        elif metric == 'manhattan':
            total += abs(diff) * weight
        else:
            raise ValueError(f"Unsupported metric: {metric}")
    return total

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])

        # Required user input
        user_input = {
            'brightness': float(body['brightness']),
            'temperature': float(body['temperature']),
            'solHumidity': float(body['solHumidity']),
            'watering': float(body['watering'])
        }

        # Optional user weights (defaults if not provided)
        user_weights = body.get('weights', {
            'brightness': 0.5,
            'temperature': 0.5,
            'solHumidity': 1,
            'watering': 100
        })

        # Compute top-k recommendations
        df['Distance'] = df.apply(lambda row: calculate_distance(row, user_input, user_weights), axis=1)
        top_k = df.sort_values(by='Distance').head(10)

        # Return selected plant details
        results = top_k[['commonName', 'watering', 'suggestedSoilMix']].to_dict(orient='records')

        return {
            "statusCode": 200,
            "body": json.dumps({"recommendations": results})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
