// src/components/Layout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile drawer
  const [collapsed, setCollapsed] = useState(false);     // for desktop collapse
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const toggleDark = () => {
    localStorage.setItem("darkMode", String(!darkMode));
    setDarkMode((d) => !d);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-30 bg-gray-900 text-white transition-all duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            w-64
            lg:translate-x-0
            ${collapsed ? "lg:w-20" : "lg:w-64"}
          `}
        >
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div
          className={`
            flex-1 flex flex-col overflow-hidden transition-all duration-300
            ml-0
            ${collapsed ? "lg:ml-24" : "lg:ml-64"}
          `}
        >
          <Header
            onHamburger={() => setSidebarOpen((o) => !o)}
            onToggleDark={toggleDark}
            darkMode={darkMode}
          />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
