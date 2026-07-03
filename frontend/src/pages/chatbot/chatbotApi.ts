const API_URL = "http://127.0.0.1:5000/api";

// ==========================================
// Farmer AI Chat API
// ==========================================

export async function sendMessage(message: string) {

  const response = await fetch(

    `${API_URL}/chat`,

    {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        message,

      }),

    }

  );

  if (!response.ok) {

    throw new Error("Unable to contact AI Assistant.");

  }

  return await response.json();

}