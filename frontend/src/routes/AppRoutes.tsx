// ======================================================
// 🌾 AgriGenAI - Application Routes
// File: src/routes/AppRoutes.tsx
// ======================================================

import {

  BrowserRouter,

  Routes,

  Route,

} from "react-router-dom";

// ======================================================
// Route Protection
// ======================================================

import ProtectedAdminRoute from "./ProtectedAdminRoute";

// TODO:
// import ProtectedSellerRoute from "./ProtectedSellerRoute";
// import ProtectedUserRoute from "./ProtectedUserRoute";

// ======================================================
// Public Pages
// ======================================================

import Home from "../pages/Home";

import NewsAndSchemes from "../pages/news/NewsAndSchemes";

// ======================================================
// Authentication
// ======================================================

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import SellerLogin from "../pages/auth/SellerLogin";
import SellerRegister from "../pages/auth/SellerRegister";

import AdminLogin from "../pages/auth/AdminLogin";

// ======================================================
// Dashboard
// ======================================================

import Dashboard from "../pages/dashboard/Dashboard";

// ======================================================
// AI Modules
// ======================================================

import CropRecommendation from "../pages/crop/CropRecommendation";

import DiseaseDetection from "../pages/disease/DiseaseDetection";

import FertilizerRecommendation from "../pages/fertilizer/FertilizerRecommendation";

import WeatherForecast from "../pages/weather/WeatherForecast";

import SmartIrrigation from "../pages/irrigation/SmartIrrigation";

import MarketPrediction from "../pages/market/MarketPrediction";

import FarmerAssistant from "../pages/chatbot/FarmerAssistant";

// ======================================================
// Marketplace - Public
// ======================================================

import FarmerMarketplace from "../pages/marketplace/FarmerMarketplace";

import CategoryProducts from "../pages/marketplace/CategoryProducts";

import ProductDetails from "../pages/marketplace/Products/ProductDetails";

import ProductGallery from "../pages/marketplace/Products/ProductGallery";

// ======================================================
// Marketplace - Buyer
// ======================================================

import Cart from "../pages/marketplace/Buyer/Cart";

import Checkout from "../pages/marketplace/Buyer/Checkout";

import OrderSuccess from "../pages/marketplace/Buyer/OrderSuccess";

import Orders from "../pages/marketplace/Buyer/Orders";

import Wishlist from "../pages/marketplace/Buyer/Wishlist";

// ======================================================
// Marketplace - Seller
// ======================================================

import SellerDashboard from "../pages/marketplace/Seller/SellerDashboard";

import AddProduct from "../pages/marketplace/Seller/AddProduct";

import EditProduct from "../pages/marketplace/Seller/EditProduct";

import MyProducts from "../pages/marketplace/Seller/MyProducts";

import SellerOrders from "../pages/marketplace/Seller/SellerOrders";

import SellerProfile from "../pages/marketplace/Seller/SellerProfile";

// ======================================================
// Marketplace - Admin
// ======================================================

import AdminDashboard from "../pages/marketplace/Admin/AdminDashboard";

import Users from "../pages/marketplace/Admin/Users";

import Sellers from "../pages/marketplace/Admin/Sellers";

import Products from "../pages/marketplace/Admin/Products";

import AdminOrders from "../pages/marketplace/Admin/Orders";

import Categories from "../pages/marketplace/Admin/Categories";

import Reports from "../pages/marketplace/Admin/Reports";

import Settings from "../pages/marketplace/Admin/Settings";

