import { useEffect, useState } from "react";
import axios from "axios";

import MainLayout from "../../../components/layout/MainLayout";

import {
  FiShoppingCart,
  FiRefreshCw,
  FiPackage,
  FiDollarSign,
} from "react-icons/fi";

// ======================================================
// API
// ======================================================

const API_URL = "http://127.0.0.1:5000/api";

// ======================================================
// Interfaces
// ======================================================

interface Order {
  _id: string;
  product_name: string;
  buyer_name: string;
  buyer_email: string;
  quantity: number;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
}

// ======================================================
// Component
// ======================================================

export default function SellerOrders() {

  // ======================================================
  // State
  // ======================================================

  const [orders, setOrders] = useState<Order[]>([]);
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
  // Dashboard Statistics
  // ======================================================

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total_amount || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;
    // ======================================================
  // Fetch Seller Orders
  // ======================================================

  const fetchOrders = async () => {
    try {

      setLoading(true);
      setError("");

      if (!token) {
        setError("Please login again.");
        return;
      }

      const response = await axios.get(
        `${API_URL}/orders/seller-orders`,
        config
      );

      setOrders(response.data.orders || []);

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
        "Unable to load seller orders."
      );

    } finally {

      setLoading(false);

    }
  };

  // ======================================================
  // Update Order Status
  // ======================================================

  const updateOrderStatus = async (
    orderId: string,
    status: string
  ) => {

    try {

      await axios.put(
        `${API_URL}/orders/${orderId}/status`,
        { status },
        config
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status }
            : order
        )
      );

    } catch (err: any) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        "Failed to update order status."
      );

    }

  };

  // ======================================================
  // Load Orders
  // ======================================================

  useEffect(() => {
    fetchOrders();
  }, []);

  // ======================================================
  // Auto Refresh Every 30 Seconds
  // ======================================================

  useEffect(() => {

    const interval = setInterval(() => {
      fetchOrders();
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
            Loading Orders...
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
              onClick={fetchOrders}
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
              Seller Orders
            </h1>

            <p className="text-gray-600">
              Manage customer orders and deliveries.
            </p>

          </div>

          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <FiRefreshCw />
            Refresh
          </button>

        </div>

        {/* Statistics */}

        <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-xl bg-white p-6 shadow">
            <FiShoppingCart size={28} className="text-blue-600" />
            <h2 className="mt-3 font-semibold">Total Orders</h2>
            <p className="mt-2 text-3xl font-bold">{totalOrders}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <FiDollarSign size={28} className="text-green-600" />
            <h2 className="mt-3 font-semibold">Revenue</h2>
            <p className="mt-2 text-3xl font-bold">
              ₹{totalRevenue}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <FiPackage size={28} className="text-yellow-600" />
            <h2 className="mt-3 font-semibold">Pending</h2>
            <p className="mt-2 text-3xl font-bold">
              {pendingOrders}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <FiPackage size={28} className="text-green-600" />
            <h2 className="mt-3 font-semibold">Delivered</h2>
            <p className="mt-2 text-3xl font-bold">
              {completedOrders}
            </p>
          </div>

        </div>

        {/* Orders Table */}

        {orders.length === 0 ? (

          <div className="rounded-xl bg-white p-10 text-center shadow">
            <FiShoppingCart
              size={60}
              className="mx-auto text-gray-400"
            />
            <h2 className="mt-4 text-2xl font-semibold">
              No Orders Available
            </h2>
            <p className="mt-2 text-gray-500">
              Orders will appear here once customers place them.
            </p>
          </div>

        ) : (

          <div className="overflow-x-auto rounded-xl bg-white shadow">

            <table className="min-w-full">

              <thead className="bg-green-600 text-white">

                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Buyer</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Payment</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-4 py-3">
                      {order.product_name}
                    </td>

                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">
                          {order.buyer_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.buyer_email}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      {order.quantity}
                    </td>

                    <td className="px-4 py-3">
                      ₹{order.total_amount}
                    </td>

                    <td className="px-4 py-3">
                      {order.payment_status}
                    </td>

                    <td className="px-4 py-3">

                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border p-2"
                      >
                        <option value="Pending">
                          Pending
                        </option>
                        <option value="Processing">
                          Processing
                        </option>
                        <option value="Shipped">
                          Shipped
                        </option>
                        <option value="Delivered">
                          Delivered
                        </option>
                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </MainLayout>
  );
}