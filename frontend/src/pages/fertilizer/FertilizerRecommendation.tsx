import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

import FertilizerForm from "./FertilizerForm";
import FertilizerResult from "./FertilizerResult";
import { predictFertilizer } from "./fertilizerApi";

function FertilizerRecommendation() {

  // ----------------------------------
  // Form Data
  // ----------------------------------

  const [formData, setFormData] = useState({

    crop: "",

    symptom: "",

    stage: "",

    severity: "",

    irrigation: "",

  });

  // ----------------------------------
  // Result
  // ----------------------------------

  const [result, setResult] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  // ----------------------------------
  // Handle Input
  // ----------------------------------

  const handleChange = (

    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement
    >

  ) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  // ----------------------------------
  // Predict Fertilizer
  // ----------------------------------

  const handlePredict = async () => {

    const {

      crop,

      symptom,

      stage,

      severity,

      irrigation,

    } = formData;

    if (

      !crop ||

      !symptom ||

      !stage ||

      !severity ||

      !irrigation

    ) {

      alert("Please fill all required fields.");

      return;

    }

    setLoading(true);

    try {

      const response = await predictFertilizer({

        crop,

        symptom,

        stage,

        severity,

        irrigation,

      });

      setResult(response);

    }

    catch (error) {

      console.error(error);

      alert("Unable to generate fertilizer recommendation.");

    }

    finally {

      setLoading(false);

    }

  };
    // ----------------------------------
  // UI
  // ----------------------------------

  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-2xl shadow-lg p-8 mb-8">

          <h1 className="text-4xl font-bold mb-3">

            🌱 AI Fertilizer Recommendation

          </h1>

          <p className="text-lg">

            Select your crop and crop condition. AI will analyze the symptoms
            and recommend the most suitable fertilizer.

          </p>

        </div>

        {/* Fertilizer Form */}

        <FertilizerForm

          formData={formData}

          handleChange={handleChange}

          predictFertilizer={handlePredict}

          loading={loading}

        />

        {/* Result */}

        {result && (

          <div className="mt-8">

            <FertilizerResult

              result={result}

            />

          </div>

        )}

      </div>

    </MainLayout>

  );

}

export default FertilizerRecommendation;