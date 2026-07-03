import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

import CropForm from "./CropForm";
import SoilUpload from "./SoilUpload";
import CropResult from "./CropResult";

function CropRecommendation() {

  // ----------------------------------
  // Input Method
  // ----------------------------------

  const [inputMethod, setInputMethod] = useState<
    "manual" | "upload"
  >("manual");

  // ----------------------------------
  // Form Data
  // ----------------------------------

  const [formData, setFormData] = useState({

    nitrogen: "",

    phosphorus: "",

    potassium: "",

    temperature: "",

    humidity: "",

    ph: "",

    rainfall: ""

  });

  // ----------------------------------
  // Result
  // ----------------------------------

  const [recommendedCrop, setRecommendedCrop] =
    useState("");

  const [confidence, setConfidence] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ----------------------------------
  // Soil Card Callback
  // ----------------------------------

  const handleSoilData = (data: any) => {

    setFormData({

      nitrogen: data.nitrogen,

      phosphorus: data.phosphorus,

      potassium: data.potassium,

      temperature: data.temperature,

      humidity: data.humidity,

      ph: data.ph,

      rainfall: data.rainfall,

    });

    setInputMethod("manual");

  };

  // ----------------------------------
  // Input Change
  // ----------------------------------

  const handleChange = (

    e: React.ChangeEvent<HTMLInputElement>

  ) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };
    // ----------------------------------
  // Predict Crop
  // ----------------------------------

  const predictCrop = async () => {

    const {

      nitrogen,

      phosphorus,

      potassium,

      temperature,

      humidity,

      ph,

      rainfall,

    } = formData;

    if (

      !nitrogen ||

      !phosphorus ||

      !potassium ||

      !temperature ||

      !humidity ||

      !ph ||

      !rainfall

    ) {

      alert("Please fill all fields.");

      return;

    }

    setLoading(true);

    try {

      // We will connect this
      // to cropApi.ts in the next step

      setTimeout(() => {

        setRecommendedCrop("Rice");

        setConfidence("98%");

        setLoading(false);

      }, 1500);

    }

    catch (error) {

      console.error(error);

      alert("Prediction failed.");

      setLoading(false);

    }

  };

  // ----------------------------------
  // UI
  // ----------------------------------

  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-green-700 mb-3">

          🌾 AI Crop Recommendation

        </h1>

        <p className="text-gray-600 mb-8">

          Choose how you would like to provide your soil information.

        </p>

        {/* Input Method */}

        <div className="bg-green-50 rounded-xl p-6 mb-8">

          <h2 className="text-xl font-semibold mb-4">

            Input Method

          </h2>

          <div className="flex flex-col md:flex-row gap-6">

            <label className="flex items-center gap-3">

              <input

                type="radio"

                checked={inputMethod === "manual"}

                onChange={() => setInputMethod("manual")}

              />

              Enter Soil Values Manually

            </label>

            <label className="flex items-center gap-3">

              <input

                type="radio"

                checked={inputMethod === "upload"}

                onChange={() => setInputMethod("upload")}

              />

              Upload Soil Health Card

            </label>

          </div>

        </div>

        {/* Manual Form */}

        {inputMethod === "manual" && (

          <CropForm

            formData={formData}

            handleChange={handleChange}

            predictCrop={predictCrop}

            loading={loading}

          />

        )}

        {/* Upload */}

        {inputMethod === "upload" && (

          <SoilUpload

            onSoilData={handleSoilData}

          />

        )}

        {/* Result */}

        {recommendedCrop && (

          <CropResult

            crop={recommendedCrop}

            confidence={confidence}

          />

        )}

      </div>

    </MainLayout>

  );

}

export default CropRecommendation;