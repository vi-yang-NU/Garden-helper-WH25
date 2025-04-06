# 🌱 WildHacks 2025 – Garden Helper

## 🎯 Project Theme & Tracks
- **Theme:** Choose Your Own Adventure
- **Tracks:** Agriculture, Productivity/Wellness, and Finance

---

## 👥 Team Members & Roles
- **Vincent Yang** – Backend (AWS, Lambda, RDS, SQS, ML Integration)
- **Lizbeth Yumbia** – Frontend (React UI, API integration)
- **Betty Dong** – Design Lead (UI/UX assets, branding, Adobe After Effects splash screen)
- **Leo Chang** – ML Engineer (ML models, data preprocessing, forecasting)

---

## 🌿 Target Audience
**Urban home growers** who are starting their indoor gardening journey in limited spaces.

---
<img src="toileeto.png" alt="Toileeto" width="100">

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

- **C. Gemini Prompt Gen (stretch - did not have time for)**
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
- ☁️ Vi: Added API endpoints and set up DB and schema
- 🖥️ Liz: Integrated frontend with API (GET/POST, dynamic UI)
- 🎨 Betty: Created splash screen with Adobe AE

### 🏁 Sprint 3 (8:30 AM - 12:30 PM)
- ✅ Fixed and deployed `recommend_plants.py` to Lambda
- ✅ Created `get_recommended_plants` endpoint
- ❎ Finalized health forecasting model deployment
- ❎ Hooked up weekly scheduler (via Lambda/SQS)
- ❎ Researched Auth0 integration (stretch goal - did not have time for)

---

## 🚧 Issues We Ran Into
⚠️ Frontend–Backend Integration:
- We needed more help linking React to AWS Lambda. A dedicated fullstack engineer would have helped smooth out deployment and CORS issues.
❌ SQS + Model Automation:
- We weren’t able to finish connecting the ML forecasting model to a scheduler or SQS. This broke our automation pipeline for weekly plant care tips.
🌐 CORS and API Gateway:
- None of us had prior experience configuring CORS or securely exposing Lambda endpoints to the frontend. This cost several hours in debugging.
🧠 SageMaker + ML Deployment:
- Deploying a joblib model on Lambda turned out to be memory-intensive and error-prone. We needed more guidance on using SageMaker.
💻 Frontend Bottleneck:
- With only one React developer, it was hard to keep up with backend changes. Reallocating a designer to help with frontend could’ve helped.
📉 Data Limitations:
- We lacked robust real-world data for training the forecasting model. Our current model is a rough simulation trained on synthetic data.
  
---

## 🔗 References
- [WildHacks Guide](https://guide.wildhacks.net)
- [Plant Dataset - Kaggle](https://www.kaggle.com/datasets)
- [TRY DB](https://www.try-db.org/TryWeb/About.php)
- [PlantLightDB](https://plantlightdb.com/)

---

## 🚀 Submission Timeline
**⏰ Saturday, 1 PM (Start)**
**⏰ Sunday, 1 PM (Final Submission)**
