import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";

import {
  FiCheckCircle,
  FiShoppingBag,
  FiTruck,
  FiHome,
  FiArrowRight,
} from "react-icons/fi";

// ======================================================
// OrderSuccess
// ======================================================

function OrderSuccess() {
  const navigate = useNavigate();

  // ======================================================
  // Dummy Order Data
  // ======================================================

  const order = useMemo(
    () => ({
      orderId: "AGR104589",
      paymentMethod: "Cash on Delivery",
      total: 933,
      estimatedDelivery: "23 July 2026",
      address: {
        name: "Basavaraj",
        phone: "+91 9876543210",
        location:
          "Bhalki, Bidar, Karnataka - 585328",
      },
    }),
    []
  );
    // ======================================================
  // JSX
  // ======================================================

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12">

        <div className="mx-auto max-w-4xl px-6">

          <div className="rounded-3xl bg-white p-10 shadow-xl">

            {/* Success Icon */}

            <div className="flex justify-center">

              <div className="rounded-full bg-green-100 p-6">

                <FiCheckCircle
                  size={80}
                  className="text-green-600"
                />

              </div>

            </div>

            {/* Heading */}

            <h1 className="mt-8 text-center text-4xl font-bold text-gray-800">
              Order Placed Successfully!
            </h1>

            <p className="mt-4 text-center text-lg text-gray-600">
              Thank you for shopping with AgriGenAI.
              Your order has been confirmed.
            </p>

            {/* Order Details */}

            <div className="mt-10 grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl border p-6">

                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">

                  <FiShoppingBag />

                  Order Details

                </h2>

                <div className="space-y-3 text-gray-700">

                  <div className="flex justify-between">
                    <span>Order ID</span>
                    <span className="font-semibold">
                      #{order.orderId}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Payment</span>
                    <span>{order.paymentMethod}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-bold text-green-700">
                      ₹{order.total}
                    </span>
                  </div>

                </div>

              </div>

              {/* Delivery */}

              <div className="rounded-2xl border p-6">

                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">

                  <FiTruck />

                  Delivery

                </h2>

                <div className="space-y-3 text-gray-700">

                  <p>
                    <strong>Estimated Delivery</strong>
                  </p>

                  <p className="text-lg font-semibold text-green-700">
                    {order.estimatedDelivery}
                  </p>

                </div>

              </div>

            </div>

            {/* Address */}

            <div className="mt-8 rounded-2xl border p-6">

              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">

                <FiHome />

                Delivery Address

              </h2>

              <div className="space-y-2 text-gray-700">

                <p className="font-semibold">
                  {order.address.name}
                </p>

                <p>{order.address.phone}</p>

                <p>{order.address.location}</p>

              </div>

            </div>

            {/* Action Buttons */}

            <div className="mt-10">
                              <div className="flex flex-col gap-4 sm:flex-row">

                <button
                  onClick={() => navigate("/marketplace")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700"
                >
                  Continue Shopping
                  <FiArrowRight />
                </button>

                <button
                  onClick={() => navigate("/marketplace/orders")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-green-600 bg-white px-6 py-4 font-semibold text-green-700 transition hover:bg-green-50"
                >
                  <FiShoppingBag />
                  View My Orders
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default OrderSuccess;