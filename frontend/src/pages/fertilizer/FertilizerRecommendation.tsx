import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

import FertilizerForm from "./FertilizerForm";
import FertilizerResult from "./FertilizerResult";
import { predictFertilizer } from "./fertilizerApi";

function FertilizerRecommendation() {
  const [formData, setFormData] = useState({
    crop: "",
    symptom: "",
    stage: "",
    severity: "",
    irrigation: "",
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePredict = async () => {
    const { crop, symptom, stage, severity, irrigation } = formData;

    if (!crop || !symptom || !stage || !severity || !irrigation) {
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
    } catch (error) {
      console.error(error);
      alert("Unable to generate fertilizer recommendation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="w-full px-6 py-6">

        {/* Header */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 p-8 text-white shadow-xl">
          <h1 className="mb-3 text-4xl font-bold">
            🌱 AI Fertilizer Recommendation
          </h1>

          <p className="text-lg text-green-50">
            Select your crop and crop condition. AI will analyze the symptoms
            and recommend the most suitable fertilizer.
          </p>
        </div>

        {/* Form */}
        <FertilizerForm
          formData={formData}
          handleChange={handleChange}
          predictFertilizer={handlePredict}
          loading={loading}
        />

        {/* Result */}
        {result && (
          <div className="mt-8">
            <FertilizerResult result={result} />
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default FertilizerRecommendation;