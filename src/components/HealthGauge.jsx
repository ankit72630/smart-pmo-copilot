// src/components/HealthGauge.jsx
import React from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
} from "recharts";

export default function HealthGauge({ title = "Project Health" }) {
  const health = 0.75; // 75%
  const data = [
    { name: "Health", value: health },
    { name: "Rest",   value: 1 - health },
  ];
  return (
    <div className="bg-white rounded-xl p-6 shadow text-center">
      <h2 className="font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={120}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            innerRadius={40}
            outerRadius={60}
            cornerRadius={10}
            paddingAngle={2}
          >
            <Cell fill="#22c55e" />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <p className="mt-2 text-xl font-bold">{Math.round(health*100)}%</p>
    </div>
  );
}
