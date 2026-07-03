import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

import MarketForm from "./MarketForm";
import MarketResult from "./MarketResult";

import { predictMarket } from "./marketApi";

// ======================================================
// Market Prediction
// ======================================================

function MarketPrediction() {

  // ======================================================
  // Form State
  // ======================================================

  const [formData, setFormData] = useState({

    crop: "",

    state: "",

    district: "",

    quantity: "",

    sellingTime: ""

  });

  // ======================================================
  // Result
  // ======================================================

  const [result, setResult] = useState<any>(null);

  // ======================================================
  // Loading
  // ======================================================

  const [loading, setLoading] = useState(false);

  // ======================================================
  // States
  // ======================================================

  const states = [

    "Karnataka",

    "Maharashtra",

    "Tamil Nadu",

    "Kerala",

    "Telangana"

  ];

  // ======================================================
  // District Mapping
  // ======================================================

  const districtData: Record<string, string[]> = {

    Karnataka: [

      "Bidar",

      "Kalaburagi",

      "Belagavi",

      "Bengaluru",

      "Mysuru"

    ],

    Maharashtra: [

      "Pune",

      "Nagpur",

      "Mumbai",

      "Nashik"

    ],

    "Tamil Nadu": [

      "Chennai",

      "Madurai",

      "Coimbatore",

      "Salem"

    ],

    Kerala: [

      "Kochi",

      "Thrissur",

      "Kannur",

      "Kollam"

    ],

    Telangana: [

      "Hyderabad",

      "Warangal",

      "Karimnagar",

      "Nizamabad"

    ]

  };

  const districts = districtData[formData.state] || [];
    // ======================================================
  // Handle Input Change
  // ======================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    const { name, value } = e.target;

    if (name === "state") {

      setFormData({

        ...formData,

        state: value,

        district: ""

      });

      return;

    }

    setFormData({

      ...formData,

      [name]: value

    });

  };

  // ======================================================
  // Predict Market
  // ======================================================

  const analyzeMarket = async () => {

    if (

      !formData.crop ||

      !formData.state ||

      !formData.district ||

      !formData.quantity ||

      !formData.sellingTime

    ) {

      alert("Please fill all fields.");

      return;

    }

    setLoading(true);

    try {

      const response = await predictMarket({

        crop: formData.crop,

        state: formData.state,

        district: formData.district,

        quantity: Number(formData.quantity),

        sellingTime: formData.sellingTime

      });

      setResult(response);

    }

    catch (error) {

      console.error(error);

      alert("Market prediction failed.");

    }

    finally {

      setLoading(false);

    }

  };
    // ======================================================
  // UI
  // ======================================================

  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl shadow-xl p-8 text-white mb-8">

          <h1 className="text-4xl font-bold">

            📈 AI Smart Market Intelligence

          </h1>

          <p className="mt-3 text-lg">

            Predict crop prices using AI and decide the best selling time.

          </p>

        </div>

        {/* Market Form */}

        <MarketForm

          formData={formData}

          states={states}

          districts={districts}

          handleChange={handleChange}

          analyzeMarket={analyzeMarket}

          loading={loading}

        />

        {/* Result */}

        {

          result && (

            <div className="mt-10">

              <MarketResult

                result={result}

              />

            </div>

          )

        }

      </div>

    </MainLayout>

  );

}

export default MarketPrediction;