import pandas as pd
import requests
from datetime import datetime
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import configparser


# --- CONFIGURATION ---
config = configparser.ConfigParser()
config.read('weather-config.ini')
API_KEY = config['Default']['weather_api']

# --- FETCH WEATHER DATA ---
def get_location():
    location = requests.get("https://ipinfo.io").json()
    city = location['city']
    lat, lon = location['loc'].split(',')
    return city, lat, lon

def get_forecast(lat, lon):
    url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=imperial&appid={API_KEY}"
    res = requests.get(url)
    return res.json()['list']

def process_forecast(forecast_list):
    data = []
    for entry in forecast_list:
        dt = datetime.fromtimestamp(entry['dt'])
        temp = entry['main']['temp']
        humidity = entry['main']['humidity']
        clouds = entry['clouds']['all']
        data.append([dt.date(), temp, humidity, clouds])
    df = pd.DataFrame(data, columns=['date', 'temp', 'humidity', 'clouds'])
    daily_avg = df.groupby('date').mean(numeric_only=True).reset_index()
    overall_avg = daily_avg.mean(numeric_only=True)
    sunlight_hrs = 30 * 0.01 * overall_avg['clouds']
    return overall_avg, sunlight_hrs

# --- ML MODEL ---
def train_model():
    data = {
        'avg_temp': [75, 60, 90, 85, 70, 55, 88, 62, 65, 82],
        'humidity': [30, 60, 25, 20, 50, 70, 40, 65, 45, 55],
        'sunlight_hrs': [10, 5, 12, 11, 7, 4, 9, 6, 8, 10],
        'watering_frequency': [2, 3, 1, 1, 3, 3, 2, 3, 2, 1],
        'plant_ok': [0, 1, 0, 0, 1, 1, 1, 1, 1, 0]
    }
    df = pd.DataFrame(data)
    X = df.drop('plant_ok', axis=1)
    y = df['plant_ok']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    print("\n📊 Classification Report:\n", classification_report(y_test, model.predict(X_test)))
    return model

# --- PREDICTION LOGIC ---
def predict_plant_health(model, input_data):
    new_input = pd.DataFrame([input_data])
    prediction = model.predict(new_input)
    print("\n🌱 Prediction:", "Doing well ✅" if prediction[0] == 1 else "Plant dying ❌")

# --- LIGHT NEED ---
def light_need(brightness, sunlight_hrs):
    required = max(0, (-2 * brightness + 8) - (sunlight_hrs / 6))
    if required == 0:
        print("☀️ Perfect amount of sunlight!")
    else:
        print(f"🕶️ Needs {required:.2f} more hours of sun tomorrow.")
    return required

# --- MAIN EXECUTION ---
if __name__ == "__main__":
    city, lat, lon = get_location()
    print(f"📍 Location detected: {city}")

    forecast = get_forecast(lat, lon)
    avg_weather, sunlight_hrs = process_forecast(forecast)

    print(f"\n🌡️ Avg Temp: {avg_weather['temp']:.2f}°F")
    print(f"💧 Avg Humidity: {avg_weather['humidity']:.2f}%")
    print(f"☁️ Cloudiness: {avg_weather['clouds']:.2f}%")
    print(f"☀️ Est. sunlight hours (next 5 days): {sunlight_hrs:.2f} hrs")

    input_data = {
        'avg_temp': avg_weather['temp'],
        'humidity': avg_weather['humidity'],
        'sunlight_hrs': sunlight_hrs,
        'watering_frequency': 2  # You can prompt the user here
    }

    model = train_model()
    predict_plant_health(model, input_data)

    # Optional: load CSV and run light logic
    try:
        df = pd.read_csv('cleaned_plants.csv')
        for index, row in df.iterrows():
            print(f"\n🪴 {row['commonName']}")
            light_need(row['brightness'], sunlight_hrs)
    except Exception as e:
        print("⚠️ Could not read cleaned_plants.csv:", e)
