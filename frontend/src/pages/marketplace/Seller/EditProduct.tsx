import { useEffect, useState } from "react";
import type {
  ChangeEvent,
  FormEvent,
} from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import MainLayout from "../../../components/layout/MainLayout";

import {
  FiArrowLeft,
  FiSave,
  FiUpload,
} from "react-icons/fi";

// ======================================================
// API
// ======================================================

const API_URL = "http://127.0.0.1:5000/api";

// ======================================================
// Categories
// ======================================================

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

// ======================================================
// Component
// ======================================================

export default function EditProduct() {

  const navigate = useNavigate();

  const { id } = useParams();

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  // ======================================================
  // State
  // ======================================================

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [preview, setPreview] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    quantity: "",
    price: "",
  });

  // ======================================================
  // Handle Input Change
  // ======================================================

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

  // ======================================================
  // Handle Image Change
  // ======================================================

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

  };
    // ======================================================
  // Fetch Product Details
  // ======================================================

  const fetchProduct = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/products/${id}`,
        config
      );

      const product = response.data.product;

      setFormData({
        name: product.name || "",
        category: product.category || "",
        description: product.description || "",
        quantity: String(product.quantity || ""),
        price: String(product.price || ""),
      });

      setPreview(product.image || "");

    } catch (err: any) {

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
        "Unable to load product."
      );

    } finally {

      setLoading(false);

    }

  };

  // ======================================================
  // Update Product
  // ======================================================

  const handleSubmit = async (
    e: FormEvent
  ) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.category ||
      !formData.description ||
      !formData.quantity ||
      !formData.price
    ) {

      setError("Please fill in all required fields.");

      return;

    }

    try {

      setSaving(true);

      const productData = new FormData();

      productData.append("name", formData.name);
      productData.append("category", formData.category);
      productData.append("description", formData.description);
      productData.append("quantity", formData.quantity);
      productData.append("price", formData.price);

      if (image) {
        productData.append("image", image);
      }

      await axios.put(
        `${API_URL}/products/${id}`,
        productData,
        config
      );

      setSuccess("Product updated successfully.");

      setTimeout(() => {

        navigate("/marketplace/seller/my-products");

      }, 1500);

    } catch (err: any) {

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
        "Unable to update product."
      );

    } finally {

      setSaving(false);

    }

  };

  // ======================================================
  // Load Product
  // ======================================================

  useEffect(() => {

    if (id) {

      fetchProduct();

    }

  }, [id]);
    // ======================================================
  // Loading UI
  // ======================================================

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center">
          <h2 className="text-2xl font-bold text-green-700">
            Loading Product...
          </h2>
        </div>
      </MainLayout>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl p-6">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-green-700">
              Edit Product
            </h1>

            <p className="mt-2 text-gray-600">
              Update your marketplace product.
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

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-8 shadow-lg"
        >

          {error && (
            <div className="mb-5 rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

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
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
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

              <option value="">
                Select Category
              </option>

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
              className="w-full rounded-lg border p-3"
            />

          </div>

          {/* Quantity & Price */}

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

          </div>

          {/* Image */}

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
                className="mt-5 h-56 w-full rounded-lg object-cover"
              />

            )}

          </div>

          {/* Buttons */}

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >

              {saving ? (

                <>
                  <FiUpload />
                  Updating...
                </>

              ) : (

                <>
                  <FiSave />
                  Update Product
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