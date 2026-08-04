// ==========================================================
// 🌾 AgriGenAI - Add Product
// frontend/src/pages/marketplace/seller/AddProduct.tsx
// Part 1
// ==========================================================

import { useState } from "react";
import type {
  ChangeEvent,
  FormEvent,
} from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import MainLayout from "../../../components/layout/MainLayout";

import {
  FiArrowLeft,
  FiSave,
  FiUpload,
} from "react-icons/fi";

// ==========================================================
// API
// ==========================================================

const API_URL = "http://127.0.0.1:5000/api";

// ==========================================================
// Categories
// ==========================================================

const categories = [
  "Vegetables",
  "Fruits",
  "Grains",
  "Seeds",
  "Fertilizers",
  "Pesticides",
  "Flowers",
  "Spices",
  "Dairy",
  "Other",
];

// ==========================================================
// Units
// ==========================================================

const units = [
  "Kg",
  "Gram",
  "Ton",
  "Liter",
  "Piece",
  "Dozen",
];

// ==========================================================
// Component
// ==========================================================

export default function AddProduct() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ==========================================================
  // States
  // ==========================================================

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({

    product_name: "",

    category: "",

    description: "",

    quantity: "",

    unit: "",

    price: "",

    location: ""

  });

  // ==========================================================
  // Axios Config
  // ==========================================================

  const config = {

    headers: {

      Authorization: `Bearer ${token}`,

      "Content-Type": "multipart/form-data",

    },

  };

  // ==========================================================
  // Input Change
  // ==========================================================

  const handleChange = (

    e: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >

  ) => {

    setFormData((prev) => ({

      ...prev,

      [e.target.name]: e.target.value,

    }));

  };

  // ==========================================================
  // Image Change
  // ==========================================================

  const handleImageChange = (

    e: ChangeEvent<HTMLInputElement>

  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

  };

  // ==========================================================
  // Submit Product
  // ==========================================================

  const handleSubmit = async (

    e: FormEvent

  ) => {

    e.preventDefault();

    setError("");

    setSuccess("");

    // ======================================================
    // Validation
    // ======================================================

    if (

      !formData.product_name ||

      !formData.category ||

      !formData.description ||

      !formData.quantity ||

      !formData.unit ||

      !formData.price ||

      !formData.location

    ) {

      setError("Please fill in all required fields.");

      return;

    }

    if (!image) {

      setError("Please upload a product image.");

      return;

    }

    try {

      setLoading(true);

      const productData = new FormData();

      productData.append(
        "product_name",
        formData.product_name
      );

      productData.append(
        "category",
        formData.category
      );

      productData.append(
        "description",
        formData.description
      );

      productData.append(
        "quantity",
        formData.quantity
      );

      productData.append(
        "unit",
        formData.unit
      );

      productData.append(
        "price",
        formData.price
      );

      productData.append(
        "location",
        formData.location
      );

      productData.append(
        "image",
        image
      );

      const response = await axios.post(

        `${API_URL}/products`,

        productData,

        config

      );

      console.log(response.data);

      setSuccess("Product added successfully.");

      setFormData({

        product_name: "",

        category: "",

        description: "",

        quantity: "",

        unit: "",

        price: "",

        location: ""

      });

      setImage(null);

      setPreview("");

      setTimeout(() => {

        navigate("/marketplace/seller/my-products");

      }, 1500);

    }

    catch (err: any) {

      console.error(err);

      if (err.response?.status === 401) {

        localStorage.removeItem("token");

        localStorage.removeItem("seller");

        localStorage.removeItem("user");

        setError("Session expired. Please login again.");

        return;

      }

      setError(

        err.response?.data?.message ||

        "Unable to add product."

      );

    }

    finally {

      setLoading(false);

    }

  };
    // ==========================================================
  // UI
  // ==========================================================

  return (

    <MainLayout>

      <div className="mx-auto max-w-5xl p-6">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-green-700">
              Add New Product
            </h1>

            <p className="mt-2 text-gray-600">
              Sell your agricultural products in the marketplace.
            </p>

          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
          >
            <FiArrowLeft />
            Back
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-8 shadow-lg"
        >

          {/* Error */}

          {error && (

            <div className="mb-5 rounded-lg bg-red-100 p-4 text-red-700">

              {error}

            </div>

          )}

          {/* Success */}

          {success && (

            <div className="mb-5 rounded-lg bg-green-100 p-4 text-green-700">

              {success}

            </div>

          )}

          {/* Product Name */}

          <div className="mb-5">

            <label className="mb-2 block font-semibold">

              Product Name

            </label>

            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className="w-full rounded-lg border p-3 focus:border-green-600 focus:outline-none"
            />

          </div>

          {/* Category */}

          <div className="mb-5">

            <label className="mb-2 block font-semibold">

              Category

            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >

              <option value="">Select Category</option>

              {categories.map((category) => (

                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>

              ))}

            </select>

          </div>

          {/* Description */}

          <div className="mb-5">

            <label className="mb-2 block font-semibold">

              Description

            </label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product"
              className="w-full rounded-lg border p-3"
            />

          </div>

          {/* Quantity | Unit */}

          <div className="mb-5 grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-semibold">

                Quantity

              </label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold">

                Unit

              </label>

              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              >

                <option value="">Select Unit</option>

                {units.map((unit) => (

                  <option
                    key={unit}
                    value={unit}
                  >
                    {unit}
                  </option>

                ))}

              </select>

            </div>

          </div>

          {/* Price | Location */}

          <div className="mb-5 grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-semibold">

                Price (₹)

              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold">

                Location

              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Village / City"
                className="w-full rounded-lg border p-3"
              />

            </div>

          </div>

          {/* Product Image */}

          <div className="mb-8">

            <label className="mb-2 block font-semibold">

              Product Image

            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {preview && (

              <img
                src={preview}
                alt="Preview"
                className="mt-5 h-60 w-full rounded-lg object-cover"
              />

            )}

          </div>

          {/* Buttons */}

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:bg-gray-400"
            >

              {loading ? (

                <>

                  <FiUpload />

                  Uploading...

                </>

              ) : (

                <>

                  <FiSave />

                  Save Product

                </>

              )}

            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/marketplace/seller/my-products")
              }
              className="rounded-lg bg-gray-600 px-6 py-3 text-white hover:bg-gray-700"
            >

              Cancel

            </button>

          </div>

        </form>

      </div>

    </MainLayout>

  );

}