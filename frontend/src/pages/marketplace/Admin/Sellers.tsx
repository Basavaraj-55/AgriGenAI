// ======================================================
// 🌾 AgriGenAI Admin Sellers
// File:
// frontend/src/pages/marketplace/Admin/Sellers.tsx
// ======================================================

import { useEffect, useMemo, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import {

  FiCheckCircle,

  FiXCircle,

  FiTrash2,

  FiLoader,

  FiRefreshCw,

  FiSearch,

  FiUsers,

  FiAlertCircle,

} from "react-icons/fi";

import {

  getSellers,

  approveSeller,

  rejectSeller,

  deleteSeller,

} from "../../../services/adminApi";

// ======================================================
// Interfaces
// ======================================================

interface Seller {

  _id: string;

  name: string;

  email: string;

  phone?: string;

  products?: number;

  product_count?: number;

  status: string;

  created_at: string;

}

interface SellersApiResponse {

  success: boolean;

  message: string;

  data: {

    sellers: Seller[];

    total?: number;

    page?: number;

    limit?: number;

  };

}

// ======================================================
// Component
// ======================================================

export default function Sellers() {

  // ====================================================
  // State
  // ====================================================

  const [sellers, setSellers] =

    useState<Seller[]>([]);

  const [loading, setLoading] =

    useState(true);

  const [refreshing, setRefreshing] =

    useState(false);

  const [error, setError] =

    useState("");

  const [search, setSearch] =

    useState("");

  const [actionId, setActionId] =

    useState<string | null>(null);

  const [deleteId, setDeleteId] =

    useState<string | null>(null);

  // ====================================================
  // Statistics
  // ====================================================

  const totalSellers =

    sellers.length;

  const approvedSellers =

    sellers.filter(

      (seller) =>

        seller.status

          ?.toLowerCase() ===

        "approved"

    ).length;

  const pendingSellers =

    sellers.filter(

      (seller) =>

        seller.status

          ?.toLowerCase() ===

        "pending"

    ).length;

  const rejectedSellers =

    sellers.filter(

      (seller) =>

        seller.status

          ?.toLowerCase() ===

        "rejected"

    ).length;

  // ====================================================
  // Search Filter
  // ====================================================

  const filteredSellers =

    useMemo(() => {

      const keyword =

        search

          .trim()

          .toLowerCase();

      if (!keyword) {

        return sellers;

      }

      return sellers.filter(

        (seller) =>

          seller.name

            ?.toLowerCase()

            .includes(keyword)

          ||

          seller.email

            ?.toLowerCase()

            .includes(keyword)

          ||

          seller.status

            ?.toLowerCase()

            .includes(keyword)

      );

    }, [

      sellers,

      search,

    ]);
      // ====================================================
  // Fetch Sellers
  // ====================================================

  const fetchSellers = async () => {

    try {

      setError("");

      const response = await getSellers();

      const result: SellersApiResponse =
        response.data;

      if (!result.success) {

        throw new Error(result.message);

      }

      setSellers(

        result.data.sellers ?? []

      );

    }

    catch (error: any) {

      console.error(

        "Sellers Error:",

        error

      );

      setError(

        error.response?.data?.message ||

        error.message ||

        "Unable to load sellers."

      );

    }

  };

  // ====================================================
  // Initial Load
  // ====================================================

  useEffect(() => {

    const loadSellers = async () => {

      setLoading(true);

      await fetchSellers();

      setLoading(false);

    };

    loadSellers();

  }, []);

  // ====================================================
  // Refresh
  // ====================================================

  const refreshSellers = async () => {

    setRefreshing(true);

    await fetchSellers();

    setRefreshing(false);

  };

  // ====================================================
  // Approve Seller
  // ====================================================

  const handleApprove = async (

    sellerId: string

  ) => {

    try {

      setActionId(sellerId);

      await approveSeller(

        sellerId

      );

      await fetchSellers();

    }

    catch (error: any) {

      alert(

        error.response?.data?.message ||

        "Unable to approve seller."

      );

    }

    finally {

      setActionId(null);

    }

  };

  // ====================================================
  // Reject Seller
  // ====================================================

  const handleReject = async (

    sellerId: string

  ) => {

    try {

      setActionId(sellerId);

      await rejectSeller(

        sellerId

      );

      await fetchSellers();

    }

    catch (error: any) {

      alert(

        error.response?.data?.message ||

        "Unable to reject seller."

      );

    }

    finally {

      setActionId(null);

    }

  };

  // ====================================================
  // Delete Seller
  // ====================================================

  const handleDelete = async () => {

    if (!deleteId) {

      return;

    }

    try {

      setActionId(deleteId);

      await deleteSeller(deleteId);

      setDeleteId(null);

      await fetchSellers();

    }

    catch (error: any) {

      alert(

        error.response?.data?.message ||

        "Unable to delete seller."

      );

    }

    finally {

      setActionId(null);

    }

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

              Loading Sellers...

            </h2>

            <p className="mt-2 text-gray-500">

              Please wait while seller data is loading.

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

              Unable to Load Sellers

            </h2>

            <p className="mt-3 text-gray-500">

              {error}

            </p>

            <button

              onClick={fetchSellers}

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

                🏪 Seller Management

              </h1>

              <p className="mt-3 text-gray-500">

                View, approve and manage all marketplace sellers.

              </p>

            </div>

            <button

              onClick={refreshSellers}

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

              Refresh Sellers

            </button>

          </div>

          {/* ==========================================
              Statistics
          ========================================== */}

          <div className="grid gap-6 md:grid-cols-4">

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">

                    Total Sellers

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-green-600">

                    {totalSellers}

                  </h2>

                </div>

                <div className="rounded-2xl bg-green-100 p-4">

                  <FiUsers

                    size={36}

                    className="text-green-700"

                  />

                </div>

              </div>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">

                    Approved

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-blue-600">

                    {approvedSellers}

                  </h2>

                </div>

                <div className="rounded-2xl bg-blue-100 p-4">

                  <FiCheckCircle

                    size={36}

                    className="text-blue-700"

                  />

                </div>

              </div>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">

                    Pending

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-yellow-600">

                    {pendingSellers}

                  </h2>

                </div>

                <div className="rounded-2xl bg-yellow-100 p-4">

                  <FiLoader

                    size={36}

                    className="text-yellow-700"

                  />

                </div>

              </div>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">

                    Rejected

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-red-600">

                    {rejectedSellers}

                  </h2>

                </div>

                <div className="rounded-2xl bg-red-100 p-4">

                  <FiXCircle

                    size={36}

                    className="text-red-700"

                  />

                </div>

              </div>

            </div>

          </div>

          {/* ==========================================
              Search
          ========================================== */}

          <div className="mt-10 rounded-3xl bg-white p-6 shadow-lg">

            <div className="relative">

              <FiSearch

                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"

                size={22}

              />

              <input

                type="text"

                placeholder="Search by seller name, email or status..."

                value={search}

                onChange={(e) =>

                  setSearch(e.target.value)

                }

                className="w-full rounded-2xl border border-gray-300 py-4 pl-14 pr-5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"

              />

            </div>

          </div>
                    {/* ==========================================
              Sellers Table
          ========================================== */}

          <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl">

            {filteredSellers.length === 0 ? (

              <div className="py-24 text-center">

                <FiUsers
                  size={70}
                  className="mx-auto text-gray-300"
                />

                <h2 className="mt-5 text-3xl font-bold text-gray-700">

                  No Sellers Found

                </h2>

                <p className="mt-3 text-gray-500">

                  No seller matches your search.

                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="min-w-full">

                  <thead className="bg-green-50">

                    <tr>

                      <th className="px-6 py-5 text-left">

                        Seller

                      </th>

                      <th className="px-6 py-5 text-left">

                        Email

                      </th>

                      <th className="px-6 py-5 text-left">

                        Phone

                      </th>

                      <th className="px-6 py-5 text-center">

                        Products

                      </th>

                      <th className="px-6 py-5 text-center">

                        Status

                      </th>

                      <th className="px-6 py-5 text-center">

                        Joined

                      </th>

                      <th className="px-6 py-5 text-center">

                        Actions

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredSellers.map((seller) => {

                      const productCount =

                        seller.product_count ??

                        seller.products ??

                        0;

                      return (

                        <tr

                          key={seller._id}

                          className="border-t transition hover:bg-green-50"

                        >

                          {/* Seller */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-4">

                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-600 font-bold text-white">

                                {seller.name?.charAt(0).toUpperCase()}

                              </div>

                              <div>

                                <h3 className="font-semibold text-gray-800">

                                  {seller.name}

                                </h3>

                                <p className="text-xs text-gray-500">

                                  ID: {seller._id?.slice(0, 8)}

                                </p>

                              </div>

                            </div>

                          </td>

                          {/* Email */}

                          <td className="px-6 py-5 text-gray-600">

                            {seller.email}

                          </td>

                          {/* Phone */}

                          <td className="px-6 py-5 text-gray-600">

                            {seller.phone || "--"}

                          </td>

                          {/* Products */}

                          <td className="px-6 py-5 text-center font-bold text-green-700">

                            {productCount}

                          </td>

                          {/* Status */}

                          <td className="px-6 py-5 text-center">

                            <span

                              className={`rounded-full px-4 py-2 text-sm font-semibold ${

                                seller.status?.toLowerCase() === "approved"

                                  ? "bg-green-100 text-green-700"

                                  : seller.status?.toLowerCase() === "pending"

                                  ? "bg-yellow-100 text-yellow-700"

                                  : "bg-red-100 text-red-700"

                              }`}

                            >

                              {seller.status}

                            </span>

                          </td>

                          {/* Joined */}

                          <td className="px-6 py-5 text-center text-gray-600">

                            {seller.created_at

                              ? new Date(

                                  seller.created_at

                                ).toLocaleDateString()

                              : "--"}

                          </td>

                          {/* Actions */}

                          <td className="px-6 py-5">

                            <div className="flex justify-center gap-3">

                              <button

                                disabled={

                                  seller.status?.toLowerCase() ===

                                    "approved" ||

                                  actionId === seller._id

                                }

                                onClick={() =>

                                  handleApprove(

                                    seller._id

                                  )

                                }

                                className="rounded-xl bg-green-100 p-3 text-green-600 transition hover:bg-green-200 disabled:opacity-50"

                                title="Approve Seller"

                              >

                                <FiCheckCircle />

                              </button>

                              <button

                                disabled={

                                  seller.status?.toLowerCase() ===

                                    "rejected" ||

                                  actionId === seller._id

                                }

                                onClick={() =>

                                  handleReject(

                                    seller._id

                                  )

                                }

                                className="rounded-xl bg-yellow-100 p-3 text-yellow-600 transition hover:bg-yellow-200 disabled:opacity-50"

                                title="Reject Seller"

                              >

                                <FiXCircle />

                              </button>

                              <button

                                onClick={() =>

                                  setDeleteId(

                                    seller._id

                                  )

                                }

                                className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:bg-red-200"

                                title="Delete Seller"

                              >

                                <FiTrash2 />

                              </button>

                            </div>

                          </td>

                        </tr>

                      );

                    })}

                  </tbody>

                </table>

              </div>

            )}

          </div>
                    {/* ==========================================
              Delete Confirmation Modal
          ========================================== */}

          {deleteId && (

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

              <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

                  <FiTrash2

                    size={40}

                    className="text-red-600"

                  />

                </div>

                <h2 className="mt-6 text-center text-3xl font-bold text-gray-800">

                  Delete Seller

                </h2>

                <p className="mt-4 text-center text-gray-500">

                  Are you sure you want to permanently
                  delete this seller?

                </p>

                <p className="mt-2 text-center text-sm text-red-500">

                  This action cannot be undone.

                </p>

                <div className="mt-8 flex gap-4">

                  <button

                    onClick={() =>

                      setDeleteId(null)

                    }

                    className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold transition hover:bg-gray-100"

                  >

                    Cancel

                  </button>

                  <button

                    onClick={handleDelete}

                    disabled={

                      actionId !== null

                    }

                    className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"

                  >

                    {actionId

                      ? "Deleting..."

                      : "Delete"}

                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </MainLayout>

  );

}