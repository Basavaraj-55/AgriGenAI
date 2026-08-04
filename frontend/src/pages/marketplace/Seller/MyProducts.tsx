import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "../../../components/layout/MainLayout";

import {
  FiPackage,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiRefreshCw,
} from "react-icons/fi";
// ======================================================
// API
// ======================================================

const API_URL = "http://127.0.0.1:5000/api";

// ======================================================
// Interfaces
// ======================================================

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  quantity: number;
  price: number;
  image?: string;
  created_at?: string;
}

// ======================================================
// Component
// ======================================================

export default function MyProducts() {

  // ======================================================
  // State
  // ======================================================

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // Authentication
  // ======================================================

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
    // ======================================================
  // Fetch Products
  // ======================================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        setError("Please login again.");
        return;
      }

      const response = await axios.get(
        `${API_URL}/products/seller`,
        config
      );

      setProducts(response.data.products || []);

    } catch (err: any) {
      console.error(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("seller");
        localStorage.removeItem("user");

        setError("Session expired. Please login again.");
      } else {
        setError(
          err.response?.data?.message ||
          "Unable to load products."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // Delete Product
  // ======================================================

  const deleteProduct = async (productId: string) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `${API_URL}/products/${productId}`,
        config
      );

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product._id !== productId
        )
      );

      alert("Product deleted successfully.");

    } catch (err: any) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        "Failed to delete product."
      );

    }

  };

  // ======================================================
  // Load Products
  // ======================================================

  useEffect(() => {
    fetchProducts();
  }, []);

  // ======================================================
  // Refresh Products Every 30 Seconds
  // ======================================================

  useEffect(() => {

    const interval = setInterval(() => {
      fetchProducts();
    }, 30000);

    return () => clearInterval(interval);

  }, []);
    // ======================================================
  // Loading UI
  // ======================================================

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center">
          <h2 className="text-2xl font-bold text-green-700">
            Loading Products...
          </h2>
        </div>
      </MainLayout>
    );
  }

  // ======================================================
  // Error UI
  // ======================================================

  if (error) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="rounded-xl bg-white p-8 shadow-lg text-center">

            <h2 className="text-2xl font-bold text-red-600">
              {error}
            </h2>

            <button
              onClick={fetchProducts}
              className="mt-6 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
            >
              Retry
            </button>

          </div>
        </div>
      </MainLayout>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <MainLayout>

      <div className="p-6">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-green-700">
              My Products
            </h1>

            <p className="text-gray-600">
              Manage all your marketplace products.
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={fetchProducts}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <FiRefreshCw />
              Refresh
            </button>

            <button
              onClick={() => window.location.href = "/marketplace/seller/add-product"}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              <FiPlus />
              Add Product
            </button>

          </div>

        </div>

        {/* Empty State */}

        {products.length === 0 ? (

          <div className="rounded-xl bg-white p-12 text-center shadow">

            <FiPackage
              className="mx-auto text-gray-400"
              size={60}
            />

            <h2 className="mt-4 text-2xl font-semibold">
              No Products Found
            </h2>

            <p className="mt-2 text-gray-500">
              Add your first product to start selling.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {products.map((product) => (

              <div
                key={product._id}
                className="rounded-xl bg-white p-5 shadow"
              >

                {product.image && (

                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-4 h-48 w-full rounded-lg object-cover"
                  />

                )}

                <h2 className="text-xl font-bold">
                  {product.name}
                </h2>

                <p className="mt-2 text-gray-500">
                  {product.category}
                </p>

                <p className="mt-2">
                  ₹{product.price}
                </p>

                <p className="mt-1">
                  Qty : {product.quantity}
                </p>

                <div className="mt-5 flex gap-3">

                  <button
                    onClick={() =>
                      window.location.href =
                      `/marketplace/seller/edit-product/${product._id}`
                    }
                    className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                  >
                    <FiEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    <FiTrash2 />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </MainLayout>
  );
}