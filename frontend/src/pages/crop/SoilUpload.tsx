import { useState } from "react";

interface SoilUploadProps {

  onSoilData: (data: any) => void;

}

function SoilUpload({

  onSoilData,

}: SoilUploadProps) {

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [dragging, setDragging] = useState(false);

  // -----------------------------
  // File Selection
  // -----------------------------

  const handleFileChange = (

    e: React.ChangeEvent<HTMLInputElement>

  ) => {

    if (e.target.files && e.target.files.length > 0) {

      setFile(e.target.files[0]);

    }

  };

  // -----------------------------
  // Drag & Drop
  // -----------------------------

  const handleDragOver = (

    e: React.DragEvent<HTMLDivElement>

  ) => {

    e.preventDefault();

    setDragging(true);

  };

  const handleDragLeave = () => {

    setDragging(false);

  };

  const handleDrop = (

    e: React.DragEvent<HTMLDivElement>

  ) => {

    e.preventDefault();

    setDragging(false);

    if (e.dataTransfer.files.length > 0) {

      setFile(e.dataTransfer.files[0]);

    }

  };
    // -----------------------------
  // Upload & Analyze
  // -----------------------------

  const analyzeSoilCard = async () => {

    if (!file) {

      alert("Please choose a Soil Health Card.");

      return;

    }

    setLoading(true);

    // Temporary Demo
    // Later we'll connect Flask OCR API

    setTimeout(() => {

      onSoilData({

        nitrogen: "82",

        phosphorus: "45",

        potassium: "70",

        temperature: "29",

        humidity: "68",

        ph: "6.8",

        rainfall: "110",

      });

      setLoading(false);

    }, 2500);

  };

  // -----------------------------
  // UI
  // -----------------------------

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-3xl font-bold text-green-700 mb-2">

        📄 AI Soil Health Card Analyzer

      </h2>

      <p className="text-gray-500 mb-8">

        Upload your Soil Health Card (PDF or Image). AI will
        automatically extract soil values.

      </p>

      <div

        onDragOver={handleDragOver}

        onDragLeave={handleDragLeave}

        onDrop={handleDrop}

        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300

        ${dragging

          ? "border-green-600 bg-green-100"

          : "border-gray-300 bg-gray-50"

        }`}

      >

        <div className="text-6xl mb-4">

          📄

        </div>

        <h3 className="text-2xl font-bold mb-3">

          Drag & Drop Soil Health Card

        </h3>

        <p className="text-gray-600 mb-6">

          or

        </p>

        <input

          type="file"

          accept=".pdf,.png,.jpg,.jpeg"

          onChange={handleFileChange}

          className="mb-6"

        />

        <p className="text-gray-500">

          Supported Formats

        </p>

        <div className="flex justify-center gap-3 mt-3">

          <span className="bg-red-100 px-3 py-1 rounded-lg">

            PDF

          </span>

          <span className="bg-blue-100 px-3 py-1 rounded-lg">

            JPG

          </span>

          <span className="bg-green-100 px-3 py-1 rounded-lg">

            PNG

          </span>

        </div>

      </div>

      {file && (

        <div className="mt-8 bg-green-50 rounded-xl p-5">

          <h3 className="font-bold text-green-700 mb-2">

            Selected File

          </h3>

          <p>

            📄 {file.name}

          </p>

          <p className="text-sm text-gray-600">

            {(file.size / 1024).toFixed(2)} KB

          </p>

        </div>

      )}

      <button

        onClick={analyzeSoilCard}

        disabled={loading}

        className="mt-8 w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-emerald-600 transition-all duration-300 disabled:opacity-60"

      >

        {loading

          ? "🤖 AI Reading Soil Health Card..."

          : "📄 Upload & Analyze"}

      </button>

    </div>

  );

}

export default SoilUpload;