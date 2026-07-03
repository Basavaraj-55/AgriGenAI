const API_URL = "http://127.0.0.1:5000/api";

/* ==========================================================
   📈 Market Prediction API
========================================================== */

export interface MarketRequest {
  crop: string;
  state: string;
  district: string;
  quantity: number;
  sellingTime: string;
}

export interface MarketResponse {
  success: boolean;

  crop: string;

  todayPrice: number;
  predictedPrice: number;
  tomorrowPrice: number;
  nextWeekPrice: number;
  nextMonthPrice: number;

  trend: string;
  recommendation: string;

  extraProfit: number;
  totalProfit: number;

  confidence: string;

  reason: string[];

  message?: string;
}

export async function predictMarket(
  data: MarketRequest
): Promise<MarketResponse> {

  try {

    const response = await fetch(`${API_URL}/market`, {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify(data),

    });

    const json = await response.json();

    console.log("📈 Market API Response:", json);

    if (!response.ok || !json.success) {

      throw new Error(

        json.message || "Market prediction failed."

      );

    }

    return json;

  }

  catch (error: any) {

    console.error("Market API Error:", error);

    throw new Error(

      error.message || "Unable to predict market price."

    );

  }

}