// src/components/TaskStatusDonut.jsx
import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from "recharts";

export default function TaskStatusDonut({ title = "Task Status" }) {
  const data = [
    { name: "Completed",   value: 15 },
    { name: "In Progress", value: 5 },
    { name: "Blocked",     value: 2 },
  ];
  const COLORS = ["#10B981", "#3B82F6", "#EF4444"];

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={70}
            label
          >
            {data.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
