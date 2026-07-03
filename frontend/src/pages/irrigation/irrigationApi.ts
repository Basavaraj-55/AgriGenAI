const API_URL = "http://127.0.0.1:5000/api";

/* ==========================================================
   🌦 Get Weather
========================================================== */

export async function getWeather(district: string) {

  try {

    const response = await fetch(`${API_URL}/weather`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: district,
      }),
    });

    const json = await response.json();

    console.log("Weather API Response:", json);

    if (!response.ok || !json.success) {
      throw new Error(
        json.message || "Unable to fetch weather information."
      );
    }

    return json.data;

  } catch (error: any) {

    console.error("Weather API Error:", error);

    throw new Error(
      error.message || "Unable to fetch weather."
    );

  }

}

/* ==========================================================
   💧 Smart Irrigation Prediction
========================================================== */

export async function predictIrrigation(data: {
  crop: string;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
}) {

  try {

    const response = await fetch(`${API_URL}/irrigation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    console.log("Irrigation API Response:", json);

    if (!response.ok || !json.success) {
      throw new Error(
        json.message || "Unable to generate irrigation recommendation."
      );
    }

    return json;

  } catch (error: any) {

    console.error("Irrigation API Error:", error);

    throw new Error(
      error.message || "Prediction Failed."
    );

  }

}