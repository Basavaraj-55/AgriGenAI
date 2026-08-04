// ==========================================================
// 🌾 AgriGenAI Marketplace
// Checkout.tsx
// Part 1
// ==========================================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../../components/layout/MainLayout";
import api from "../../../services/api";

// ==========================================================
// Types
// ==========================================================

interface CartItem {
  _id: string;
  product_name: string;
  seller_id: string;
  price: number;
  quantity: number;
  image_url?: string;
}

interface Address {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

// ==========================================================
// Component
// ==========================================================

export default function Checkout() {

  const navigate = useNavigate();

  // ==========================================================
  // States
  // ==========================================================

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [address, setAddress] = useState<Address>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ==========================================================
  // Load Cart
  // ==========================================================

  useEffect(() => {

    try {

      const savedCart = localStorage.getItem("cart");

      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }

    } catch (err) {

      console.error(err);
      setError("Unable to load cart.");

    } finally {

      setLoading(false);

    }

  }, []);

  // ==========================================================
  // Handle Input
  // ==========================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // ==========================================================
  // Total Amount
  // ==========================================================

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  // ==========================================================
  // Validate Address
  // ==========================================================

  const validateAddress = () => {

    if (
      !address.name ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {

      setError("Please fill all delivery details.");
      return false;

    }

    return true;

  };

  // ==========================================================
  // Place Order
  // ==========================================================

  const placeOrder = async () => {

    try {

      setError("");

      if (cartItems.length === 0) {
        setError("Your cart is empty.");
        return;
      }

      if (!validateAddress()) {
        return;
      }

      setPlacingOrder(true);

      // ======================================================
      // Backend expects one order per product
      // ======================================================

      for (const item of cartItems) {

        const orderData = {

          product_id: item._id,

          product_name: item.product_name,

      

          quantity: item.quantity,

          price: item.price,

          total_amount:
            item.price * item.quantity,

          address: {

            name: address.name,

            email: address.email,

            phone: address.phone,

            address: address.address,

            city: address.city,

            state: address.state,

            pincode: address.pincode,

          },

          payment_method: paymentMethod,

        };

        const response =
          await api.post(
            "/orders",
            orderData
          );

        if (!response.data.success) {

          throw new Error(
            response.data.message ||
            "Order failed."
          );

        }

      }

      localStorage.removeItem("cart");

      navigate(
        "/marketplace/order-success",
        {
          replace: true,
        }
      );

    } catch (err: any) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to place order."
      );

    } finally {

      setPlacingOrder(false);

    }

  };

  // ==========================================================
  // Loading
  // ==========================================================

  if (loading) {

    return (

      <MainLayout>

        <div className="flex min-h-screen items-center justify-center">

          <h2 className="text-xl font-bold text-green-700">

            Loading Checkout...

          </h2>

        </div>

      </MainLayout>

    );

  }

  // ==========================================================
  // PART 2 CONTINUES WITH THE JSX
  // ==========================================================
    // ==========================================================
  // Checkout UI
  // ==========================================================

  return (

    <MainLayout>

      <div className="min-h-screen bg-gray-50 p-6">

        <div className="mx-auto max-w-6xl space-y-8">

          {/* ====================================================== */}
          {/* Header */}
          {/* ====================================================== */}

          <div className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 p-8 text-white shadow-xl">

            <h1 className="text-4xl font-bold">
              🛒 Checkout
            </h1>

            <p className="mt-3 text-green-100">
              Complete your purchase securely.
            </p>

          </div>

          {/* ====================================================== */}
          {/* Error */}
          {/* ====================================================== */}

          {error && (

            <div className="rounded-xl bg-red-100 border border-red-200 p-4 text-red-700 font-semibold">

              {error}

            </div>

          )}

          <div className="grid gap-8 lg:grid-cols-2">

            {/* ====================================================== */}
            {/* Delivery Address */}
            {/* ====================================================== */}

            <div className="rounded-3xl bg-white p-8 shadow-xl">

              <h2 className="mb-6 text-2xl font-bold text-green-700">

                📍 Delivery Address

              </h2>

              <input
                type="text"
                name="name"
                value={address.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="mb-4 w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              />

              <input
                type="email"
                name="email"
                value={address.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="mb-4 w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              />

              <input
                type="text"
                name="phone"
                value={address.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="mb-4 w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              />

              <textarea
                rows={4}
                name="address"
                value={address.address}
                onChange={handleChange}
                placeholder="Full Address"
                className="mb-4 w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              />

              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="City"
                className="mb-4 w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              />

              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                placeholder="State"
                className="mb-4 w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              />

              <input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full rounded-xl border p-3 focus:border-green-500 focus:outline-none"
              />

            </div>

            {/* ====================================================== */}
            {/* Order Summary */}
            {/* ====================================================== */}

            <div className="rounded-3xl bg-white p-8 shadow-xl">

              <h2 className="mb-6 text-2xl font-bold text-green-700">

                🧾 Order Summary

              </h2>

              {cartItems.length === 0 ? (

                <div className="rounded-xl bg-gray-100 p-6 text-center text-gray-500">

                  No products available.

                </div>

              ) : (

                <div className="space-y-4">

                  {cartItems.map((item) => (

                    <div
                      key={item._id}
                      className="flex items-center justify-between rounded-xl border bg-gray-50 p-4"
                    >

                      <div>

                        <h3 className="font-semibold text-gray-800">

                          {item.product_name}

                        </h3>

                        <p className="text-sm text-gray-500">

                          Quantity : {item.quantity}

                        </p>

                        <p className="text-sm text-green-700">

                          ₹ {item.price.toLocaleString()}

                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-lg font-bold text-green-700">

                          ₹ {(item.price * item.quantity).toLocaleString()}

                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              )}

              {/* ====================================================== */}
              {/* Total */}
              {/* ====================================================== */}

              <div className="my-6 flex justify-between border-t pt-6 text-2xl font-bold">

                <span>Total</span>

                <span className="text-green-700">

                  ₹ {totalAmount.toLocaleString()}

                </span>

              </div>

              {/* ====================================================== */}
              {/* Payment */}
              {/* ====================================================== */}

              <h3 className="mb-4 text-xl font-bold">

                💳 Payment Method

              </h3>

              <label className="mb-3 flex cursor-pointer items-center gap-3 rounded-xl border p-4 hover:bg-gray-50">

                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                Cash On Delivery

              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 hover:bg-gray-50">

                <input
                  type="radio"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                Online Payment

              </label>

              {/* ====================================================== */}
              {/* Button */}
              {/* ====================================================== */}

              <button
                onClick={placeOrder}
                disabled={placingOrder}
                className="mt-8 w-full rounded-xl bg-green-600 py-4 text-lg font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >

                {placingOrder
                  ? "⏳ Placing Order..."
                  : "✅ Place Order"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}