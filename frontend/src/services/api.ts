// ==========================================================
// 🌾 AgriGenAI Axios Configuration
// frontend/src/services/api.ts
// ==========================================================

import axios from "axios";

// ==========================================================
// Axios Instance
// ==========================================================

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================================
// Request Interceptor
// Automatically attach JWT token
// ==========================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================================
// Response Interceptor
// ==========================================================

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Authentication failed.");
    }

    return Promise.reject(error);
  }
);

// ==========================================================
// Export
// ==========================================================

export default api;