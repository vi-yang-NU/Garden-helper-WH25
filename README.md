# wildhacks-2025


# Authors: 

# Vincent Yang 
# Lizbeth Yumbia
# Betty 
# Leo 


# Target audience: 
Target Audience: home growers in urban areas

# Problem Statement: 

Problem: New home growers seeking to start indoor horticulture in small or limited spaces

# JTBD: 

When I’m starting to grow food at home for the first time, I want a simple way to learn which crops are right for my indoor space and how to care for them, so I can grow healthy plants successfully and feel confident in my gardening journey.

# Solution: 

Our Solution: A user-friendly website that helps first-time growers learn the conditions needed to successfully grow their favorite crops indoors — and track their garden’s progress over time.

# User Journey: 
User "set up" 
1. Create Username/Password 
2. Users fills out questionare  
    - Which city do you live in 
    - Do you have access to window/ direct sunlight
        - What's the orientation of the windows 
        (find it with compass)
    - Have you grown plants before? 
    - What type of plant do you want to grow 
3. Have a seperate page that shows we will help you track your progress
    - they can opt in or out
    - We will let you know if your plant needs "supplements" i.e. x hours of artificial sunlight, x more or less watering times, by sending it to your email or text
        - Ask for if they want to be emailed or texted 
4. User sees a dashboard with the reccomended plants for them (categorized), they will be shown plants that they want to grow be categorized into easy medium and hard. User clicks on cards, they will then exit set up 

"Home page" 
6. Home page has the different cards that the user can check what progress they are on with different plants. They can click each one to expand and finish set up for the plant (if they have not)

7. User will be sent an email that tells them what to do that week. 

# Backend: 
Part 1. Model 
    - Part A. 
        what: Prediction of what plants would be good to plant 
        how: ML training on Jypter Notebook 
    - Part B. Forecasting 

Part 2. Architecture 
- We save user's email and pass and once verified we can pass token for each call (stretch goal)
- User's questionare gets sent to S3 bucket 


# User Journey: 



# Sprint #1  1:00 PM - 6:00 PM 

- Art and design wise: have all assets and designs ready by 6 PM Betty 

- Come up with ML model using the data from Kaggle to predict which plants would grow better. (i.e. the user is going to buy 1 soil, or they can make their own soil combination, but which plants can they have given a nitrogen, phosphorus, potassium). 
So for a given combination of the three minerals, which plants would work the best, and what is the range of possible plant values we can get from decreasing one/ increasing another. 
- Additionally do this calcuation on humidity and temperature.  - Leo 


# Logistics and notes: 
guide.wildhacks.net 


# Project overview: 


# Project Architecture: 
- Cloud Infrastructure to create accounts 
- AI/ ML training, datasets from HuggingFace (?), fine-tuning TensorFlow or PyTorch models
- Using Google Gemeni 

Tracks: 
- Agriculture, productivity/wellness and Finance 
