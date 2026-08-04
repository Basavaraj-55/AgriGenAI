// ======================================================
// 🌾 AgriGenAI Admin Dashboard
// File:
// frontend/src/pages/marketplace/Admin/AdminDashboard.tsx
// ======================================================

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../../../components/layout/MainLayout";

import { getDashboard } from "../../../services/adminApi";

import {

  FaUsers,

  FaStore,

  FaBoxOpen,

  FaShoppingCart,

  FaRupeeSign,

} from "react-icons/fa";

import {

  FiActivity,

  FiAlertCircle,

  FiRefreshCw,

  FiTrendingUp,

  FiDatabase,

  FiServer,

} from "react-icons/fi";

// ======================================================
// Dashboard Statistics
// ======================================================

interface DashboardStats {

  users: number;

  sellers: number;

  products: number;

  orders: number;

  revenue: number;

}

// ======================================================
// Recent Order
// ======================================================

interface RecentOrder {

  _id: string;

  customer_name?: string;

  total_amount?: number;

  payment_status?: string;

  status?: string;

  created_at?: string;

}

// ======================================================
// Backend Dashboard Response
// ======================================================

interface DashboardApiResponse {

  success: boolean;

  message: string;

  data: {

    statistics: DashboardStats;

    recent_orders: RecentOrder[];

  };

}

// ======================================================
// Component
// ======================================================

