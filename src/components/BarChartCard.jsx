import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarChartCard({ data, dataKey, title, fill }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill={fill} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
