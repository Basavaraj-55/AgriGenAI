// ======================================================
// 🌾 AgriGenAI Home Page
// File: src/pages/Home.tsx
// Part 1 - Navbar & Hero Section
// ======================================================

import { Link } from "react-router-dom";

import {
    ArrowRight,
    Leaf,
    Sparkles,
    ShoppingCart,
} from "lucide-react";

export default function Home() {

    return (

        <div className="min-h-screen overflow-x-hidden bg-[#F6FFF8]">

            {/* ==================================================
                Navigation Bar
            ================================================== */}

            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-green-100 bg-white/80 backdrop-blur-xl">

                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                    {/* Logo */}

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg">

                            <Leaf size={26} />

                        </div>

                        <div>

                            <h1 className="text-2xl font-extrabold text-green-700">

                                AgriGenAI

                            </h1>

                            <p className="text-xs text-gray-500">

                                AI Powered Smart Agriculture

                            </p>

                        </div>

                    </div>

                    {/* Navigation */}

                    <div className="hidden items-center gap-10 font-medium text-gray-700 lg:flex">

                        <a href="#services" className="hover:text-green-600">

                            Services

                        </a>

                        <a href="#marketplace" className="hover:text-green-600">

                            Marketplace

                        </a>

                        <a href="#about" className="hover:text-green-600">

                            About

                        </a>

                        <a href="#contact" className="hover:text-green-600">

                            Contact

                        </a>

                    </div>

                    {/* Buttons */}

                    <div className="flex items-center gap-3">

                        <Link
                            to="/login"
                            className="rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
                        >

                            Login

                        </Link>

                        <Link
                            to="/register"
                            className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
                        >

                            Register

                        </Link>

                    </div>

                </div>

            </nav>

            {/* ==================================================
                Hero Section
            ================================================== */}

            <section className="relative overflow-hidden pt-40">

                {/* Background Effects */}

                <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-green-300/30 blur-3xl" />

                <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

                <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

                    {/* Left Side */}

                    <div>

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-green-700">

                            <Sparkles size={18} />

                            AI Powered Agriculture Platform

                        </div>

                        <h1 className="text-5xl font-extrabold leading-tight text-gray-900 lg:text-7xl">

                            Smart Farming

                            <span className="block bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">

                                Powered by AI

                            </span>

                        </h1>

                        <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">

                            Empowering farmers with Artificial Intelligence,
                            Machine Learning and Real-Time Analytics to improve
                            productivity, reduce risks and maximize profits.

                        </p>

                        {/* CTA Buttons */}

                        <div className="mt-10 flex flex-wrap gap-5">

                            <Link
                                to="/register"
                                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-4 font-bold text-white shadow-xl transition hover:scale-105"
                            >

                                Get Started

                                <ArrowRight size={20} />

                            </Link>

                            <Link
                                to="/marketplace"
                                className="flex items-center gap-2 rounded-xl border border-green-600 bg-white px-8 py-4 font-bold text-green-700 transition hover:bg-green-50"
                            >

                                <ShoppingCart size={20} />

                                Marketplace

                            </Link>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="relative">

                        <img
                            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900"
                            alt="Smart Farming"
                            className="rounded-[40px] shadow-2xl"
                        />

                        {/* Floating Card */}

                        <div className="absolute -bottom-8 left-10 rounded-3xl bg-white p-6 shadow-2xl">

                            <p className="text-sm text-gray-500">

                                AI Prediction Accuracy

                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-green-600">

                                98.7%

                            </h2>

                        </div>

                    </div>

                </div>

            </section>
                        {/* ==================================================
                AI Services Section
            ================================================== */}

            <section
                id="services"
                className="mx-auto mt-28 max-w-7xl px-6"
            >

                {/* Section Heading */}

                <div className="text-center">

                    <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">

                        🌾 Our AI Services

                    </span>

                    <h2 className="mt-6 text-5xl font-extrabold text-gray-900">

                        Smart Agriculture Solutions

                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">

                        AgriGenAI combines Artificial Intelligence,
                        Machine Learning and Data Analytics to help
                        farmers make faster, smarter and more
                        profitable farming decisions.

                    </p>

                </div>

                {/* Service Cards */}

                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {/* Crop */}

                    <div className="group rounded-3xl border border-green-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:border-green-500 hover:shadow-2xl">

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-100 text-5xl">

                            🌱

                        </div>

                        <h3 className="mt-6 text-2xl font-bold text-gray-800">

                            Crop Recommendation

                        </h3>

                        <p className="mt-4 leading-7 text-gray-600">

                            AI recommends the most suitable crop using
                            soil nutrients, rainfall, humidity,
                            temperature and pH.

                        </p>

                    </div>

                    {/* Disease */}

                    <div className="group rounded-3xl border border-green-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:border-green-500 hover:shadow-2xl">

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100 text-5xl">

                            🦠

                        </div>

                        <h3 className="mt-6 text-2xl font-bold text-gray-800">

                            Disease Detection

                        </h3>

                        <p className="mt-4 leading-7 text-gray-600">

                            Upload crop images and let AI instantly
                            identify plant diseases using Deep Learning.

                        </p>

                    </div>

                    {/* Fertilizer */}

                    <div className="group rounded-3xl border border-green-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:border-green-500 hover:shadow-2xl">

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-lime-100 text-5xl">

                            🧪

                        </div>

                        <h3 className="mt-6 text-2xl font-bold text-gray-800">

                            Fertilizer Recommendation

                        </h3>

                        <p className="mt-4 leading-7 text-gray-600">

                            Smart fertilizer suggestions based on soil
                            analysis and crop nutrient requirements.

                        </p>

                    </div>

                    {/* Weather */}

                    <div className="group rounded-3xl border border-green-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:border-green-500 hover:shadow-2xl">

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-5xl">

                            🌤️

                        </div>

                        <h3 className="mt-6 text-2xl font-bold text-gray-800">

                            Weather Forecast

                        </h3>

                        <p className="mt-4 leading-7 text-gray-600">

                            Real-time weather forecasts help farmers
                            plan irrigation, harvesting and cultivation.

                        </p>

                    </div>

                    {/* Irrigation */}

                    <div className="group rounded-3xl border border-green-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:border-green-500 hover:shadow-2xl">

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-100 text-5xl">

                            💧

                        </div>

                        <h3 className="mt-6 text-2xl font-bold text-gray-800">

                            Smart Irrigation

                        </h3>

                        <p className="mt-4 leading-7 text-gray-600">

                            Optimize water usage with intelligent AI
                            irrigation recommendations.

                        </p>

                    </div>

                    {/* Market */}

                    <div className="group rounded-3xl border border-green-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:border-green-500 hover:shadow-2xl">

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-100 text-5xl">

                            📈

                        </div>

                        <h3 className="mt-6 text-2xl font-bold text-gray-800">

                            Market Prediction

                        </h3>

                        <p className="mt-4 leading-7 text-gray-600">

                            Predict crop prices using Machine Learning
                            to maximize profits before selling.

                        </p>

                    </div>

                    {/* AI Chatbot */}

                    <div className="group rounded-3xl border border-green-100 bg-gradient-to-r from-green-600 to-emerald-500 p-8 text-white shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">

                        <div className="text-5xl">

                            🤖

                        </div>

                        <h3 className="mt-6 text-2xl font-bold">

                            AI Chatbot

                        </h3>

                        <p className="mt-4 leading-7 text-green-100">

                            Ask agriculture questions and receive
                            intelligent AI-powered answers instantly.

                        </p>

                    </div>

                    {/* Marketplace */}

                    <div className="group rounded-3xl border border-green-100 bg-gradient-to-r from-orange-500 to-yellow-500 p-8 text-white shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">

                        <div className="text-5xl">

                            🛒

                        </div>

                        <h3 className="mt-6 text-2xl font-bold">

                            Farmer Marketplace

                        </h3>

                        <p className="mt-4 leading-7 text-orange-100">

                            Buy and sell fresh agricultural products
                            directly from trusted farmers.

                        </p>

                    </div>

                    {/* News */}

                    <div className="group rounded-3xl border border-green-100 bg-gradient-to-r from-sky-500 to-blue-600 p-8 text-white shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">

                        <div className="text-5xl">

                            📰

                        </div>

                        <h3 className="mt-6 text-2xl font-bold">

                            News & Schemes

                        </h3>

                        <p className="mt-4 leading-7 text-sky-100">

                            Stay updated with agriculture news,
                            government schemes and farming policies.

                        </p>

                    </div>

                </div>

            </section>
                        {/* ==================================================
                Farmer Marketplace
            ================================================== */}

            <section
                id="marketplace"
                className="mx-auto mt-32 max-w-7xl px-6"
            >

                <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 shadow-2xl">

                    <div className="grid items-center gap-10 lg:grid-cols-2">

                        {/* ==================================================
                            Left Content
                        ================================================== */}

                        <div className="p-10 lg:p-16">

                            <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white">

                                🌾 NEW FEATURE

                            </span>

                            <h2 className="mt-6 text-5xl font-extrabold leading-tight text-white">

                                Farmer Marketplace

                            </h2>

                            <p className="mt-6 text-lg leading-8 text-green-100">

                                Buy fresh vegetables, fruits, grains,
                                fertilizers and agricultural products
                                directly from verified farmers.

                                Sell your products online and connect
                                with thousands of buyers across India.

                            </p>

                            {/* Features */}

                            <div className="mt-10 grid gap-5 sm:grid-cols-2">

                                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-lg">

                                    <h4 className="text-lg font-bold text-white">

                                        👨‍🌾 Verified Farmers

                                    </h4>

                                    <p className="mt-2 text-green-100">

                                        Trusted sellers with quality
                                        agricultural products.

                                    </p>

                                </div>

                                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-lg">

                                    <h4 className="text-lg font-bold text-white">

                                        🚚 Fast Delivery

                                    </h4>

                                    <p className="mt-2 text-green-100">

                                        Secure order tracking and quick
                                        doorstep delivery.

                                    </p>

                                </div>

                                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-lg">

                                    <h4 className="text-lg font-bold text-white">

                                        💳 Secure Payments

                                    </h4>

                                    <p className="mt-2 text-green-100">

                                        Safe online payments with
                                        multiple payment options.

                                    </p>

                                </div>

                                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-lg">

                                    <h4 className="text-lg font-bold text-white">

                                        ⭐ Best Quality

                                    </h4>

                                    <p className="mt-2 text-green-100">

                                        Fresh products directly from farms.

                                    </p>

                                </div>

                            </div>

                            {/* Buttons */}

                            <div className="mt-10 flex flex-wrap gap-5">

                                <Link
                                    to="/marketplace"
                                    className="rounded-xl bg-white px-8 py-4 font-bold text-green-700 shadow-xl transition hover:scale-105"
                                >

                                    🛒 Explore Marketplace

                                </Link>

                                <Link
                                    to="/seller/register"
                                    className="rounded-xl border-2 border-white px-8 py-4 font-bold text-white transition hover:bg-white hover:text-green-700"
                                >

                                    🌱 Become Seller

                                </Link>

                            </div>

                        </div>

                        {/* ==================================================
                            Right Image
                        ================================================== */}

                        <div className="relative p-10">

                            <img
                                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900"
                                alt="Marketplace"
                                className="rounded-[30px] shadow-2xl"
                            />

                            {/* Floating Card */}

                            <div className="absolute bottom-6 left-6 rounded-3xl bg-white p-6 shadow-2xl">

                                <h3 className="text-4xl font-bold text-green-600">

                                    25K+

                                </h3>

                                <p className="mt-2 text-gray-600">

                                    Products Available

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
                        {/* ==================================================
                Why Choose AgriGenAI
            ================================================== */}

            <section
                id="about"
                className="mx-auto mt-32 max-w-7xl px-6"
            >

                {/* Heading */}

                <div className="text-center">

                    <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">

                        🚀 Why Choose AgriGenAI

                    </span>

                    <h2 className="mt-6 text-5xl font-extrabold text-gray-900">

                        Smarter Farming Starts Here

                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">

                        AgriGenAI combines Artificial Intelligence,
                        Machine Learning and Real-Time Analytics
                        to help farmers make better farming
                        decisions with confidence.

                    </p>

                </div>

                {/* Statistics */}

                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-500 p-8 text-center text-white shadow-2xl">

                        <h2 className="text-5xl font-extrabold">

                            98%

                        </h2>

                        <p className="mt-3 text-lg">

                            Prediction Accuracy

                        </p>

                    </div>

                    <div className="rounded-3xl bg-white p-8 text-center shadow-xl">

                        <h2 className="text-5xl font-extrabold text-green-600">

                            25K+

                        </h2>

                        <p className="mt-3 text-gray-600">

                            Farmers Connected

                        </p>

                    </div>

                    <div className="rounded-3xl bg-white p-8 text-center shadow-xl">

                        <h2 className="text-5xl font-extrabold text-green-600">

                            1M+

                        </h2>

                        <p className="mt-3 text-gray-600">

                            AI Predictions

                        </p>

                    </div>

                    <div className="rounded-3xl bg-white p-8 text-center shadow-xl">

                        <h2 className="text-5xl font-extrabold text-green-600">

                            24×7

                        </h2>

                        <p className="mt-3 text-gray-600">

                            AI Assistance

                        </p>

                    </div>

                </div>

                {/* Features */}

                <div className="mt-20 grid gap-8 lg:grid-cols-2">

                    <div className="rounded-3xl border border-green-100 bg-white p-8 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">

                        <div className="text-5xl">

                            🤖

                        </div>

                        <h3 className="mt-5 text-3xl font-bold text-gray-800">

                            AI Powered Decision Making

                        </h3>

                        <p className="mt-5 leading-8 text-gray-600">

                            Our intelligent models analyze weather,
                            soil nutrients, diseases and market trends
                            to deliver accurate recommendations
                            for every farmer.

                        </p>

                    </div>

                    <div className="rounded-3xl border border-green-100 bg-white p-8 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">

                        <div className="text-5xl">

                            🌾

                        </div>

                        <h3 className="mt-5 text-3xl font-bold text-gray-800">

                            Complete Smart Farming Platform

                        </h3>

                        <p className="mt-5 leading-8 text-gray-600">

                            From crop recommendation to marketplace,
                            AgriGenAI provides every essential
                            feature needed for modern digital farming
                            in one integrated platform.

                        </p>

                    </div>

                </div>

                {/* CTA */}

                <div className="mt-20 overflow-hidden rounded-[35px] bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 p-12 text-center shadow-2xl">

                    <h2 className="text-5xl font-extrabold text-white">

                        Ready to Transform Farming?

                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-green-100">

                        Join thousands of farmers using AI-powered
                        agriculture tools to increase productivity,
                        improve crop quality and make better decisions.

                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-5">

                        <Link
                            to="/register"
                            className="rounded-xl bg-white px-8 py-4 font-bold text-green-700 shadow-lg transition hover:scale-105"
                        >

                            🚀 Start Now

                        </Link>

                        <Link
                            to="/login"
                            className="rounded-xl border-2 border-white px-8 py-4 font-bold text-white transition hover:bg-white hover:text-green-700"
                        >

                            🔐 Login

                        </Link>

                    </div>

                </div>

            </section>
                        {/* ==================================================
                How AgriGenAI Works
            ================================================== */}

            <section className="mx-auto mt-32 max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">

                        ⚡ Simple Workflow

                    </span>

                    <h2 className="mt-6 text-5xl font-extrabold text-gray-900">

                        How AgriGenAI Works

                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">

                        Get AI-powered farming recommendations in just
                        a few simple steps.

                    </p>

                </div>

                {/* Workflow */}

                <div className="mt-20 grid gap-10 md:grid-cols-2 xl:grid-cols-4">

                    {/* Step 1 */}

                    <div className="relative rounded-3xl bg-white p-8 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">

                        <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">

                            1

                        </div>

                        <div className="mt-6 text-5xl">

                            👤

                        </div>

                        <h3 className="mt-5 text-2xl font-bold">

                            Register

                        </h3>

                        <p className="mt-4 text-gray-600 leading-7">

                            Create your AgriGenAI account and access
                            all AI farming services.

                        </p>

                    </div>

                    {/* Step 2 */}

                    <div className="relative rounded-3xl bg-white p-8 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">

                        <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">

                            2

                        </div>

                        <div className="mt-6 text-5xl">

                            🌾

                        </div>

                        <h3 className="mt-5 text-2xl font-bold">

                            Select Module

                        </h3>

                        <p className="mt-4 text-gray-600 leading-7">

                            Choose Crop Recommendation, Disease
                            Detection, Marketplace or any AI service.

                        </p>

                    </div>

                    {/* Step 3 */}

                    <div className="relative rounded-3xl bg-white p-8 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">

                        <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">

                            3

                        </div>

                        <div className="mt-6 text-5xl">

                            🤖

                        </div>

                        <h3 className="mt-5 text-2xl font-bold">

                            AI Analysis

                        </h3>

                        <p className="mt-4 text-gray-600 leading-7">

                            Our Machine Learning models process your
                            data and generate accurate predictions.

                        </p>

                    </div>

                    {/* Step 4 */}

                    <div className="relative rounded-3xl bg-white p-8 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">

                        <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">

                            4

                        </div>

                        <div className="mt-6 text-5xl">

                            📈

                        </div>

                        <h3 className="mt-5 text-2xl font-bold">

                            Grow Better

                        </h3>

                        <p className="mt-4 text-gray-600 leading-7">

                            Increase productivity, reduce risks and
                            improve profits using AI insights.

                        </p>

                    </div>

                </div>

            </section>

            {/* ==================================================
                Future Vision
            ================================================== */}

            <section className="mx-auto mt-32 max-w-7xl px-6">

                <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-gray-900 via-green-900 to-emerald-800 p-14 text-white shadow-2xl">

                    <div className="grid items-center gap-12 lg:grid-cols-2">

                        {/* Left */}

                        <div>

                            <span className="rounded-full bg-white/10 px-5 py-2">

                                🚀 Future of Agriculture

                            </span>

                            <h2 className="mt-8 text-5xl font-extrabold">

                                Building the Next Generation
                                Smart Farming Platform

                            </h2>

                            <p className="mt-6 text-lg leading-8 text-green-100">

                                AgriGenAI is designed to connect
                                Artificial Intelligence,
                                Marketplace,
                                Weather Intelligence,
                                Government Schemes,
                                and Smart Farming
                                into one unified ecosystem.

                            </p>

                        </div>

                        {/* Right */}

                        <div className="grid grid-cols-2 gap-6">

                            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-xl">

                                <h2 className="text-4xl font-bold">

                                    🌱

                                </h2>

                                <p className="mt-4">

                                    Sustainable Farming

                                </p>

                            </div>

                            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-xl">

                                <h2 className="text-4xl font-bold">

                                    🌍

                                </h2>

                                <p className="mt-4">

                                    Smart Agriculture

                                </p>

                            </div>

                            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-xl">

                                <h2 className="text-4xl font-bold">

                                    🤖

                                </h2>

                                <p className="mt-4">

                                    AI Innovation

                                </p>

                            </div>

                            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-xl">

                                <h2 className="text-4xl font-bold">

                                    🚜

                                </h2>

                                <p className="mt-4">

                                    Digital Farming

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
                        {/* ==================================================
                Final Call To Action
            ================================================== */}

            <section
                id="contact"
                className="mx-auto mt-32 max-w-7xl px-6"
            >

                <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 p-16 text-center shadow-2xl">

                    <h2 className="text-5xl font-extrabold text-white">

                        Ready to Start Smart Farming?

                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-green-100">

                        Join AgriGenAI today and experience the power of
                        Artificial Intelligence, Machine Learning and Smart
                        Agriculture for better farming decisions.

                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-5">

                        <Link
                            to="/register"
                            className="rounded-xl bg-white px-8 py-4 font-bold text-green-700 shadow-xl transition duration-300 hover:scale-105"
                        >

                            🚀 Create Account

                        </Link>

                        <Link
                            to="/login"
                            className="rounded-xl border-2 border-white px-8 py-4 font-bold text-white transition duration-300 hover:bg-white hover:text-green-700"
                        >

                            🔐 Login

                        </Link>

                    </div>

                </div>

            </section>

            {/* ==================================================
                Footer
            ================================================== */}

            <footer className="mt-32 bg-[#071A13] text-white">

                <div className="mx-auto max-w-7xl px-6 py-20">

                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                        {/* Company */}

                        <div>

                            <h2 className="text-3xl font-extrabold">

                                🌾 AgriGenAI

                            </h2>

                            <p className="mt-6 leading-8 text-green-100">

                                AI Powered Smart Agriculture Platform
                                helping farmers make better decisions
                                through Artificial Intelligence,
                                Machine Learning and Real-Time Analytics.

                            </p>

                        </div>

                        {/* AI Modules */}

                        <div>

                            <h3 className="text-2xl font-bold">

                                AI Modules

                            </h3>

                            <ul className="mt-6 space-y-3 text-green-100">

                                <li>🌱 Crop Recommendation</li>

                                <li>🦠 Disease Detection</li>

                                <li>🧪 Fertilizer Recommendation</li>

                                <li>🌤 Weather Forecast</li>

                                <li>💧 Smart Irrigation</li>

                                <li>📈 Market Prediction</li>

                            </ul>

                        </div>

                        {/* Platform */}

                        <div>

                            <h3 className="text-2xl font-bold">

                                Platform

                            </h3>

                            <ul className="mt-6 space-y-3 text-green-100">

                                <li>🛒 Farmer Marketplace</li>

                                <li>🤖 AI Chatbot</li>

                                <li>📰 News & Schemes</li>

                                <li>📊 Dashboard</li>

                                <li>👨‍🌾 Seller Portal</li>

                                <li>⚙ Settings</li>

                            </ul>

                        </div>

                        {/* Contact */}

                        <div>

                            <h3 className="text-2xl font-bold">

                                Contact

                            </h3>

                            <div className="mt-6 space-y-4 text-green-100">

                                <p>

                                    📧 support@agrigenai.com

                                </p>

                                <p>

                                    📞 +91 98765 43210

                                </p>

                                <p>

                                    🌐 www.agrigenai.com

                                </p>

                                <p>

                                    📍 Bengaluru, Karnataka

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Divider */}

                    <div className="my-12 border-t border-green-800"></div>

                    {/* Bottom Footer */}

                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

                        <p className="text-green-200">

                            © 2026 AgriGenAI. All Rights Reserved.

                        </p>

                        <div className="flex gap-6 text-green-200">

                            <a href="#">Privacy Policy</a>

                            <a href="#">Terms of Service</a>

                            <a href="#">Support</a>

                        </div>

                    </div>

                </div>

            </footer>

        </div>

    );

}

