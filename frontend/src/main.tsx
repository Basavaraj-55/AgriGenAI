// ============================================================
// 🌾 AgriGenAI
// Main Entry Point
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

// Initialize i18next
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);