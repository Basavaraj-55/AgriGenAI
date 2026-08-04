// ============================================================
// 🌾 AgriGenAI Authentication API
// frontend/src/pages/auth/authApi.ts
// ============================================================


// ============================================================
// Backend Authentication API URL
// ============================================================

const API_URL = "http://127.0.0.1:5000/api/auth";


// ============================================================
// Register User
// ============================================================

export async function registerUser(
  name: string,
  email: string,
  password: string
) {

  const response = await fetch(
    `${API_URL}/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name.trim(),

        email: email.trim().toLowerCase(),

        password,
      }),
    }
  );


  const data = await response.json();

  return data;
}


// ============================================================
// Login User
// ============================================================

export async function loginUser(
  email: string,
  password: string
) {

  const response = await fetch(
    `${API_URL}/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email.trim().toLowerCase(),

        password,
      }),
    }
  );


  const data = await response.json();

  return data;
}


// ============================================================
// Save JWT Token
// ============================================================

export function saveToken(
  token: string
) {

  localStorage.setItem(
    "token",
    token
  );
}


// ============================================================
// Get JWT Token
// ============================================================

export function getToken() {

  return localStorage.getItem(
    "token"
  );
}


// ============================================================
// Check User Login
// ============================================================

export function isLoggedIn() {

  const token = getToken();

  return Boolean(token);
}


// ============================================================
// Logout User
// ============================================================

export function logoutUser() {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );
}