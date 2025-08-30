// src/components/SeverityTable.jsx
import React from "react";

export default function SeverityTable({ data }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="font-semibold mb-4">Top Risks by Severity</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="pb-2">Risk</th>
            <th className="pb-2">Severity</th>
            <th className="pb-2">Owner</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r,i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="py-2">{r.name}</td>
              <td className="py-2">
                <span className={`px-2 py-1 text-white rounded-full ${
                  r.severity==="High" ? "bg-red-500" :
                  r.severity==="Medium" ? "bg-yellow-500" :
                  "bg-green-500"
                }`}>
                  {r.severity}
                </span>
              </td>
              <td className="py-2">{r.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