export default function AdminDashboard() {

  const navigate = useNavigate();

  // ====================================================
  // State
  // ====================================================

  const [stats, setStats] = useState<DashboardStats>({

    users: 0,

    sellers: 0,

    products: 0,

    orders: 0,

    revenue: 0,

  });

  const [recentOrders, setRecentOrders] =

    useState<RecentOrder[]>([]);

  const [loading, setLoading] =

    useState(true);

  const [refreshing, setRefreshing] =

    useState(false);

  const [error, setError] =

    useState("");

  // ====================================================
  // Dashboard Cards
  // ====================================================

  const dashboardCards = [

    {

      title: "Users",

      value: stats.users,

      icon: <FaUsers />,

      bg: "bg-blue-50",

      color: "text-blue-600",

    },

    {

      title: "Sellers",

      value: stats.sellers,

      icon: <FaStore />,

      bg: "bg-green-50",

      color: "text-green-600",

    },

    {

      title: "Products",

      value: stats.products,

      icon: <FaBoxOpen />,

      bg: "bg-orange-50",

      color: "text-orange-500",

    },

    {

      title: "Orders",

      value: stats.orders,

      icon: <FaShoppingCart />,

      bg: "bg-purple-50",

      color: "text-purple-600",

    },

    {

      title: "Revenue",

      value: `₹${stats.revenue.toLocaleString()}`,

      icon: <FaRupeeSign />,

      bg: "bg-red-50",

      color: "text-red-500",

    },

  ];
    // ====================================================
  // Fetch Dashboard
  // ====================================================

  const fetchDashboard = async () => {

    try {

      setError("");

      const response = await getDashboard();

      const result: DashboardApiResponse =
        response.data;

      if (!result.success) {

        throw new Error(result.message);

      }

      // ================================================
      // Statistics
      // ================================================

      setStats({

        users:
          result.data.statistics.users ?? 0,

        sellers:
          result.data.statistics.sellers ?? 0,

        products:
          result.data.statistics.products ?? 0,

        orders:
          result.data.statistics.orders ?? 0,

        revenue:
          result.data.statistics.revenue ?? 0,

      });

      // ================================================
      // Recent Orders
      // ================================================

      setRecentOrders(

        result.data.recent_orders ?? []

      );

    }

    catch (error: any) {

      console.error(

        "Dashboard Error:",

        error

      );

      setError(

        error.response?.data?.message ||

        error.message ||

        "Unable to load dashboard."

      );

    }

  };

  // ====================================================
  // Initial Load
  // ====================================================

  useEffect(() => {

    const loadDashboard = async () => {

      setLoading(true);

      await fetchDashboard();

      setLoading(false);

    };

    loadDashboard();

  }, []);

  // ====================================================
  // Refresh Dashboard
  // ====================================================

  const refreshDashboard = async () => {

    setRefreshing(true);

    await fetchDashboard();

    setRefreshing(false);

  };

  // ====================================================
  // Loading Screen
  // ====================================================

  if (loading) {

    return (

      <MainLayout>

        <div className="flex min-h-screen items-center justify-center">

          <div className="text-center">

            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />

            <h2 className="mt-6 text-2xl font-bold text-gray-700">

              Loading Dashboard...

            </h2>

            <p className="mt-2 text-gray-500">

              Please wait while we fetch dashboard data.

            </p>

          </div>

        </div>

      </MainLayout>

    );

  }

  // ====================================================
  // Error Screen
  // ====================================================

  if (error) {

    return (

      <MainLayout>

        <div className="flex min-h-screen items-center justify-center">

          <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">

            <FiAlertCircle

              size={70}

              className="mx-auto text-red-600"

            />

            <h2 className="mt-5 text-3xl font-bold text-gray-800">

              Dashboard Error

            </h2>

            <p className="mt-3 text-gray-500">

              {error}

            </p>

            <button

              onClick={fetchDashboard}

              className="mt-8 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"

            >

              Retry

            </button>

          </div>

        </div>

      </MainLayout>

    );

  }
    // ====================================================
  // Main UI
  // ====================================================

  return (

    <MainLayout>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">

        <div className="mx-auto max-w-7xl">

          {/* ==============================================
              Header
          ============================================== */}

          <div className="mb-10 flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-lg lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h1 className="text-4xl font-extrabold text-gray-800">

                🌾 AgriGenAI Admin Dashboard

              </h1>

              <p className="mt-3 text-gray-500">

                Welcome back, Administrator.

                Monitor your marketplace statistics,

                sellers, products and orders from

                one place.

              </p>

            </div>

            <button

              onClick={refreshDashboard}

              disabled={refreshing}

              className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105 disabled:opacity-70"

            >

              <FiRefreshCw

                className={

                  refreshing

                    ? "animate-spin"

                    : ""

                }

              />

              Refresh Dashboard

            </button>

          </div>

          {/* ==============================================
              Statistics Cards
          ============================================== */}

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

            {

              dashboardCards.map(

                (card) => (

                  <div

                    key={card.title}

                    className="group rounded-3xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"

                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">

                          {card.title}

                        </p>

                        <h2 className="mt-3 text-4xl font-extrabold text-gray-800">

                          {card.value}

                        </h2>

                      </div>

                      <div

                        className={`rounded-2xl p-5 ${card.bg}`}

                      >

                        <div

                          className={`text-4xl ${card.color}`}

                        >

                          {card.icon}

                        </div>

                      </div>

                    </div>

                    <div className="mt-6 flex items-center gap-2 text-sm text-green-600">

                      <FiTrendingUp />

                      <span>

                        Live marketplace statistics

                      </span>

                    </div>

                  </div>

                )

              )

            }

          </div>
                    {/* ==============================================
              Quick Actions
          ============================================== */}

          <div className="mt-10">

            <div className="mb-6">

              <h2 className="text-3xl font-bold text-gray-800">

                🚀 Quick Actions

              </h2>

              <p className="mt-2 text-gray-500">

                Quickly navigate to different sections of the
                AgriGenAI Admin Panel.

              </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              <button

                onClick={() =>
                  navigate("/marketplace/admin/users")
                }

                className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-left text-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"

              >

                <FaUsers className="mb-5 text-5xl" />

                <h3 className="text-2xl font-bold">

                  Users

                </h3>

                <p className="mt-2 text-blue-100">

                  Manage all registered users.

                </p>

              </button>

              <button

                onClick={() =>
                  navigate("/marketplace/admin/sellers")
                }

                className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-700 p-6 text-left text-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"

              >

                <FaStore className="mb-5 text-5xl" />

                <h3 className="text-2xl font-bold">

                  Sellers

                </h3>

                <p className="mt-2 text-green-100">

                  View and approve marketplace sellers.

                </p>

              </button>

              <button

                onClick={() =>
                  navigate("/marketplace/admin/products")
                }

                className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-700 p-6 text-left text-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"

              >

                <FaBoxOpen className="mb-5 text-5xl" />

                <h3 className="text-2xl font-bold">

                  Products

                </h3>

                <p className="mt-2 text-orange-100">

                  Manage marketplace products.

                </p>

              </button>

              <button

                onClick={() =>
                  navigate("/marketplace/admin/orders")
                }

                className="rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 p-6 text-left text-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"

              >

                <FaShoppingCart className="mb-5 text-5xl" />

                <h3 className="text-2xl font-bold">

                  Orders

                </h3>

                <p className="mt-2 text-purple-100">

                  Track and manage customer orders.

                </p>

              </button>

              <button

                onClick={() =>
                  navigate("/marketplace/admin/categories")
                }

                className="rounded-2xl bg-gradient-to-r from-pink-500 to-pink-700 p-6 text-left text-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"

              >

                <FiDatabase className="mb-5 text-5xl" />

                <h3 className="text-2xl font-bold">

                  Categories

                </h3>

                <p className="mt-2 text-pink-100">

                  Organize product categories.

                </p>

              </button>

              <button

                onClick={() =>
                  navigate("/marketplace/admin/reports")
                }

                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-700 p-6 text-left text-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"

              >

                <FiTrendingUp className="mb-5 text-5xl" />

                <h3 className="text-2xl font-bold">

                  Reports

                </h3>

                <p className="mt-2 text-cyan-100">

                  View business reports and analytics.

                </p>

              </button>

              <button

                onClick={() =>
                  navigate("/marketplace/admin/settings")
                }

                className="rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 p-6 text-left text-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"

              >

                <FiServer className="mb-5 text-5xl" />

                <h3 className="text-2xl font-bold">

                  Settings

                </h3>

                <p className="mt-2 text-gray-200">

                  Configure marketplace settings.

                </p>

              </button>

            </div>

          </div>
                    {/* =====================================================
              Recent Orders
          ===================================================== */}

          <div className="mt-10 rounded-3xl bg-white p-8 shadow-lg">

            <div className="mb-8 flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-gray-800">

                  📦 Recent Orders

                </h2>

                <p className="mt-2 text-gray-500">

                  Latest marketplace orders.

                </p>

              </div>

              <FiActivity
                size={34}
                className="text-green-600"
              />

            </div>

            {

              recentOrders.length === 0 ? (

                <div className="rounded-2xl border-2 border-dashed border-gray-300 py-16 text-center">

                  <FaShoppingCart
                    className="mx-auto mb-4 text-gray-300"
                    size={55}
                  />

                  <h3 className="text-xl font-semibold text-gray-700">

                    No Orders Found

                  </h3>

                  <p className="mt-2 text-gray-500">

                    Orders will appear here once customers
                    place them.

                  </p>

                </div>

              ) : (

                <div className="overflow-x-auto">

                  <table className="min-w-full">

                    <thead>

                      <tr className="border-b bg-gray-50">

                        <th className="px-6 py-4 text-left">

                          Customer

                        </th>

                        <th className="px-6 py-4 text-left">

                          Amount

                        </th>

                        <th className="px-6 py-4 text-left">

                          Payment

                        </th>

                        <th className="px-6 py-4 text-left">

                          Status

                        </th>

                        <th className="px-6 py-4 text-left">

                          Date

                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {

                        recentOrders.map(

                          (order) => (

                            <tr
                              key={order._id}
                              className="border-b transition hover:bg-green-50"
                            >

                              <td className="px-6 py-5 font-semibold text-gray-800">

                                {

                                  order.customer_name ||

                                  "Unknown"

                                }

                              </td>

                              <td className="px-6 py-5 font-bold text-green-700">

                                ₹{

                                  Number(

                                    order.total_amount ||

                                    0

                                  ).toLocaleString()

                                }

                              </td>

                              <td className="px-6 py-5">

                                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                                  {

                                    order.payment_status ||

                                    "Pending"

                                  }

                                </span>

                              </td>

                              <td className="px-6 py-5">

                                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                  {

                                    order.status ||

                                    "Processing"

                                  }

                                </span>

                              </td>

                              <td className="px-6 py-5 text-gray-500">

                                {

                                  order.created_at

                                  ? new Date(

                                      order.created_at

                                    ).toLocaleDateString()

                                  : "--"

                                }

                              </td>

                            </tr>

                          )

                        )

                      }

                    </tbody>

                  </table>

                </div>

              )

            }

          </div>
                    {/* =====================================================
              System Health
          ===================================================== */}

          <div className="mt-10 grid gap-6 lg:grid-cols-3">

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-green-100 p-4">

                  <FiDatabase
                    size={30}
                    className="text-green-700"
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-800">

                    Database

                  </h3>

                  <p className="mt-1 text-green-600 font-semibold">

                    Connected

                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-blue-100 p-4">

                  <FiServer
                    size={30}
                    className="text-blue-700"
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-800">

                    Backend API

                  </h3>

                  <p className="mt-1 text-green-600 font-semibold">

                    Running

                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-purple-100 p-4">

                  <FiTrendingUp
                    size={30}
                    className="text-purple-700"
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-gray-800">

                    Marketplace

                  </h3>

                  <p className="mt-1 text-green-600 font-semibold">

                    Healthy

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =====================================================
              Marketplace Overview
          ===================================================== */}

          <div className="mt-10 rounded-3xl bg-white p-8 shadow-lg">

            <h2 className="mb-6 text-3xl font-bold text-gray-800">

              📊 Marketplace Overview

            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-2xl bg-green-50 p-6">

                <h3 className="text-lg font-semibold text-gray-700">

                  Registered Users

                </h3>

                <p className="mt-3 text-4xl font-extrabold text-green-700">

                  {stats.users}

                </p>

              </div>

              <div className="rounded-2xl bg-blue-50 p-6">

                <h3 className="text-lg font-semibold text-gray-700">

                  Active Sellers

                </h3>

                <p className="mt-3 text-4xl font-extrabold text-blue-700">

                  {stats.sellers}

                </p>

              </div>

              <div className="rounded-2xl bg-orange-50 p-6">

                <h3 className="text-lg font-semibold text-gray-700">

                  Products Listed

                </h3>

                <p className="mt-3 text-4xl font-extrabold text-orange-600">

                  {stats.products}

                </p>

              </div>

              <div className="rounded-2xl bg-red-50 p-6">

                <h3 className="text-lg font-semibold text-gray-700">

                  Total Revenue

                </h3>

                <p className="mt-3 text-4xl font-extrabold text-red-600">

                  ₹{stats.revenue.toLocaleString()}

                </p>

              </div>

            </div>

          </div>

          {/* =====================================================
              Footer
          ===================================================== */}

          <div className="mt-12 rounded-3xl bg-white p-6 text-center shadow-lg">

            <h3 className="text-2xl font-bold text-green-700">

              🌾 AgriGenAI Marketplace

            </h3>

            <p className="mt-3 text-gray-500">

              AI Powered Smart Agriculture Platform

            </p>

            <p className="mt-2 text-sm text-gray-400">

              © {new Date().getFullYear()} AgriGenAI.
              All Rights Reserved.

            </p>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}