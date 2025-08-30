import React from "react";

export default function ComplianceCard({ items }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="font-semibold mb-4">Compliance</h2>
      {items.map(({ label, pct }) => (
        <div key={label} className="mb-4">
          <span className="text-sm">{label}</span>
          <div className="w-full bg-gray-200 h-3 rounded overflow-hidden mt-1">
            <div
              className="h-3 bg-primary"
              style={{ width: `${pct * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">{Math.round(pct * 100)}%</span>
        </div>
      ))}
    </div>
  );
}
