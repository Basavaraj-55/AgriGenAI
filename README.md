# 🌾 AgriGenAI – AI-Powered Smart Agriculture Platform

AgriGenAI is a full-stack Artificial Intelligence-powered smart agriculture platform designed to help farmers make better farming decisions using Machine Learning, Deep Learning, Generative AI, and real-time agricultural data.

The platform provides intelligent crop recommendations, plant disease detection, fertilizer guidance, weather forecasting, smart irrigation recommendations, market-price prediction, multilingual support, agricultural news, government schemes, and a RAG-powered AI farmer assistant.

---

## 🚀 Project Features

### 🌱 Crop Recommendation

- Recommends suitable crops using soil and environmental conditions.
- Uses Machine Learning for intelligent crop prediction.
- Accepts:
  - Nitrogen
  - Phosphorus
  - Potassium
  - Temperature
  - Humidity
  - Soil pH
  - Rainfall

### 🍃 Plant Disease Detection

- Detects potato leaf diseases from uploaded images.
- Uses a Deep Learning image-classification model.
- Identifies:
  - Early Blight
  - Late Blight
  - Healthy Leaf
- Provides:
  - Disease symptoms
  - Possible causes
  - Treatment suggestions
  - Prevention methods

### 🧪 Fertilizer Recommendation

- Provides fertilizer recommendations based on:
  - Crop
  - Plant symptoms
  - Growth stage
  - Disease severity
  - Irrigation availability
- Suggests chemical and organic fertilizer alternatives.

### 🌦️ Weather Forecast

- Displays weather information useful for farming.
- Helps farmers plan irrigation and agricultural activities.

### 💧 Smart Irrigation

- Analyzes:
  - Soil moisture
  - Temperature
  - Humidity
  - Rainfall
  - Wind speed
- Recommends whether irrigation is required.
- Estimates the required amount of water.

### 📈 Market-Price Prediction

- Predicts agricultural crop prices.
- Displays:
  - Current price
  - Predicted price
  - Market trend
  - Expected profit
  - Recommended selling period

### 🤖 RAG-Powered AI Farmer Assistant

- Uses Retrieval-Augmented Generation.
- Retrieves information from an agricultural knowledge base.
- Uses semantic search and vector embeddings.
- Generates context-aware agricultural responses.
- Powered by Gemini AI.

### 📄 Soil Health Card Reader

- Extracts agricultural information from uploaded soil-health cards.
- Supports image and document processing.
- Helps automatically fill crop-recommendation inputs.

### 📰 Farmer News and Government Schemes

- Displays agriculture-related news.
- Provides information about government schemes and farmer support programs.

### 🌐 Multilingual Support

- Provides language support for farmers.
- Improves accessibility for users who prefer regional languages.

### 🔐 User Authentication

- User registration
- Secure login
- Password hashing using bcrypt
- JWT authentication
- Forgot-password feature
- OTP generation and verification
- Secure password reset

> During development, the password-reset OTP is displayed in the Flask backend terminal instead of being sent through email.

---

## 🛠️ Technology Stack

### Frontend

- React.js
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- Python
- Flask
- Flask-CORS
- REST APIs
- JWT Authentication
- bcrypt

### Database

- MongoDB

### Artificial Intelligence and Machine Learning

- Machine Learning
- Deep Learning
- TensorFlow
- Scikit-learn
- NumPy
- OpenCV
- Pillow
- Joblib

### Generative AI and RAG

- Gemini AI
- LangChain
- Hugging Face Embeddings
- Sentence Transformers
- ChromaDB
- Cross-Encoder Reranking
- Retrieval-Augmented Generation

---

## 📁 Project Structure

```text
agrigenai/
│
├── backend/
│   │
│   ├── app.py
│   │
│   ├── model/
│   │
│   ├── models/
│   │   └── User.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── chatbot.py
│   │   ├── news.py
│   │   └── schemes.py
│   │
│   ├── rag/
│   │   ├── loaders/
│   │   ├── pipeline/
│   │   ├── processing/
│   │   └── knowledge_base/
│   │
│   ├── utils/
│   │   ├── database.py
│   │   ├── gemini.py
│   │   ├── jwt.py
│   │   ├── otp_generator.py
│   │   └── soil_reader.py
│   │
│   ├── uploads/
│   ├── static/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── chatbot/
│   │   │   ├── crop/
│   │   │   ├── dashboard/
│   │   │   ├── disease/
│   │   │   ├── fertilizer/
│   │   │   ├── irrigation/
│   │   │   ├── market/
│   │   │   ├── news/
│   │   │   └── weather/
│   │   │
│   │   ├── routes/
│   │   └── App.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
