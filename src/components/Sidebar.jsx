// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiFolder,
  FiAlertTriangle,
  FiShield,
  FiFileText,
  FiLayers,
  FiMessageCircle,
  FiX,
  FiMenu,
} from "react-icons/fi";

const items = [
  { to: "/", label: "Dashboard", icon: <FiHome /> },
  { to: "/projects", label: "Projects", icon: <FiFolder /> },
  { to: "/risks", label: "Risks", icon: <FiAlertTriangle /> },
  { to: "/compliance", label: "Compliance", icon: <FiShield /> },
  { to: "/briefings", label: "Briefings", icon: <FiFileText /> },
  { to: "/integrations", label: "Integrations", icon: <FiLayers /> },
  { to: "/chat", label: "Ask AI", icon: <FiMessageCircle /> },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`h-screen bg-gray-900 text-gray-100 transition-all duration-300 
      flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 p-2">
        {!collapsed && (
          <h2 className="text-xl font-bold whitespace-nowrap">Smart PMO</h2>
        )}
        {/* Collapse button only visible on large screens */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-gray-800 transition hidden lg:block"
        >
          {collapsed ? <FiMenu className="text-white" /> : <FiX className="text-white" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {items.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 
               hover:bg-gray-800 hover:text-white ${
                 isActive
                   ? "bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold shadow-sm"
                   : "text-gray-400"
               }`
            }
          >
            <span className="text-lg">{icon}</span>
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="text-xs text-gray-500 mt-6 border-t border-gray-700 pt-4 px-4 pb-4">
          © 2025 Smart PMO
        </div>
      )}
    </aside>
  );
}
