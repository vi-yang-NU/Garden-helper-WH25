#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
import re


# In[25]:


df = pd.read_excel("data_core.xlsx")
# dataset used: https://github.com/biologiste95/plant-dataset/tree/plantDataSet


# In[3]:


columns_used = ['brightness', 'temperature', 'solHumidity', 'watering']


# In[4]:


df = df[['name'] + ['commonName'] + columns_used + ["suggestedSoilMix"]]
df = df.dropna()
pd.set_option('display.max_rows', None)


# In[5]:


df.replace("undefined", np.nan, inplace=True)
df.dropna(inplace=True)


# In[6]:


df['brightness'] = df['brightness'].astype(str)
df = df[~df['brightness'].str.startswith('202')]


# In[7]:


columns_to_check = df.columns.difference(['commonName'])
def contains_letters(val):
    return bool(re.search(r'[a-zA-Z]', str(val)))
mask = df[columns_to_check].applymap(contains_letters).any(axis=1)
df = df[~mask]


# In[8]:


def convert_ranges(val):
    if isinstance(val, str) and ("_" in val or "," in val):
        parts = re.split(r"[_\,]", val)
        try:
            numbers = [float(p) for p in parts]
            return sum(numbers) / len(numbers)
        except:
            return val  
    return val


# In[9]:


df = df.applymap(convert_ranges)


# In[24]:


columns_to_convert = df.columns.difference(['commonName'])
df[columns_to_convert] = df[columns_to_convert].astype(float)


# In[11]:


user_weights = { # example weights, default is all ones, user slider may change these manually
    'brightness': 0.5,
    'temperature': 0.5,
    'solHumidity': 1,
    'watering': 100
}


# In[ ]:


def calculate_brightness(desired_directions):
    if desired_directions = {}:
        user_input['brightness'] = 3
    elif "east" in desired_directions:
        # recommend brightness = 2
    elif "north" in desired_directions:
        # recommend brightness = 2.5
    elif "west" in desired_directions:
        # recommend brightness = 1.5
    elif "south" in desired_directions:
        # recommend brightness = 1


# In[ ]:


def calculate_temperature(room_temperature):
    if 60 <= room_temperature <= 80:
        return 3 - ((room_temperature - 60) / 20) * 2
    else:
        raise ValueError("Value must be between 60 and 80")


# In[ ]:


def calculate_humidity(room_humidity):
    if 20 <= room_humidity <= 60:
        return 3 - ((room_humidity - 20) / 40) * 2
    else:
        raise ValueError("Value must be between 20 and 60")


# In[ ]:


# what follows are example cases


# In[18]:


user_input = {
    'brightness': 3.0, 
    # the higher the number, the less sunlight is needed. 
    # 3: place plants in a north facing room with lots of shade 
    # 2: place plants in a bright room with some direct sunlight
    # 1: place plants in a sunroom or directly in sunlight
    'temperature': 3.0,
    # the higher the number, the less heat-resistant it is in daytime (this is more relevant for plants on windowsills, for example)
    # 3: 60-70 degrees
    # 2: 60-80 degrees
    # 1: 60-90 degrees thrives in higher temperature
    'solHumidity': 3.0,
    # the higher the number, the less humid soil your plant needs
    # 3: 40% soil humidity (less moist, water drains well)
    # 2: 50% soil humidity (reliably moist)
    # 1: 60% soil humidity (very humid)
    'watering': 3.0
    # the higher the number, the less watering plant needs
    # 3: cacti (2-3 weeks)
    # 2: average-care household plant (1-2 times a week)
    # 1: neeeeeeed water (at least daily, if not more)
}


# In[19]:


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


# In[20]:


df['Distance'] = df.apply(lambda row: calculate_distance(row, user_input, user_weights), axis=1)


# In[21]:


top_k = df.sort_values(by='Distance').head(10)
print("Recommended Plants:")
print(top_k[['commonName', 'watering', 'suggestedSoilMix']])


# In[22]:


df['Distance'] = df.apply(lambda row: calculate_distance(row, user_input), axis=1)


# In[23]:


top_k = df.sort_values(by='Distance').head(10)
print("Recommended Plants:")
print(top_k[['commonName', 'watering', 'suggestedSoilMix']])

