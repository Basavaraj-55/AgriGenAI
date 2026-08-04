import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [disease, setDisease] = useState("");
  const [confidence, setConfidence] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));

    setDisease("");
    setConfidence("");
    setRecommendation("");
  };

  const detectDisease = async () => {
    if (!selectedFile) {
      alert("Please select a leaf image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(
        "http://127.0.0.1:5000/api/disease-detection",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();

        alert(error.message || "Prediction Failed");

        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.success) {
        setDisease(data.disease);
        setConfidence(data.confidence + "%");
        setRecommendation(data.recommendation);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);

      alert("Unable to connect to Flask Backend.");
    }

    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-3 text-3xl font-bold text-green-700">
          🍃 Disease Detection
        </h1>

        <p className="mb-8 text-gray-600">
          Upload a potato leaf image and detect diseases using Artificial Intelligence.
        </p>

        <div className="rounded-xl border-2 border-dashed border-green-400 p-8 text-center">

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
                className="mx-auto h-72 w-72 rounded-xl object-cover shadow-lg"
              />

            </div>
          )}

          <button
            onClick={detectDisease}
            disabled={loading}
            className="mt-8 rounded-lg bg-green-600 px-8 py-3 text-white transition hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Predicting..." : "Detect Disease"}
          </button>

        </div>

        {disease && (
          <div className="mt-8 rounded-xl bg-green-100 p-6">

            <h2 className="text-2xl font-bold text-green-700">
              Prediction Result
            </h2>

            <div className="mt-5 space-y-3">

              <p className="text-lg">
                <strong>Disease:</strong> {disease}
              </p>

              <p className="text-lg">
                <strong>Confidence:</strong> {confidence}
              </p>

              <div>

                <h3 className="font-semibold text-green-700">
                  Recommendation
                </h3>

                <p className="mt-2 text-gray-700">
                  {recommendation}
                </p>

              </div>

            </div>

          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default DiseaseDetection;