# clean_data.py
import pandas as pd
import numpy as np
import re
import openpyxl

# Load dataset
df = pd.read_excel("data_fetch/data_core.xlsx", engine='openpyxl')
df.columns = df.columns.str.strip()  # Remove leading/trailing spaces
print("Loaded data:", df.shape)
print("Columns in dataset:", df.columns.tolist())

# Define the actual expected column names based on observed file
columns_used = ['brightness', 'temperature', 'solHumidity', 'watering']
required_columns = ['name', 'commonName', 'suggestedSoilMix'] + columns_used

# Filter columns that exist
available_columns = [col for col in required_columns if col in df.columns]
df = df[available_columns]
print("After column selection:", df.shape)

df.dropna(inplace=True)
print("After initial dropna:", df.shape)

df.replace("undefined", np.nan, inplace=True)
df.dropna(inplace=True)
print("After replacing 'undefined' and second dropna:", df.shape)

# Remove corrupted brightness rows if present
df['brightness'] = df['brightness'].astype(str)
df = df[~df['brightness'].str.startswith('202')]
print("After filtering brightness starting with '202':", df.shape)

# Remove rows with letters in numeric columns (restricted to numeric columns only)
numeric_columns = [col for col in columns_used if col in df.columns]
def contains_letters(val):
    return bool(re.search(r'[a-zA-Z]', str(val)))
mask = df[numeric_columns].applymap(contains_letters).any(axis=1)
print("Rows with letters in numeric fields:", df[mask].shape)
df = df[~mask]
print("After removing rows with letters in numeric fields:", df.shape)

# Convert ranges like "2_3" or "2,3" into averages
def convert_ranges(val):
    if isinstance(val, str) and ("_" in val or "," in val):
        parts = re.split(r"[_\,]", val)
        try:
            numbers = [float(p) for p in parts]
            return sum(numbers) / len(numbers)
        except:
            return val  
    return val

df = df.applymap(convert_ranges)
print("After converting ranges:", df.shape)

# Convert only numeric columns to float
df[numeric_columns] = df[numeric_columns].astype(float)
print("After converting columns to float:", df.shape)

# Save cleaned data
df.to_csv("cleaned_plants.csv", index=False)
print("\u2705 Cleaned data saved to 'cleaned_plants.csv'")