// ======================================================
// Component
// ======================================================

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>
                {/* ======================================================
            Public Routes
        ====================================================== */}

        <Route

          path="/"

          element={<Home />}

        />

        <Route

          path="/news"

          element={<NewsAndSchemes />}

        />

        {/* ======================================================
            Authentication Routes
        ====================================================== */}

        {/* User */}

        <Route

          path="/login"

          element={<Login />}

        />

        <Route

          path="/register"

          element={<Register />}

        />

        {/* Seller */}

        <Route

          path="/seller/login"

          element={<SellerLogin />}

        />

        <Route

          path="/seller/register"

          element={<SellerRegister />}

        />

        {/* Admin */}

        <Route

          path="/marketplace/admin/login"

          element={<AdminLogin />}

        />

        {/* ======================================================
            User Dashboard
        ====================================================== */}

        <Route

          path="/dashboard"

          element={<Dashboard />}

        />
                {/* ======================================================
            AI Modules
        ====================================================== */}

        <Route

          path="/crop"

          element={<CropRecommendation />}

        />

        <Route

          path="/disease"

          element={<DiseaseDetection />}

        />

        <Route

          path="/fertilizer"

          element={<FertilizerRecommendation />}

        />

        <Route

          path="/weather"

          element={<WeatherForecast />}

        />

        <Route

          path="/irrigation"

          element={<SmartIrrigation />}

        />

        <Route

          path="/market"

          element={<MarketPrediction />}

        />

        <Route

          path="/chatbot"

          element={<FarmerAssistant />}

        />

        {/* ======================================================
            Marketplace - Public Routes
        ====================================================== */}

        <Route

          path="/marketplace"

          element={<FarmerMarketplace />}

        />

        <Route

          path="/marketplace/category/:category"

          element={<CategoryProducts />}

        />

        {/* ======================================================
            Product Routes
        ====================================================== */}

        <Route

          path="/marketplace/product/:id"

          element={<ProductDetails />}

        />

        <Route

          path="/marketplace/gallery"

          element={<ProductGallery />}

        />
                {/* ======================================================
            Marketplace - Buyer Routes
        ====================================================== */}

        <Route

          path="/marketplace/cart"

          element={
            // <ProtectedUserRoute>
            <Cart />
            // </ProtectedUserRoute>
          }

        />

        <Route

          path="/marketplace/checkout"

          element={
            // <ProtectedUserRoute>
            <Checkout />
            // </ProtectedUserRoute>
          }

        />

        <Route

          path="/marketplace/order-success"

          element={
            // <ProtectedUserRoute>
            <OrderSuccess />
            // </ProtectedUserRoute>
          }

        />

        <Route

          path="/marketplace/orders"

          element={
            // <ProtectedUserRoute>
            <Orders />
            // </ProtectedUserRoute>
          }

        />

        <Route

          path="/marketplace/wishlist"

          element={
            // <ProtectedUserRoute>
            <Wishlist />
            // </ProtectedUserRoute>
          }

        />
                {/* ======================================================
            Marketplace - Seller Routes
        ====================================================== */}

        <Route

          path="/marketplace/seller/dashboard"

          element={
            // <ProtectedSellerRoute>
            <SellerDashboard />
            // </ProtectedSellerRoute>
          }

        />

        <Route

          path="/marketplace/seller/add-product"

          element={
            // <ProtectedSellerRoute>
            <AddProduct />
            // </ProtectedSellerRoute>
          }

        />

        <Route

          path="/marketplace/seller/edit-product/:id"

          element={
            // <ProtectedSellerRoute>
            <EditProduct />
            // </ProtectedSellerRoute>
          }

        />

        <Route

          path="/marketplace/seller/my-products"

          element={
            // <ProtectedSellerRoute>
            <MyProducts />
            // </ProtectedSellerRoute>
          }

        />

        <Route

          path="/marketplace/seller/orders"

          element={
            // <ProtectedSellerRoute>
            <SellerOrders />
            // </ProtectedSellerRoute>
          }

        />

        <Route

          path="/marketplace/seller/profile"

          element={
            // <ProtectedSellerRoute>
            <SellerProfile />
            // </ProtectedSellerRoute>
          }

        />

        {/* ======================================================
            Marketplace - Admin Routes
        ====================================================== */}

        <Route

          path="/marketplace/admin/dashboard"

          element={

            <ProtectedAdminRoute>

              <AdminDashboard />

            </ProtectedAdminRoute>

          }

        />

        <Route

          path="/marketplace/admin/users"

          element={

            <ProtectedAdminRoute>

              <Users />

            </ProtectedAdminRoute>

          }

        />

        <Route

          path="/marketplace/admin/sellers"

          element={

            <ProtectedAdminRoute>

              <Sellers />

            </ProtectedAdminRoute>

          }

        />

        <Route

          path="/marketplace/admin/products"

          element={

            <ProtectedAdminRoute>

              <Products />

            </ProtectedAdminRoute>

          }

        />

        <Route

          path="/marketplace/admin/orders"

          element={

            <ProtectedAdminRoute>

              <AdminOrders />

            </ProtectedAdminRoute>

          }

        />

        <Route

          path="/marketplace/admin/categories"

          element={

            <ProtectedAdminRoute>

              <Categories />

            </ProtectedAdminRoute>

          }

        />

        <Route

          path="/marketplace/admin/reports"

          element={

            <ProtectedAdminRoute>

              <Reports />

            </ProtectedAdminRoute>

          }

        />

        <Route

          path="/marketplace/admin/settings"

          element={

            <ProtectedAdminRoute>

              <Settings />

            </ProtectedAdminRoute>

          }

        />
                {/* ======================================================
            404 - Page Not Found
        ====================================================== */}

        <Route

          path="*"

          element={

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-green-100 p-6">

              <div className="w-full max-w-xl rounded-3xl bg-white p-12 text-center shadow-2xl">

                <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-green-100">

                  <span className="text-6xl">

                    🌾

                  </span>

                </div>

                <h1 className="text-7xl font-extrabold text-green-700">

                  404

                </h1>

                <h2 className="mt-4 text-3xl font-bold text-gray-800">

                  Page Not Found

                </h2>

                <p className="mt-4 leading-7 text-gray-500">

                  The page you are trying to access doesn't exist
                  or has been moved.

                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                  <button

                    onClick={() =>

                      window.location.href = "/"

                    }

                    className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"

                  >

                    Go Home

                  </button>

                  <button

                    onClick={() =>

                      window.history.back()

                    }

                    className="rounded-xl border border-gray-300 px-8 py-3 font-semibold transition hover:bg-gray-100"

                  >

                    Go Back

                  </button>

                </div>

              </div>

            </div>

          }

        />

      </Routes>

    </BrowserRouter>

  );

}