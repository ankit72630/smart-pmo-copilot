import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  ResponsiveContainer,
} from "recharts";

export default function PieChartCard({ data, colors, title }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={40} outerRadius={80} label>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <ReTooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-around mt-4 text-sm">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            <span>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
