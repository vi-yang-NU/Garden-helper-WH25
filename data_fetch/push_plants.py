import pandas as pd
import mysql.connector  # or use your preferred DB adapter
import configparser


# Load the CSV
df = pd.read_csv("data_fetch/cleaned_plants.csv")

# Normalize column names (optional cleanup)
df.columns = df.columns.str.strip()
df = df[['name', 'commonName', 'suggestedSoilMix', 'brightness', 'temperature', 'solHumidity', 'watering']]

# Difficulty scoring logic
def calculate_difficulty(row):
    score = 0
    score += (4 - row['brightness'])    
    score += (4 - row['watering'])      
    score += (4 - row['solHumidity'])   
    score += (4 - row['temperature'])   
    return score

def categorize_difficulty(score, thresholds):
    if score <= thresholds['easy']:
        return 'easy'
    elif score <= thresholds['medium']:
        return 'medium'
    else:
        return 'hard'

# Calculate difficulty score and label
df['difficulty_score'] = df.apply(calculate_difficulty, axis=1)
easy_thresh = df['difficulty_score'].quantile(0.3)
medium_thresh = df['difficulty_score'].quantile(0.6)
df['difficulty'] = df['difficulty_score'].apply(lambda s: categorize_difficulty(s, {
    'easy': easy_thresh,
    'medium': medium_thresh
}))

config = configparser.ConfigParser()
config.read("data_fetch/hacks-config.ini")

# Connect to DB (replace with your credentials)
rds_config = config["rds"]
conn = mysql.connector.connect(
    host=rds_config["endpoint"],
    port=int(rds_config["port_number"]),
    user=rds_config["user_name"],
    password=rds_config["user_pwd"],
    database=rds_config["db_name"]
)
cursor = conn.cursor()

# Drop and recreate the tables
cursor.execute("DROP TABLE IF EXISTS user_plants;")
cursor.execute("DROP TABLE IF EXISTS plants;")

cursor.execute("""
CREATE TABLE plants (
    plant_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    common_name VARCHAR(100),
    difficulty ENUM('easy', 'medium', 'hard'),
    brightness FLOAT,
    temperature FLOAT,
    sol_humidity FLOAT,
    watering FLOAT,
    suggested_soil_mix TEXT
)
""")

cursor.execute("""
CREATE TABLE user_plants (
    user_plant_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    plant_id INT,
    progress_stage VARCHAR(100),
    setup_complete BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (plant_id) REFERENCES plants(plant_id)
)
""")

# Insert into plants table
for _, row in df.iterrows():
    cursor.execute("""
        INSERT INTO plants (name, common_name, difficulty, brightness, temperature, sol_humidity, watering, suggested_soil_mix)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        row['name'],
        row['commonName'],
        row['difficulty'],
        row['brightness'],
        row['temperature'],
        row['solHumidity'],
        row['watering'],
        row['suggestedSoilMix']
    ))

# Optional: Insert a corresponding user_plant entry for testing (user_id = 1)
cursor.execute("SELECT plant_id FROM plants")
plant_ids = cursor.fetchall()

for plant_id in plant_ids:
    cursor.execute("""
        INSERT INTO user_plants (user_id, plant_id, progress_stage, setup_complete)
        VALUES (%s, %s, %s, %s)
    """, (
        1,  # mock user_id
        plant_id[0],
        "setup",
        False
    ))

conn.commit()
cursor.close()
conn.close()

print("✅ Data inserted into plants and user_plants.")
