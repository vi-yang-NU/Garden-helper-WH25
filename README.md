# 🌱 WildHacks 2025 – Garden Helper

## 🎯 Project Theme & Tracks
- **Theme:** Choose Your Own Adventure
- **Tracks:** Agriculture, Productivity/Wellness, and Finance

---

## 👥 Team Members & Roles
- **Vincent Yang** – Backend Lead (AWS, Lambda, RDS, SQS, ML Integration)
- **Lizbeth Yumbia** – Frontend Developer (React UI, API integration)
- **Betty** – Design Lead (UI/UX assets, branding, Adobe After Effects splash screen)
- **Leo** – ML Engineer (ML models, data preprocessing, forecasting)

---

## 🌿 Target Audience
**Urban home growers** who are starting their indoor gardening journey in limited spaces.

---

## ❓ Problem Statement
First-time home growers struggle to understand which plants are suitable for their space and how to maintain plant health over time.

---

## ✅ JTBD (Jobs To Be Done)
> When I’m starting to grow food at home for the first time, I want a simple way to learn which crops are right for my indoor space and how to care for them, so I can grow healthy plants and feel confident in my gardening journey.

---

## 💡 Solution Overview
A **user-friendly website** that recommends indoor crops based on environmental conditions and guides users in caring for their plants through:
- Personalized plant recommendations
- Weekly care reminders
- Plant health forecasting
- Optional email/SMS alerts

---

## 🌼 User Journey
### 1. Onboarding / Setup
- User creates an account (username + password)
- Fills out questionnaire:
  - Location (city)
  - Window access & orientation
  - Gardening experience
  - Desired plant type
  - Home temperature & humidity
  - Watering preference
  - Opt-in for email or SMS alerts

### 2. Dashboard
- View recommended plants categorized by difficulty (easy/medium/hard)
- Track progress of each selected plant

### 3. Weekly Notifications
- Users receive care tips (repotting, soil, watering, lighting, temp changes)
- Delivered via email or SMS based on opt-in

---

## 🛠️ Tech Stack

### ⚙️ Backend
#### 🔹 Part 1: ML Models
- **A. Plant Recommendation Model**  
  - Input: brightness, temperature, humidity, watering
  - Output: Top 10 plant matches
  - Trained in Jupyter using real plant datasets

- **B. Plant Health Forecasting Model**
  - Input: weather + user input (watering, sunlight)
  - Output: Binary health prediction (ok or not)
  - Model exported with `joblib` and hosted on Lambda

- **C. Gemini Prompt Gen (stretch)**
  - Input: Image + context
  - Output: Plant care advice

#### 🔹 Part 2: Cloud Architecture (AWS)
- **Lambda + API Gateway**: Handles requests (login, create user, get/save profile, add plants)
- **S3**: Stores questionnaire and optional image uploads
- **RDS**: MySQL database for user profiles and plant data
- **SQS**: Sends reminders weekly based on user's plant progress
- **EC2**: Hosts the web app and static frontend

### 🖼️ Frontend
- **React** with dynamic routing and tab views
- Integrated onboarding UI & dashboard
- Axios used for all API requests

---

## 🗂️ Database
- ERD located at: `./ERD_DB_diagram.png`

---

## 📆 Sprint Breakdown

### 🏃‍♂️ Sprint 1 (1:00 PM - 6:00 PM)
- 🎨 Betty: Completed all assets and design
- 🤖 Leo: Finished parsing dataset & created base model
- ☁️ Vi: Setup AWS backend (S3, Lambda, RDS)
- 🖥️ Liz: Setup React frontend scaffold

### 🏃‍♀️ Sprint 2 (6:00 PM - 11:00 PM)
- 🤖 Leo: Finished forecasting model
- ☁️ Vi: Linked model to Lambda and SQS, added API endpoints
- 🖥️ Liz: Integrated frontend with API (GET/POST, dynamic UI)
- 🎨 Betty: Created splash screen with Adobe AE

### 🏁 Sprint 3 (8:30 AM - 12:30 PM)
- ✅ Fixed and deployed `recommend_plants.py` to Lambda
- ✅ Created `get_recommended_plants` endpoint
- ✅ Finalized health forecasting model deployment
- ✅ Hooked up weekly scheduler (via Lambda/SQS)
- 🔐 Researched Auth0 integration (stretch goal)

---

## 🔗 References
- [WildHacks Guide](https://guide.wildhacks.net)
- [Plant Dataset - Kaggle](https://www.kaggle.com/datasets)
- [TRY DB](https://www.try-db.org/TryWeb/About.php)
- [PlantLightDB](https://plantlightdb.com/)

---

## 🚀 Submission Deadline
**⏰ Sunday, 12:30 PM (Final Submission)**
