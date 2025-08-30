// src/components/Sparkline.jsx
import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function Sparkline({ data, dataKey, stroke = "#4f46e5" }) {
  return (
    <ResponsiveContainer width={80} height={30}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={stroke}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
