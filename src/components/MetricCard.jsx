import React from "react";

export default function MetricCard({ icon: Icon, label, value, accent, subtext }) {
  return (
    <div className="bg-white rounded-xl p-4 h-[90px] lg:min-w-[180px] shadow-sm hover:shadow-md hover:scale-[1.02] transition transform flex items-center space-x-3">
      {/* Icon */}
      <div
        className={`p-2.5 rounded-lg ${
          accent?.includes("red")
            ? "bg-red-100 text-red-600"
            : accent?.includes("yellow")
            ? "bg-yellow-100 text-yellow-600"
            : accent?.includes("green")
            ? "bg-green-100 text-green-600"
            : accent?.includes("purple")
            ? "bg-purple-100 text-purple-600"
            : accent?.includes("teal")
            ? "bg-teal-100 text-teal-600"
            : "bg-blue-100 text-blue-600"
        }`}
      >
        {Icon && <Icon className="text-lg" />}
      </div>

      {/* Text */}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-2xl font-bold ${accent || "text-gray-900"}`}>
          {value}
        </p>
        {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
      </div>
    </div>
  );
}
