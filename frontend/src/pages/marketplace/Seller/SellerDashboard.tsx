import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MainLayout from "../../../components/layout/MainLayout";

import {
  FiPackage,
  FiShoppingCart,
  FiDollarSign,
  FiRefreshCw,
  FiPlus,
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
  product_name: string;
  category: string;
  quantity: number;
  price: number;
  status: string;
  image_url?: string;
}

interface Order {
  _id: string;
  product_name: string;
  buyer_email: string;
  quantity: number;
  total_amount: number;
  status: string;
}

// ======================================================
// Component
// ======================================================

export default function SellerDashboard() {

  const navigate = useNavigate();

  // ======================================================
  // State
  // ======================================================

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ======================================================
  // Seller
  // ======================================================

  const seller = JSON.parse(
    localStorage.getItem("seller") || "{}"
  );

  const token = localStorage.getItem("token");

  // ======================================================
  // Axios Config
  // ======================================================

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // ======================================================
  // Logout
  // ======================================================

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("seller");
    localStorage.removeItem("user");

    navigate("/seller/login");

  };

  // ======================================================
  // Dashboard Data
  // ======================================================

  const fetchDashboard = async () => {

    try {

      setLoading(true);
      setError("");

      if (!token) {
        logout();
        return;
      }

      const [productsRes, ordersRes] = await Promise.all([

        axios.get(
          `${API_URL}/products/seller`,
          config
        ),

        axios.get(
          `${API_URL}/orders/seller-orders`,
          config
        )

      ]);

      setProducts(productsRes.data.products || []);

      setOrders(ordersRes.data.orders || []);

    } catch (err: any) {

      console.error(err);

      if (err.response?.status === 401) {

        logout();

        return;

      }

      setError(
        err.response?.data?.message ||
        "Unable to connect to the server."
      );

    } finally {

      setLoading(false);

    }

  };

  // ======================================================
  // Load
  // ======================================================

  useEffect(() => {

    fetchDashboard();

  }, []);

  // ======================================================
  // Statistics
  // ======================================================

  const totalProducts = products.length;

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum + Number(order.total_amount || 0),
    0
  );

  const processingOrders = orders.filter(
    (order) =>
      order.status === "Processing"
  ).length;

  const recentProducts = products.slice(0, 5);

  const recentOrders = orders.slice(0, 5);
    // ======================================================
  // Loading
  // ======================================================

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <FiRefreshCw className="mx-auto text-5xl text-green-600 animate-spin mb-4" />
            <h2 className="text-xl font-semibold">
              Loading Seller Dashboard...
            </h2>
          </div>
        </div>
      </MainLayout>
    );
  }

  // ======================================================
  // Error
  // ======================================================

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">

            <h2 className="text-2xl font-bold text-red-600 mb-3">
              Dashboard Error
            </h2>

            <p className="text-gray-600 mb-6">
              {error}
            </p>

            <button
              onClick={fetchDashboard}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
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

      <div className="space-y-8">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold text-green-700">
              Seller Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Welcome back {seller.email || "Seller"}
            </p>

          </div>

          <button
            onClick={() => navigate("/marketplace/seller/add-product")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
          >
            <FiPlus />
            Add Product
          </button>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <FiPackage className="text-4xl text-green-600 mb-3" />

            <h3 className="text-gray-500">
              Products
            </h3>

            <p className="text-3xl font-bold">
              {totalProducts}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <FiShoppingCart className="text-4xl text-blue-600 mb-3" />

            <h3 className="text-gray-500">
              Orders
            </h3>

            <p className="text-3xl font-bold">
              {totalOrders}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <FiDollarSign className="text-4xl text-yellow-500 mb-3" />

            <h3 className="text-gray-500">
              Revenue
            </h3>

            <p className="text-3xl font-bold">
              ₹{totalRevenue.toFixed(2)}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <FiRefreshCw className="text-4xl text-purple-600 mb-3" />

            <h3 className="text-gray-500">
              Processing
            </h3>

            <p className="text-3xl font-bold">
              {processingOrders}
            </p>

          </div>

        </div>

        {/* Recent Products */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold mb-5">
            Recent Products
          </h2>

          {recentProducts.length === 0 ? (

            <p className="text-gray-500">
              No products found.
            </p>

          ) : (

            <div className="space-y-4">

              {recentProducts.map((product) => (

                <div
                  key={product._id}
                  className="flex justify-between items-center border rounded-lg p-4"
                >

                  <div>

                    <h3 className="font-semibold">
                      {product.product_name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {product.category}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold">
                      ₹{product.price}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty : {product.quantity}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Recent Orders */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold mb-5">
            Recent Orders
          </h2>

          {recentOrders.length === 0 ? (

            <p className="text-gray-500">
              No orders found.
            </p>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left py-3">
                      Product
                    </th>

                    <th className="text-left py-3">
                      Buyer
                    </th>

                    <th className="text-left py-3">
                      Qty
                    </th>

                    <th className="text-left py-3">
                      Amount
                    </th>

                    <th className="text-left py-3">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentOrders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-b"
                    >

                      <td className="py-3">
                        {order.product_name}
                      </td>

                      <td className="py-3">
                        {order.buyer_email}
                      </td>

                      <td className="py-3">
                        {order.quantity}
                      </td>

                      <td className="py-3">
                        ₹{order.total_amount}
                      </td>

                      <td className="py-3">
                        {order.status}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </MainLayout>
  );
}