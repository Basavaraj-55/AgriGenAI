// ======================================================
// 🌾 AgriGenAI Admin Reports
// File:
// frontend/src/pages/marketplace/Admin/Reports.tsx
// ======================================================

import {

  useEffect,

  useState,

} from "react";

import MainLayout from "../../../components/layout/MainLayout";

import {

  FaUsers,

  FaStore,

  FaBoxOpen,

  FaShoppingCart,

  FaRupeeSign,

} from "react-icons/fa";

import {

  FiLoader,

  FiRefreshCw,

  FiTrendingUp,

  FiAlertCircle,

} from "react-icons/fi";

import {

  getReports,

} from "../../../services/adminApi";

// ======================================================
// Interfaces
// ======================================================

interface ReportStats {

  revenue: number;

  orders: number;

  users: number;

  sellers: number;

  products: number;

  pendingOrders: number;

}

interface TopProduct {

  _id: string;

  name: string;

  sales: number;

  revenue: number;

}

interface TopSeller {

  _id: string;

  name: string;

  orders: number;

  revenue: number;

}

interface ReportsApiResponse {

  success: boolean;

  message: string;

  data: {

    revenue: number;

    orders: number;

    users: number;

    sellers: number;

    products: number;

    pendingOrders: number;

    topProducts: TopProduct[];

    topSellers: TopSeller[];

  };

}

// ======================================================
// Component
// ======================================================

