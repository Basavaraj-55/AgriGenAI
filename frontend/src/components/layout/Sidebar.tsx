import type {
  Dispatch,
  SetStateAction,
  ElementType,
} from "react";

import {
  Menu,
  ChevronLeft,
  LayoutDashboard,
  Sprout,
  CloudSun,
  Droplets,
  FlaskConical,
  Bug,
  TrendingUp,
  Bot,
  ShoppingCart,
  Newspaper,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

interface MenuItem {
  title: string;
  icon: ElementType;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Crop Recommendation",
    icon: Sprout,
    path: "/crop",
  },
  {
    title: "Disease Detection",
    icon: Bug,
    path: "/disease",
  },
  {
    title: "Fertilizer",
    icon: FlaskConical,
    path: "/fertilizer",
  },
  {
    title: "Weather",
    icon: CloudSun,
    path: "/weather",
  },
  {
    title: "Smart Irrigation",
    icon: Droplets,
    path: "/irrigation",
  },
  {
    title: "Market Prediction",
    icon: TrendingUp,
    path: "/market",
  },
  {
    title: "AI Chatbot",
    icon: Bot,
    path: "/chatbot",
  },
  
    {
    title: "Farmer Marketplace",
    icon: ShoppingCart,
    path: "/marketplace",
},
  
  {
    title: "News & Schemes",
    icon: Newspaper,
    path: "/news",
  },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        z-50
        flex
        h-screen
        flex-col
        bg-gradient-to-b
        from-green-700
        via-green-600
        to-sky-600
        shadow-2xl
        transition-all
        duration-300
        ${collapsed ? "w-24" : "w-72"}
      `}
    >
      {/* Header */}
      <div className="flex h-20 items-center justify-between border-b border-white/20 px-5">
        {!collapsed && (
          <div>
            <h1 className="text-2xl font-bold text-white">
              🌾 AgriGenAI
            </h1>

            <p className="text-xs text-green-100">
              Smart Agriculture Platform
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg bg-white/20 p-2 text-white transition hover:bg-white/30"
        >
          {collapsed ? (
            <Menu size={22} />
          ) : (
            <ChevronLeft size={22} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-5 flex-1 space-y-2 overflow-y-auto px-3">
                {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.title}
              to={item.path}
              className={`
                group
                flex
                items-center
                rounded-xl
                px-4
                py-3
                transition-all
                duration-300
                ${
                  isActive
                    ? "bg-white text-green-700 shadow-lg"
                    : "text-white hover:bg-white/20 hover:translate-x-1"
                }
              `}
            >
              <Icon
                size={22}
                className={`flex-shrink-0 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                } transition-transform duration-300`}
              />

              {!collapsed && (
                <span className="ml-4 text-sm font-semibold">
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/20 p-4">
        {!collapsed ? (
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  🌾 AgriGenAI
                </h3>

                <p className="text-xs text-green-100">
                  AI Powered Farming
                </p>
              </div>

              <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white">
                Version 2.0
              </span>

              <span className="text-xs font-semibold text-green-200">
                LIVE
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className="h-4 w-4 rounded-full bg-green-400 animate-pulse"
              title="System Online"
            />
          </div>
        )}
      </div>
    </aside>
  );
}