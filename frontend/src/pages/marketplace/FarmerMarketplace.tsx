// ======================================================
// 🌾 AgriGenAI Farmer Marketplace
// File: src/pages/marketplace/FarmerMarketplace.tsx
// ======================================================

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import axios from "axios";

import MainLayout from "../../components/layout/MainLayout";

import {
    FiSearch,
    FiShoppingCart,
    FiShoppingBag,
    FiHeart,
    FiStar,
    FiEye,
    FiFilter,
    FiLoader,
} from "react-icons/fi";


// ======================================================
// API Configuration
// ======================================================

const API_URL =
    import.meta.env.VITE_API_URL ??
    "http://127.0.0.1:5000/api";


// ======================================================
// Marketplace Routes
// ======================================================

const ROUTES = {

    CART: "/marketplace/cart",

    ORDERS: "/marketplace/orders",

    WISHLIST: "/marketplace/wishlist",

    PRODUCT: "/marketplace/product",

    CHECKOUT: "/marketplace/checkout",

    SELLER_LOGIN: "/seller/login",

    SELLER_REGISTER: "/seller/register",

    ADMIN_LOGIN: "/marketplace/admin/login",

};


// ======================================================
// Product Interface
// ======================================================

interface Product {

    _id: string;

    product_name: string;

    category: string;

    description: string;

    price: number;

    quantity: number;

    unit: string;

    seller_name: string;

    location: string;

    image_url?: string;

    rating?: number;

}


// ======================================================
// Categories
// ======================================================

const CATEGORIES = [

    "All",

    "Vegetables",

    "Fruits",

    "Grains",

    "Seeds",

    "Fertilizers",

    "Pesticides",

    "Machinery",

    "Dairy",

    "Other",

];


// ======================================================
// Component
// ======================================================

