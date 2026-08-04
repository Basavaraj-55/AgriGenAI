import { useState } from "react";

import MainLayout from "../../components/layout/MainLayout";

import HeroSection from "./HeroSection";
import CropForm from "./CropForm";
import SoilUpload from "./SoilUpload";
import CropResult from "./CropResult";

export default function CropRecommendation() {
  const [inputMethod, setInputMethod] = useState<"manual" | "upload">(
    "manual"
  );

  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [recommendedCrop, setRecommendedCrop] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
      setTimeout(() => {
        setRecommendedCrop("Rice");
        setConfidence("98%");
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <main className="w-full px-6 py-6 lg:px-8">

        <div className="space-y-8">

          {/* Hero Section */}
          <HeroSection />

          {/* Main Card */}
          <section className="rounded-3xl bg-white p-8 shadow-lg">

            <div className="mb-8">

              <h1 className="text-4xl font-bold text-green-700">
                🌾 AI Crop Recommendation
              </h1>

              <p className="mt-2 text-gray-600">
                Choose how you would like to provide your soil information.
              </p>

            </div>

            {/* Input Method */}
            <div className="mb-8 rounded-2xl bg-green-50 p-6">

              <h2 className="mb-4 text-xl font-semibold">
                Input Method
              </h2>

              <div className="flex flex-col gap-4 md:flex-row">

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={inputMethod === "manual"}
                    onChange={() => setInputMethod("manual")}
                  />
                  Manual Input
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

            {inputMethod === "manual" ? (
              <CropForm
                formData={formData}
                handleChange={handleChange}
                predictCrop={predictCrop}
                loading={loading}
              />
            ) : (
              <SoilUpload
                onSoilData={handleSoilData}
              />
            )}

            {recommendedCrop && (
              <div className="mt-8">
                <CropResult
                  crop={recommendedCrop}
                  confidence={confidence}
                />
              </div>
            )}

          </section>

        </div>

      </main>
    </MainLayout>
  );
}