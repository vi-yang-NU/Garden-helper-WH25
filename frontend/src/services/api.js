import axios from 'axios';

// Replace this with your actual API Gateway base URL
const BASE_URL = 'https://vql82dptpk.execute-api.us-east-2.amazonaws.com/prod';

// Create a new user (calls Lambda: create_user)
export async function createUser({ username, password, email, phone }) {
  const res = await axios.post(`${BASE_URL}/users`, {
    username,
    password,
    email,
    phone,
  });
  return res.data;
}

// Login user (calls Lambda: login_user)
export async function loginUser({ username, password }) {
  const res = await axios.post(`${BASE_URL}/login`, {
    username,
    password,
  });
  return res.data;
}

// Save user profile (calls Lambda: save_profile)
export async function saveUserProfile(profile) {
  const res = await axios.post(`${BASE_URL}/user-profile`, profile);
  return res.data;
}

// Add user plant (calls Lambda: add_user_plant)
export async function addUserPlant({ user_id, plant_id, progress_stage, setup_complete }) {
  const res = await axios.post(`${BASE_URL}/user-plants`, {
    user_id,
    plant_id,
    progress_stage,
    setup_complete,
  });
  return res.data;
}

// Get user plants (calls Lambda: get_user_plants)
export async function getUserPlants(userId) {
  const res = await axios.get(`${BASE_URL}/get_user_plants?`, {
    params: { user_id: userId },
  });
  return res.data;
}


// Get plant details (calls Lambda: get_plant_details)
export async function getRecommendations(input) {
  const res = await axios.get(`${BASE_URL}/recc`, input);
  return res.data.recommendations;
}