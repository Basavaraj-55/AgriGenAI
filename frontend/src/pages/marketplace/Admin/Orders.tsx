// ======================================================
// 🌾 AgriGenAI Admin Orders
// File:
// frontend/src/pages/marketplace/Admin/Orders.tsx
// ======================================================

import { useEffect, useMemo, useState } from "react";

import MainLayout from "../../../components/layout/MainLayout";

import {

  FiEye,

  FiSearch,

  FiLoader,

  FiRefreshCw,

  FiShoppingBag,

  FiAlertCircle,

} from "react-icons/fi";

import {

  getOrders,

  updateOrderStatus,

} from "../../../services/adminApi";

// ======================================================
// Interfaces
// ======================================================

interface Order {

  _id: string;

  customer_name: string;

  seller_name: string;

  total_amount: number;

  payment_method: string;

  payment_status: string;

  order_status: string;

  created_at: string;

}

interface OrdersApiResponse {

  success: boolean;

  message: string;

  data: {

    orders: Order[];

    total?: number;

    page?: number;

    limit?: number;

  };

}

// ======================================================
// Component
// ======================================================

export default function Orders() {

  // ====================================================
  // State
  // ====================================================

  const [orders, setOrders] =

    useState<Order[]>([]);

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

  const [selectedOrder, setSelectedOrder] =

    useState<Order | null>(null);

  // ====================================================
  // Statistics
  // ====================================================

  const totalOrders =

    orders.length;

  const pendingOrders =

    orders.filter(

      (order) =>

        order.order_status

          ?.toLowerCase() ===

        "pending"

    ).length;

  const deliveredOrders =

    orders.filter(

      (order) =>

        order.order_status

          ?.toLowerCase() ===

        "delivered"

    ).length;

  const cancelledOrders =

    orders.filter(

      (order) =>

        order.order_status

          ?.toLowerCase() ===

        "cancelled"

    ).length;

  // ====================================================
  // Search Filter
  // ====================================================

  const filteredOrders =

    useMemo(() => {

      const keyword =

        search

          .trim()

          .toLowerCase();

      if (!keyword) {

        return orders;

      }

      return orders.filter(

        (order) =>

          order.customer_name

            ?.toLowerCase()

            .includes(keyword)

          ||

          order.seller_name

            ?.toLowerCase()

            .includes(keyword)

          ||

          order.payment_status

            ?.toLowerCase()

            .includes(keyword)

          ||

          order.order_status

            ?.toLowerCase()

            .includes(keyword)

      );

    }, [

      orders,

      search,

    ]);
      // ====================================================
  // Fetch Orders
  // ====================================================

  const fetchOrders = async () => {

    try {

      setError("");

      const response = await getOrders();

      const result: OrdersApiResponse =
        response.data;

      if (!result.success) {

        throw new Error(result.message);

      }

      setOrders(

        result.data.orders ?? []

      );

    }

    catch (error: any) {

      console.error(

        "Orders Error:",

        error

      );

      setError(

        error.response?.data?.message ||

        error.message ||

        "Unable to load orders."

      );

    }

  };

  // ====================================================
  // Initial Load
  // ====================================================

  useEffect(() => {

    const loadOrders = async () => {

      setLoading(true);

      await fetchOrders();

      setLoading(false);

    };

    loadOrders();

  }, []);

  // ====================================================
  // Refresh
  // ====================================================

  const refreshOrders = async () => {

    setRefreshing(true);

    await fetchOrders();

    setRefreshing(false);

  };

  // ====================================================
  // Change Order Status
  // ====================================================

  const changeStatus = async (

    orderId: string,

    status: string

  ) => {

    try {

      setActionId(orderId);

      await updateOrderStatus(

        orderId,

        status

      );

      await fetchOrders();

    }

    catch (error: any) {

      alert(

        error.response?.data?.message ||

        "Unable to update order."

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

              Loading Orders...

            </h2>

            <p className="mt-2 text-gray-500">

              Please wait while orders are loading.

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

              Unable to Load Orders

            </h2>

            <p className="mt-3 text-gray-500">

              {error}

            </p>

            <button

              onClick={fetchOrders}

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

                📦 Order Management

              </h1>

              <p className="mt-3 text-gray-500">

                View, track and manage all marketplace orders.

              </p>

            </div>

            <button

              onClick={refreshOrders}

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

              Refresh Orders

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

                    Total Orders

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-green-600">

                    {totalOrders}

                  </h2>

                </div>

                <div className="rounded-2xl bg-green-100 p-4">

                  <FiShoppingBag

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

                    Pending

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-yellow-600">

                    {pendingOrders}

                  </h2>

                </div>

                <div className="rounded-2xl bg-yellow-100 p-4">

                  <FiShoppingBag

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

                    Delivered

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-blue-600">

                    {deliveredOrders}

                  </h2>

                </div>

                <div className="rounded-2xl bg-blue-100 p-4">

                  <FiShoppingBag

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

                    Cancelled

                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-red-600">

                    {cancelledOrders}

                  </h2>

                </div>

                <div className="rounded-2xl bg-red-100 p-4">

                  <FiShoppingBag

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

                placeholder="Search customer, seller or order status..."

                value={search}

                onChange={(e) =>

                  setSearch(e.target.value)

                }

                className="w-full rounded-2xl border border-gray-300 py-4 pl-14 pr-5 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"

              />

            </div>

          </div>
                    {/* ==========================================
              Orders Table
          ========================================== */}

          <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl">

            {filteredOrders.length === 0 ? (

              <div className="py-24 text-center">

                <FiShoppingBag
                  size={70}
                  className="mx-auto text-gray-300"
                />

                <h2 className="mt-5 text-3xl font-bold text-gray-700">

                  No Orders Found

                </h2>

                <p className="mt-3 text-gray-500">

                  Customer orders will appear here.

                </p>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="min-w-full">

                  <thead className="bg-green-50">

                    <tr>

                      <th className="px-6 py-5 text-left">

                        Order ID

                      </th>

                      <th className="px-6 py-5 text-left">

                        Customer

                      </th>

                      <th className="px-6 py-5 text-left">

                        Seller

                      </th>

                      <th className="px-6 py-5 text-center">

                        Amount

                      </th>

                      <th className="px-6 py-5 text-center">

                        Payment

                      </th>

                      <th className="px-6 py-5 text-center">

                        Status

                      </th>

                      <th className="px-6 py-5 text-center">

                        Date

                      </th>

                      <th className="px-6 py-5 text-center">

                        Actions

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredOrders.map((order) => (

                      <tr

                        key={order._id}

                        className="border-t transition hover:bg-green-50"

                      >

                        {/* Order ID */}

                        <td className="px-6 py-5">

                          <div>

                            <h3 className="font-semibold text-gray-800">

                              #{order._id.slice(-8)}

                            </h3>

                            <p className="text-xs text-gray-500">

                              {order._id}

                            </p>

                          </div>

                        </td>

                        {/* Customer */}

                        <td className="px-6 py-5">

                          <div>

                            <h3 className="font-semibold text-gray-800">

                              {order.customer_name}

                            </h3>

                          </div>

                        </td>

                        {/* Seller */}

                        <td className="px-6 py-5">

                          {order.seller_name}

                        </td>

                        {/* Amount */}

                        <td className="px-6 py-5 text-center font-bold text-green-700">

                          ₹{Number(order.total_amount).toLocaleString()}

                        </td>

                        {/* Payment */}

                        <td className="px-6 py-5 text-center">

                          <span

                            className={`rounded-full px-4 py-2 text-sm font-semibold ${

                              order.payment_status?.toLowerCase() === "paid"

                                ? "bg-green-100 text-green-700"

                                : order.payment_status?.toLowerCase() === "pending"

                                ? "bg-yellow-100 text-yellow-700"

                                : "bg-red-100 text-red-700"

                            }`}

                          >

                            {order.payment_status}

                          </span>

                        </td>

                        {/* Status */}

                        <td className="px-6 py-5 text-center">

                          <select

                            value={order.order_status}

                            disabled={actionId === order._id}

                            onChange={(e) =>

                              changeStatus(

                                order._id,

                                e.target.value

                              )

                            }

                            className="rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-500"

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

                        {/* Date */}

                        <td className="px-6 py-5 text-center text-gray-600">

                          {new Date(

                            order.created_at

                          ).toLocaleDateString()}

                        </td>

                        {/* Actions */}

                        <td className="px-6 py-5">

                          <div className="flex justify-center">

                            <button

                              onClick={() =>

                                setSelectedOrder(order)

                              }

                              className="rounded-xl bg-green-100 p-3 text-green-600 transition hover:bg-green-200"

                              title="View Order"

                            >

                              <FiEye />

                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>
                    {/* ==========================================
              Order Details Modal
          ========================================== */}

          {selectedOrder && (

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

              <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">

                <div className="mb-8 flex items-center justify-between">

                  <h2 className="text-3xl font-bold text-gray-800">

                    📦 Order Details

                  </h2>

                  <button

                    onClick={() =>

                      setSelectedOrder(null)

                    }

                    className="rounded-xl bg-red-100 px-4 py-2 text-red-600 transition hover:bg-red-200"

                  >

                    ✕

                  </button>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                  <div className="rounded-2xl bg-gray-50 p-5">

                    <p className="text-sm text-gray-500">

                      Customer

                    </p>

                    <h3 className="mt-2 text-lg font-semibold">

                      {selectedOrder.customer_name}

                    </h3>

                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5">

                    <p className="text-sm text-gray-500">

                      Seller

                    </p>

                    <h3 className="mt-2 text-lg font-semibold">

                      {selectedOrder.seller_name}

                    </h3>

                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5">

                    <p className="text-sm text-gray-500">

                      Order Amount

                    </p>

                    <h3 className="mt-2 text-lg font-bold text-green-700">

                      ₹{Number(

                        selectedOrder.total_amount

                      ).toLocaleString()}

                    </h3>

                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5">

                    <p className="text-sm text-gray-500">

                      Payment Method

                    </p>

                    <h3 className="mt-2 text-lg font-semibold">

                      {selectedOrder.payment_method}

                    </h3>

                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5">

                    <p className="text-sm text-gray-500">

                      Payment Status

                    </p>

                    <span

                      className={`mt-2 inline-block rounded-full px-4 py-2 text-sm font-semibold ${

                        selectedOrder.payment_status?.toLowerCase() === "paid"

                          ? "bg-green-100 text-green-700"

                          : "bg-yellow-100 text-yellow-700"

                      }`}

                    >

                      {selectedOrder.payment_status}

                    </span>

                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5">

                    <p className="text-sm text-gray-500">

                      Order Status

                    </p>

                    <span className="mt-2 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                      {selectedOrder.order_status}

                    </span>

                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5 md:col-span-2">

                    <p className="text-sm text-gray-500">

                      Order Date

                    </p>

                    <h3 className="mt-2 text-lg font-semibold">

                      {new Date(

                        selectedOrder.created_at

                      ).toLocaleString()}

                    </h3>

                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5 md:col-span-2">

                    <p className="text-sm text-gray-500">

                      Order ID

                    </p>

                    <p className="mt-2 break-all font-mono text-gray-700">

                      {selectedOrder._id}

                    </p>

                  </div>

                </div>

                <div className="mt-8 flex justify-end">

                  <button

                    onClick={() =>

                      setSelectedOrder(null)

                    }

                    className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"

                  >

                    Close

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