export default function Reports() {

  // ====================================================
  // State
  // ====================================================

  const [stats, setStats] =

    useState<ReportStats>({

      revenue: 0,

      orders: 0,

      users: 0,

      sellers: 0,

      products: 0,

      pendingOrders: 0,

    });

  const [topProducts, setTopProducts] =

    useState<TopProduct[]>([]);

  const [topSellers, setTopSellers] =

    useState<TopSeller[]>([]);

  const [loading, setLoading] =

    useState(true);

  const [refreshing, setRefreshing] =

    useState(false);

  const [error, setError] =

    useState("");
      // ====================================================
  // Fetch Reports
  // ====================================================

  const fetchReports = async () => {

    try {

      setError("");

      const response = await getReports();

      const result: ReportsApiResponse =
        response.data;

      if (!result.success) {

        throw new Error(result.message);

      }

      setStats({

        revenue:

          result.data.revenue ?? 0,

        orders:

          result.data.orders ?? 0,

        users:

          result.data.users ?? 0,

        sellers:

          result.data.sellers ?? 0,

        products:

          result.data.products ?? 0,

        pendingOrders:

          result.data.pendingOrders ?? 0,

      });

      setTopProducts(

        result.data.topProducts ?? []

      );

      setTopSellers(

        result.data.topSellers ?? []

      );

    }

    catch (error: any) {

      console.error(

        "Reports Error:",

        error

      );

      setError(

        error.response?.data?.message ||

        error.message ||

        "Unable to load reports."

      );

    }

  };

  // ====================================================
  // Initial Load
  // ====================================================

  useEffect(() => {

    const loadReports = async () => {

      setLoading(true);

      await fetchReports();

      setLoading(false);

    };

    loadReports();

  }, []);

  // ====================================================
  // Refresh
  // ====================================================

  const refreshReports = async () => {

    setRefreshing(true);

    await fetchReports();

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

            <FiLoader

              size={60}

              className="mx-auto animate-spin text-green-600"

            />

            <h2 className="mt-6 text-2xl font-bold text-gray-700">

              Loading Reports...

            </h2>

            <p className="mt-2 text-gray-500">

              Please wait while analytics data is loading.

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

          <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">

            <FiAlertCircle

              size={70}

              className="mx-auto text-red-600"

            />

            <h2 className="mt-5 text-3xl font-bold text-gray-800">

              Unable to Load Reports

            </h2>

            <p className="mt-3 text-gray-500">

              {error}

            </p>

            <button

              onClick={fetchReports}

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

          {/* ==========================================
              Header
          ========================================== */}

          <div className="mb-10 flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-lg lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h1 className="text-4xl font-extrabold text-gray-800">

                📊 Reports & Analytics

              </h1>

              <p className="mt-3 text-gray-500">

                Monitor marketplace performance and business insights.

              </p>

            </div>

            <button

              onClick={refreshReports}

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

              Refresh Reports

            </button>

          </div>

          {/* ==========================================
              Analytics Cards
          ========================================== */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {/* Revenue */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">

                    Total Revenue

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-green-600">

                    ₹{stats.revenue.toLocaleString()}

                  </h2>

                </div>

                <div className="rounded-2xl bg-green-100 p-4">

                  <FaRupeeSign

                    size={34}

                    className="text-green-700"

                  />

                </div>

              </div>

            </div>

            {/* Orders */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">

                    Total Orders

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-blue-600">

                    {stats.orders}

                  </h2>

                </div>

                <div className="rounded-2xl bg-blue-100 p-4">

                  <FaShoppingCart

                    size={34}

                    className="text-blue-700"

                  />

                </div>

              </div>

            </div>

            {/* Users */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">

                    Users

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-purple-600">

                    {stats.users}

                  </h2>

                </div>

                <div className="rounded-2xl bg-purple-100 p-4">

                  <FaUsers

                    size={34}

                    className="text-purple-700"

                  />

                </div>

              </div>

            </div>

            {/* Sellers */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">

                    Sellers

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-orange-600">

                    {stats.sellers}

                  </h2>

                </div>

                <div className="rounded-2xl bg-orange-100 p-4">

                  <FaStore

                    size={34}

                    className="text-orange-700"

                  />

                </div>

              </div>

            </div>

            {/* Products */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">

                    Products

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-red-600">

                    {stats.products}

                  </h2>

                </div>

                <div className="rounded-2xl bg-red-100 p-4">

                  <FaBoxOpen

                    size={34}

                    className="text-red-700"

                  />

                </div>

              </div>

            </div>

            {/* Pending Orders */}

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">

                    Pending Orders

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-indigo-600">

                    {stats.pendingOrders}

                  </h2>

                </div>

                <div className="rounded-2xl bg-indigo-100 p-4">

                  <FiTrendingUp

                    size={34}

                    className="text-indigo-700"

                  />

                </div>

              </div>

            </div>

          </div>
                    {/* ==========================================
              Top Selling Products
          ========================================== */}

          <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl">

            <div className="border-b bg-green-50 px-8 py-6">

              <h2 className="text-2xl font-bold text-gray-800">

                📦 Top Selling Products

              </h2>

              <p className="mt-2 text-gray-500">

                Products generating the highest sales revenue.

              </p>

            </div>

            {topProducts.length === 0 ? (

              <div className="py-24 text-center">

                <FaBoxOpen

                  size={70}

                  className="mx-auto text-gray-300"

                />

                <h2 className="mt-5 text-3xl font-bold text-gray-700">

                  No Sales Data

                </h2>

                <p className="mt-3 text-gray-500">

                  Top selling products will appear here.

                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="min-w-full">

                  <thead className="bg-green-50">

                    <tr>

                      <th className="px-6 py-5 text-left">

                        Product

                      </th>

                      <th className="px-6 py-5 text-center">

                        Sales

                      </th>

                      <th className="px-6 py-5 text-center">

                        Revenue

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {topProducts.map((product) => (

                      <tr

                        key={product._id}

                        className="border-t transition hover:bg-green-50"

                      >

                        {/* Product */}

                        <td className="px-6 py-5">

                          <div>

                            <h3 className="font-semibold text-gray-800">

                              {product.name}

                            </h3>

                            <p className="text-xs text-gray-500">

                              ID: {product._id.slice(-8)}

                            </p>

                          </div>

                        </td>

                        {/* Sales */}

                        <td className="px-6 py-5 text-center">

                          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                            {product.sales}

                          </span>

                        </td>

                        {/* Revenue */}

                        <td className="px-6 py-5 text-center">

                          <span className="font-bold text-green-700">

                            ₹{product.revenue.toLocaleString()}

                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>
                    {/* ==========================================
              Top Sellers
          ========================================== */}

          <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl">

            <div className="border-b bg-orange-50 px-8 py-6">

              <h2 className="text-2xl font-bold text-gray-800">

                🏪 Top Sellers

              </h2>

              <p className="mt-2 text-gray-500">

                Sellers generating the highest marketplace revenue.

              </p>

            </div>

            {topSellers.length === 0 ? (

              <div className="py-24 text-center">

                <FaStore

                  size={70}

                  className="mx-auto text-gray-300"

                />

                <h2 className="mt-5 text-3xl font-bold text-gray-700">

                  No Seller Data

                </h2>

                <p className="mt-3 text-gray-500">

                  Seller performance data will appear here.

                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="min-w-full">

                  <thead className="bg-orange-50">

                    <tr>

                      <th className="px-6 py-5 text-left">

                        Seller

                      </th>

                      <th className="px-6 py-5 text-center">

                        Orders

                      </th>

                      <th className="px-6 py-5 text-center">

                        Revenue

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {topSellers.map((seller) => (

                      <tr

                        key={seller._id}

                        className="border-t transition hover:bg-orange-50"

                      >

                        {/* Seller */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 font-bold text-white">

                              {seller.name?.charAt(0).toUpperCase()}

                            </div>

                            <div>

                              <h3 className="font-semibold text-gray-800">

                                {seller.name}

                              </h3>

                              <p className="text-xs text-gray-500">

                                ID: {seller._id.slice(-8)}

                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Orders */}

                        <td className="px-6 py-5 text-center">

                          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                            {seller.orders}

                          </span>

                        </td>

                        {/* Revenue */}

                        <td className="px-6 py-5 text-center">

                          <span className="font-bold text-green-700">

                            ₹{seller.revenue.toLocaleString()}

                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </div>

    </MainLayout>

  );

}