export default function FarmerMarketplace() {

    const navigate = useNavigate();

    // ==================================================
    // State Management
    // ==================================================

    const [products, setProducts] =
        useState<Product[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [selectedCategory, setSelectedCategory] =
        useState("All");

    const [sortBy, setSortBy] =
        useState("latest");


    // ==================================================
    // Fetch Products
    // ==================================================

    const fetchProducts = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await axios.get(
                `${API_URL}/products`
            );

            const productList =
                response.data.products ?? [];

            setProducts(productList);

        }

        catch (error) {

            console.error(
                "FETCH PRODUCTS ERROR:",
                error
            );

            setError(
                "Unable to load marketplace products."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ==================================================
    // Initial Load
    // ==================================================

    useEffect(() => {

        fetchProducts();

    }, []);
        // ==================================================
    // Filter, Search & Sort Products
    // ==================================================

    const filteredProducts = useMemo(() => {

        let filtered = [...products];

        // ----------------------------------------------
        // Category Filter
        // ----------------------------------------------

        if (selectedCategory !== "All") {

            filtered = filtered.filter(

                (product) =>

                    product.category === selectedCategory

            );

        }

        // ----------------------------------------------
        // Search Filter
        // ----------------------------------------------

        const keyword = search.trim().toLowerCase();

        if (keyword) {

            filtered = filtered.filter((product) =>

                product.product_name
                    .toLowerCase()
                    .includes(keyword) ||

                product.category
                    .toLowerCase()
                    .includes(keyword) ||

                product.seller_name
                    .toLowerCase()
                    .includes(keyword) ||

                product.location
                    .toLowerCase()
                    .includes(keyword)

            );

        }

        // ----------------------------------------------
        // Sorting
        // ----------------------------------------------

        switch (sortBy) {

            case "priceLow":

                filtered.sort(
                    (a, b) => a.price - b.price
                );

                break;

            case "priceHigh":

                filtered.sort(
                    (a, b) => b.price - a.price
                );

                break;

            case "name":

                filtered.sort(
                    (a, b) =>
                        a.product_name.localeCompare(
                            b.product_name
                        )
                );

                break;

            case "latest":

            default:

                break;

        }

        return filtered;

    }, [

        products,

        search,

        selectedCategory,

        sortBy,

    ]);
        // ==================================================
    // Add To Cart (Local Storage)
    // ==================================================

    const addToCart = (product: Product) => {

        if (product.quantity <= 0) {

            alert("Product is out of stock.");

            return;

        }

        const cart = JSON.parse(

            localStorage.getItem("cart") || "[]"

        );

        const existingProduct = cart.find(

            (item: any) => item._id === product._id

        );

        if (existingProduct) {

            existingProduct.quantity += 1;

        }

        else {

            cart.push({

                _id: product._id,

                product_name: product.product_name,

                category: product.category,

                seller_name: product.seller_name,

                seller_id: "",

                image_url: product.image_url || "",

                price: product.price,

                quantity: 1,

                unit: product.unit,

            });

        }

        localStorage.setItem(

            "cart",

            JSON.stringify(cart)

        );

        alert("Product added to cart.");

    };


    // ==================================================
    // Add To Wishlist (Local Storage)
    // ==================================================

    const addToWishlist = (product: Product) => {

        const wishlist = JSON.parse(

            localStorage.getItem("wishlist") || "[]"

        );

        const exists = wishlist.find(

            (item: any) => item._id === product._id

        );

        if (exists) {

            alert("Product already exists in wishlist.");

            return;

        }

        wishlist.push({

            _id: product._id,

            product_name: product.product_name,

            category: product.category,

            seller_name: product.seller_name,

            image_url: product.image_url || "",

            price: product.price,

            quantity: product.quantity,

            unit: product.unit,

            location: product.location,

        });

        localStorage.setItem(

            "wishlist",

            JSON.stringify(wishlist)

        );

        alert("Product added to wishlist.");

    };


    // ==================================================
    // View Product Details
    // ==================================================

    const viewProduct = (

        productId: string

    ) => {

        navigate(

            `${ROUTES.PRODUCT}/${productId}`

        );

    };


    // ==================================================
    // Buy Now
    // ==================================================

    const buyNow = (

        product: Product

    ) => {

        addToCart(product);

        navigate(

            ROUTES.CHECKOUT

        );

    };
        // ==================================================
    // Loading Screen
    // ==================================================

    if (loading) {

        return (

            <MainLayout>

                <div className="flex min-h-screen items-center justify-center bg-gray-50">

                    <div className="text-center">

                        <FiLoader
                            size={60}
                            className="mx-auto animate-spin text-green-600"
                        />

                        <h2 className="mt-6 text-2xl font-bold text-gray-700">

                            Loading Marketplace...

                        </h2>

                        <p className="mt-2 text-gray-500">

                            Fetching fresh products for you.

                        </p>

                    </div>

                </div>

            </MainLayout>

        );

    }


    // ==================================================
    // Error Screen
    // ==================================================

    if (error) {

        return (

            <MainLayout>

                <div className="flex min-h-screen items-center justify-center bg-gray-50">

                    <div className="rounded-3xl bg-white p-10 text-center shadow-xl">

                        <h2 className="text-3xl font-bold text-red-600">

                            {error}

                        </h2>

                        <button

                            onClick={fetchProducts}

                            className="mt-6 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"

                        >

                            Retry

                        </button>

                    </div>

                </div>

            </MainLayout>

        );

    }


    // ==================================================
    // Main Layout
    // ==================================================

    return (

        <MainLayout>

            <div className="min-h-screen bg-slate-50">

                {/* ==========================================
                    Header
                ========================================== */}
                                <header className="sticky top-0 z-50 bg-white shadow-md">

                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                        {/* ======================================
                            Logo
                        ====================================== */}

                        <div>

                            <h1 className="text-3xl font-bold text-green-700">

                                🌾 Agri Marketplace

                            </h1>

                            <p className="text-sm text-gray-500">

                                Fresh products directly from farmers

                            </p>

                        </div>


                        {/* ======================================
                            Search Bar
                        ====================================== */}

                        <div className="relative hidden w-full max-w-xl lg:block">

                            <FiSearch
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products, categories or farmers..."
                                className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-12 pr-5 outline-none transition focus:border-green-500 focus:bg-white"
                            />

                        </div>


                        {/* ======================================
                            Navigation
                        ====================================== */}

                        <div className="flex items-center gap-3">

                            {/* Wishlist */}

                            <button
                                onClick={() => navigate(ROUTES.WISHLIST)}
                                className="rounded-xl bg-red-50 p-3 text-red-600 transition hover:bg-red-100"
                            >

                                <FiHeart size={20} />

                            </button>

                            {/* Cart */}

                            <button
                                onClick={() => navigate(ROUTES.CART)}
                                className="rounded-xl bg-green-50 p-3 text-green-700 transition hover:bg-green-100"
                            >

                                <FiShoppingCart size={20} />

                            </button>

                            {/* Orders */}

                            <button
                                onClick={() => navigate(ROUTES.ORDERS)}
                                className="rounded-xl bg-blue-50 p-3 text-blue-700 transition hover:bg-blue-100"
                            >

                                <FiShoppingBag size={20} />

                            </button>

                        </div>

                    </div>

                </header>
                                {/* ==================================================
                    Hero Section
                ================================================== */}

                <section className="mx-auto max-w-7xl px-6 py-6">

                    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-pink-400 to-rose-400 p-10 text-white shadow-2xl">

                        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

                            {/* Left Content */}

                            <div>

                                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">

                                    🌱 AI Powered Marketplace

                                </span>

                                <h2 className="mt-6 text-5xl font-extrabold">

                                    Buy Fresh Farm Products

                                </h2>

                                <p className="mt-5 max-w-xl text-lg leading-8 text-pink-100">

                                    Connect directly with trusted farmers,
                                    compare prices, and purchase fresh
                                    agricultural products with confidence.

                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">

                                    <button
                                        onClick={() =>
                                            navigate(
                                                ROUTES.SELLER_REGISTER
                                            )
                                        }
                                        className="rounded-xl bg-white px-6 py-3 font-bold text-pink-600 transition hover:bg-pink-100"
                                    >

                                        🌱 Become Seller

                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                ROUTES.ADMIN_LOGIN
                                            )
                                        }
                                        className="rounded-xl bg-black px-6 py-3 font-bold text-white transition hover:bg-gray-800"
                                    >

                                        🛡 Admin Login

                                    </button>

                                </div>

                            </div>

                            {/* Right Statistics */}

                            <div className="grid grid-cols-2 gap-5">

                                <div className="rounded-2xl bg-white/20 p-6 text-center">

                                    <h3 className="text-4xl font-bold">

                                        {products.length}

                                    </h3>

                                    <p className="mt-2">

                                        Products

                                    </p>

                                </div>

                                <div className="rounded-2xl bg-white/20 p-6 text-center">

                                    <h3 className="text-4xl font-bold">

                                        {CATEGORIES.length - 1}

                                    </h3>

                                    <p className="mt-2">

                                        Categories

                                    </p>

                                </div>

                                <div className="rounded-2xl bg-white/20 p-6 text-center">

                                    <h3 className="text-4xl font-bold">

                                        500+

                                    </h3>

                                    <p className="mt-2">

                                        Farmers

                                    </p>

                                </div>

                                <div className="rounded-2xl bg-white/20 p-6 text-center">

                                    <h3 className="text-4xl font-bold">

                                        24/7

                                    </h3>

                                    <p className="mt-2">

                                        Support

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ==================================================
                    Category & Filter Section
                ================================================== */}

                <section className="mx-auto max-w-7xl px-6 pb-8">

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        {/* Categories */}

                        <div className="flex flex-wrap gap-3">

                            {CATEGORIES.map((category) => (

                                <button
                                    key={category}
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                    className={`rounded-xl px-5 py-3 font-semibold transition-all duration-300 ${
                                        selectedCategory === category
                                            ? "bg-pink-500 text-white shadow-lg"
                                            : "bg-white text-gray-700 shadow hover:bg-pink-50"
                                    }`}
                                >

                                    {category}

                                </button>

                            ))}

                        </div>

                        {/* Sort */}

                        <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 shadow">

                            <FiFilter className="text-pink-500" />

                            <select
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(e.target.value)
                                }
                                className="bg-transparent outline-none"
                            >

                                <option value="latest">

                                    Latest

                                </option>

                                <option value="priceLow">

                                    Price : Low to High

                                </option>

                                <option value="priceHigh">

                                    Price : High to Low

                                </option>

                                <option value="name">

                                    Product Name

                                </option>

                            </select>

                        </div>

                    </div>

                </section>
                                {/* ==================================================
                    Products Section
                ================================================== */}

                <section className="mx-auto max-w-7xl px-6 pb-16">

                    {filteredProducts.length === 0 ? (

                        <div className="rounded-3xl bg-white p-16 text-center shadow-xl">

                            <h2 className="text-3xl font-bold text-gray-700">

                                No Products Found

                            </h2>

                            <p className="mt-3 text-gray-500">

                                Try another category or search keyword.

                            </p>

                        </div>

                    ) : (

                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                            {filteredProducts.map((product) => (

                                <div
                                    key={product._id}
                                    className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                >

                                    {/* Product Image */}

                                    <div className="relative">

                                        <img
                                            src={
                                                product.image_url ||
                                                "https://placehold.co/600x400?text=No+Image"
                                            }
                                            alt={product.product_name}
                                            className="h-60 w-full object-cover"
                                        />

                                        {/* Wishlist */}

                                        <button
                                            onClick={() => addToWishlist(product)}
                                            className="absolute right-4 top-4 rounded-full bg-white p-3 shadow-lg transition hover:bg-pink-50"
                                        >

                                            <FiHeart className="text-pink-500" />

                                        </button>

                                        {/* Badge */}

                                        <span className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">

                                            Fresh

                                        </span>

                                    </div>

                                    {/* Product Details */}

                                    <div className="space-y-4 p-6">

                                        {/* Category & Rating */}

                                        <div className="flex items-center justify-between">

                                            <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">

                                                {product.category}

                                            </span>

                                            <div className="flex items-center gap-1">

                                                <FiStar className="fill-yellow-400 text-yellow-400" />

                                                <span>

                                                    {product.rating ?? 4.8}

                                                </span>

                                            </div>

                                        </div>

                                        {/* Product Name */}

                                        <h2
                                            onClick={() => viewProduct(product._id)}
                                            className="cursor-pointer text-2xl font-bold text-gray-800 transition hover:text-pink-600"
                                        >

                                            {product.product_name}

                                        </h2>

                                        {/* Description */}

                                        <p className="line-clamp-2 text-gray-500">

                                            {product.description}

                                        </p>

                                        {/* Seller */}

                                        <div className="rounded-xl bg-gray-50 p-4">

                                            <p className="font-semibold text-gray-700">

                                                👨‍🌾 {product.seller_name}

                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">

                                                📍 {product.location}

                                            </p>

                                        </div>

                                        {/* Price */}

                                        <div className="flex items-center justify-between">

                                            <div>

                                                <h3 className="text-3xl font-bold text-green-700">

                                                    ₹{product.price}

                                                </h3>

                                                <p className="text-sm text-gray-500">

                                                    per {product.unit}

                                                </p>

                                            </div>

                                            <span className="rounded-xl bg-green-100 px-4 py-2 font-semibold text-green-700">

                                                {product.quantity} {product.unit}

                                            </span>

                                        </div>

                                        {/* Action Buttons */}

                                        <div className="grid grid-cols-2 gap-3">

                                            <button
                                                onClick={() => addToCart(product)}
                                                disabled={product.quantity <= 0}
                                                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                                            >

                                                <FiShoppingCart size={18} />

                                                {product.quantity > 0
                                                    ? "Add Cart"
                                                    : "Out of Stock"}

                                            </button>

                                            <button
                                                onClick={() => viewProduct(product._id)}
                                                className="flex items-center justify-center gap-2 rounded-xl border border-pink-500 py-3 font-semibold text-pink-600 transition hover:bg-pink-50"
                                            >

                                                <FiEye size={18} />

                                                Details

                                            </button>

                                        </div>

                                        {/* Buy Now */}

                                        <button
                                            onClick={() => buyNow(product)}
                                            disabled={product.quantity <= 0}
                                            className="mt-4 w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 text-lg font-bold text-white transition hover:from-pink-600 hover:to-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
                                        >

                                            ⚡ Buy Now

                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>
                                {/* ==================================================
                    Footer
                ================================================== */}

                <footer className="mt-10 bg-gradient-to-r from-green-700 to-emerald-600 text-white">

                    <div className="mx-auto max-w-7xl px-6 py-12">

                        <div className="grid gap-10 md:grid-cols-4">

                            {/* About */}

                            <div>

                                <h2 className="text-2xl font-bold">

                                    🌾 Agri Marketplace

                                </h2>

                                <p className="mt-4 leading-7 text-green-100">

                                    Buy fresh agricultural products directly
                                    from trusted farmers with secure ordering,
                                    transparent pricing, and AI-powered
                                    support.

                                </p>

                            </div>

                            {/* Marketplace */}

                            <div>

                                <h3 className="text-xl font-semibold">

                                    Marketplace

                                </h3>

                                <ul className="mt-4 space-y-3 text-green-100">

                                    <li>Browse Products</li>

                                    <li>Categories</li>

                                    <li>Top Sellers</li>

                                    <li>Special Offers</li>

                                </ul>

                            </div>

                            {/* Seller */}

                            <div>

                                <h3 className="text-xl font-semibold">

                                    Seller Portal

                                </h3>

                                <ul className="mt-4 space-y-3 text-green-100">

                                    <li
                                        className="cursor-pointer hover:text-white"
                                        onClick={() => navigate(ROUTES.SELLER_REGISTER)}
                                    >
                                        Become Seller
                                    </li>

                                    <li
                                        className="cursor-pointer hover:text-white"
                                        onClick={() => navigate(ROUTES.SELLER_LOGIN)}
                                    >
                                        Seller Login
                                    </li>

                                    <li>Manage Products</li>

                                    <li>Track Orders</li>

                                </ul>

                            </div>

                            {/* Contact */}

                            <div>

                                <h3 className="text-xl font-semibold">

                                    Contact Us

                                </h3>

                                <p className="mt-4 text-green-100">

                                    📧 support@agrigenai.com

                                </p>

                                <p className="mt-2 text-green-100">

                                    📞 +91 98765 43210

                                </p>

                                <p className="mt-2 text-green-100">

                                    🌐 24 × 7 Customer Support

                                </p>

                            </div>

                        </div>

                        {/* Copyright */}

                        <div className="mt-10 border-t border-green-500 pt-6 text-center">

                            <p className="text-green-100">

                                © 2026 AgriGenAI • AI Powered Farmer Marketplace •
                                All Rights Reserved.

                            </p>

                        </div>

                    </div>

                </footer>

            </div>

        </MainLayout>

    );

}