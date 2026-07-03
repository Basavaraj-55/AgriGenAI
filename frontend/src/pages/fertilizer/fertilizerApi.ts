const API_URL = "http://127.0.0.1:5000/api";

/* ==========================================================
   🌱 AI Fertilizer Recommendation API
========================================================== */

export interface FertilizerRequest {
  crop: string;
  symptom: string;
  stage: string;
  severity: string;
  irrigation: string;
}

export interface FertilizerResponse {
  success: boolean;
  recommended_fertilizer: string;
  application: string;
  recommendation: string;
  message?: string;
}

export async function predictFertilizer(
  data: FertilizerRequest
): Promise<FertilizerResponse> {

  try {

    const response = await fetch(`${API_URL}/fertilizer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    console.log("🌱 Fertilizer API Response:", json);

    if (!response.ok || !json.success) {
      throw new Error(
        json.message || "Unable to generate fertilizer recommendation."
      );
    }

    return json;

  } catch (error: any) {

    console.error("❌ Fertilizer API Error:", error);

    throw new Error(
      error.message || "Fertilizer prediction failed."
    );

  }

}