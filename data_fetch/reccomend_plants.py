# recommend_plants.py
import pandas as pd

# Load cleaned data
df = pd.read_csv("cleaned_plants.csv")

columns_used = ['brightness', 'temperature', 'solHumidity', 'watering']

# Example user input
user_input = {
    'brightness': 3.0,
    'temperature': 3.0,
    'solHumidity': 3.0,
    'watering': 3.0
}

# Optional weights for customization
user_weights = {
    'brightness': 0.5,
    'temperature': 0.5,
    'solHumidity': 1,
    'watering': 100
}

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

# Calculate distances and sort
df['Distance'] = df.apply(lambda row: calculate_distance(row, user_input, user_weights), axis=1)
top_k = df.sort_values(by='Distance').head(10)

# Show top recommendations
print("🌿 Recommended Plants:")
print(top_k[['commonName', 'watering', 'suggestedSoilMix']])
