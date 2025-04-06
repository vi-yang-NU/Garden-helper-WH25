# clean_data.py
import pandas as pd
import numpy as np
import re
import openpyxl

# Load dataset
df = pd.read_excel("data_fetch/data_core.xlsx", engine='openpyxl')

# Columns to keep
columns_used = ['brightness', 'temperature', 'solHumidity', 'watering']
df = df[['name', 'commonName'] + columns_used + ["suggestedSoilMix"]]
df.dropna(inplace=True)
df.replace("undefined", np.nan, inplace=True)
df.dropna(inplace=True)

# Remove corrupted brightness rows
df['brightness'] = df['brightness'].astype(str)
df = df[~df['brightness'].str.startswith('202')]

# Remove rows with letters in numeric columns
columns_to_check = df.columns.difference(['commonName'])
def contains_letters(val):
    return bool(re.search(r'[a-zA-Z]', str(val)))
mask = df[columns_to_check].applymap(contains_letters).any(axis=1)
df = df[~mask]

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

# Convert columns to float
columns_to_convert = df.columns.difference(['commonName'])
df[columns_to_convert] = df[columns_to_convert].astype(float)

# Save cleaned data
df.to_csv("cleaned_plants.csv", index=False)
print("\u2705 Cleaned data saved to 'cleaned_plants.csv'")
