// src/components/AverageCycleTimeCard.jsx
import React from "react";
import Sparkline from "./Sparkline";

export default function AverageCycleTimeCard({ value, trend }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="font-semibold mb-2">Avg. Cycle Time</h2>
      <p className="text-3xl font-bold mb-4">{value} d</p>
      <Sparkline data={trend} dataKey="days" stroke="#10B981" />
    </div>
  );
}
