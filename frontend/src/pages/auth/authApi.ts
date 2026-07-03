// ============================================================
// 🌾 AgriGenAI Authentication API
// ============================================================

const API_URL = "http://127.0.0.1:5000/api";

// ============================================================
// Register User
// ============================================================

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  return await response.json();
}

// ============================================================
// Login User
// ============================================================

export async function loginUser(
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return await response.json();
}

// ============================================================
// Save JWT Token
// ============================================================

export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

// ============================================================
// Get JWT Token
// ============================================================

export function getToken() {
  return localStorage.getItem("token");
}

// ============================================================
// Logout User
// ============================================================

export function logoutUser() {
  localStorage.removeItem("token");
}