import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    Menu,
    X,
    LayoutDashboard,
    Sprout,
    Bug,
    CloudSun,
    Droplets,
    FlaskConical,
    TrendingUp,
    ShoppingBasket,
    Newspaper,
    Landmark,
} from "lucide-react";

import LanguageSelector from "./LanguageSelector";

export default function Sidebar() {

    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    // ======================================================
    // Sidebar Menu
    // ======================================================

    const menuItems = [

        {
            icon: LayoutDashboard,
            label: t("dashboard"),
        },

        {
            icon: Sprout,
            label: t("cropRecommendation"),
        },

        {
            icon: Bug,
            label: t("diseaseDetection"),
        },

        {
            icon: CloudSun,
            label: t("weather"),
        },

        {
            icon: Droplets,
            label: t("smartIrrigation"),
        },

        {
            icon: FlaskConical,
            label: t("fertilizerRecommendation"),
        },

        {
            icon: TrendingUp,
            label: t("marketPrediction"),
        },

        {
            icon: ShoppingBasket,
            label: "Farmer Marketplace",
        },

        {
            icon: Newspaper,
            label: t("news"),
        },

        {
            icon: Landmark,
            label: t("schemes"),
        },

    ];

    return (

        <>

            {/* ======================================================
                Sidebar Toggle Button
            ====================================================== */}

            <button
                onClick={() => setOpen(true)}
                className="fixed top-5 left-5 z-50 rounded-xl bg-green-600 p-3 text-white shadow-lg transition hover:bg-green-700"
            >
                <Menu size={24} />
            </button>

            {/* ======================================================
                Sidebar
            ====================================================== */}

            <aside
                className={`fixed top-0 left-0 z-50 h-screen bg-gradient-to-b from-green-600 to-sky-500 text-white shadow-2xl transition-all duration-300 ${
                    open ? "w-72" : "w-0 overflow-hidden"
                }`}
            >

                {/* ==================================================
                    Header
                ================================================== */}

                <div className="flex items-center justify-between p-5">

                    <h1 className="text-2xl font-bold">

                        🌾 AgriGenAI

                    </h1>

                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-lg p-2 hover:bg-white/20"
                    >

                        <X size={22} />

                    </button>

                </div>

                {/* ==================================================
                    Menu
                ================================================== */}

                <nav className="mt-8 space-y-2 px-3">

                    {menuItems.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <button
                                key={index}
                                className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-white/20"
                            >

                                <Icon size={22} />

                                <span className="font-medium">

                                    {item.label}

                                </span>

                            </button>

                        );

                    })}

                </nav>

                {/* ==================================================
                    Language Selector
                ================================================== */}

                <div className="mt-10 px-5">

                    <LanguageSelector />

                </div>

            </aside>

        </>

    );

}