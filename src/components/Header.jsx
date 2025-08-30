// src/components/Header.jsx
import React, { useState } from "react";
import { FiMenu, FiDownload, FiFileText, FiSun, FiMoon } from "react-icons/fi";

export default function Header({ onHamburger, onToggleDark, darkMode }) {
  const [exportingPPT, setExportingPPT] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);

  const handlePPT = async () => {
    setExportingPPT(true);
    await new Promise((r) => setTimeout(r, 1000)); // mock delay
    setExportingPPT(false);
  };

  const handlePDF = async () => {
    setExportingPDF(true);
    await new Promise((r) => setTimeout(r, 1000)); // mock delay
    setExportingPDF(false);
  };

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white dark:bg-gray-800 shadow-md">
      {/* Left side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Hamburger */}
        <button
          onClick={onHamburger}
          className="lg:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <FiMenu className="text-gray-700 dark:text-gray-200" size={20} />
        </button>

        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[150px] sm:max-w-none">
          Smart PMO Copilot
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDark}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title="Toggle dark mode"
        >
          {darkMode ? (
            <FiSun className="text-yellow-400" size={18} />
          ) : (
            <FiMoon className="text-gray-700 dark:text-gray-200" size={18} />
          )}
        </button>

        {/* Export PPT */}
        <button
          onClick={handlePPT}
          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-gray-700 text-white text-xs sm:text-sm rounded shadow hover:bg-gray-600 transition"
        >
          <FiDownload />
          <span className="hidden sm:inline">
            {exportingPPT ? "Exporting..." : "Export PPT"}
          </span>
        </button>

        {/* Export PDF */}
        <button
          onClick={handlePDF}
          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-xs sm:text-sm rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          <FiFileText />
          <span className="hidden sm:inline">
            {exportingPDF ? "Generating..." : "PDF"}
          </span>
        </button>
      </div>
    </header>
  );
}
