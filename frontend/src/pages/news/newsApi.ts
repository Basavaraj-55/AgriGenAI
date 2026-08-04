import axios from "axios";

// ==========================================
// Backend Base URL
// ==========================================

const BASE_URL = "http://localhost:5000/api";

// ==========================================
// Get Agriculture News
// ==========================================

export const getAgricultureNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/news`);
    return response.data;
  } catch (error) {
    console.error("Error fetching agriculture news:", error);
    throw error;
  }
};

// ==========================================
// Get Government Schemes
// ==========================================

export const getGovernmentSchemes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/schemes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching government schemes:", error);
    throw error;
  }
};