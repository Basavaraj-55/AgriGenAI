import { useState } from "react";
import type { ReactNode } from "react";

import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({
  children,
}: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Content */}
      <main
        className={`
          flex-1
          min-h-screen
          transition-all
          duration-300
          ease-in-out
          ${collapsed ? "ml-24" : "ml-72"}
        `}
      >
        <div className="w-full min-h-screen p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}