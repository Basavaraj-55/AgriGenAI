import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [disease, setDisease] = useState("");
  const [confidence, setConfidence] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));

    setDisease("");
    setConfidence("");
    setRecommendation("");
  };

  const detectDisease = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/disease", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setDisease(data.disease);
      setConfidence(data.confidence + "%");
      setRecommendation(data.recommendation);
    } catch (error) {
      alert("Prediction Failed!");
    }

    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-green-700 mb-3">
          🍃 Disease Detection
        </h1>

        <p className="text-gray-600 mb-8">
          Upload a potato leaf image to detect diseases using AI.
        </p>

        <div className="border-2 border-dashed border-green-400 rounded-xl p-8 text-center">

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          {preview && (
            <div className="mt-6">
              <img
                src={preview}
                alt="Leaf Preview"
                className="mx-auto rounded-lg shadow-lg"
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <button
            onClick={detectDisease}
            className="mt-8 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
          >
            Detect Disease
          </button>

        </div>

        {loading && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-blue-600">
              Predicting...
            </h2>
          </div>
        )}

        {disease && (
          <div className="mt-8 bg-green-100 rounded-xl p-6">

            <h2 className="text-2xl font-bold text-green-700">
              Prediction Result
            </h2>

            <p className="mt-4 text-xl">
              <b>Disease:</b> {disease}
            </p>

            <p className="mt-2 text-xl">
              <b>Confidence:</b> {confidence}
            </p>

            <p className="mt-2 text-xl">
              <b>Recommendation:</b>
            </p>

            <p className="text-lg mt-2">
              {recommendation}
            </p>

          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default DiseaseDetection;