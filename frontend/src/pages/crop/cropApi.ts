const API_URL = "http://127.0.0.1:5000/api";

/* =====================================
   Predict Crop
===================================== */

export async function predictCrop(data: {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  temperature: string;
  humidity: string;
  ph: string;
  rainfall: string;
}) {

  const response = await fetch(

    `${API_URL}/crop`,

    {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify(data),

    }

  );

  if (!response.ok) {

    throw new Error("Crop prediction failed.");

  }

  return await response.json();

}

/* =====================================
   Upload Soil Health Card
===================================== */

export async function uploadSoilCard(file: File) {

  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(

    `${API_URL}/soil-card`,

    {

      method: "POST",

      body: formData,

    }

  );

  if (!response.ok) {

    throw new Error("Soil card upload failed.");

  }

  return await response.json();

}