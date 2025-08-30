// src/components/GanttChart.jsx
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

const tasks = [
  { task: "Design",   start: 0, end: 3 },
  { task: "Backend",  start: 2, end: 6 },
  { task: "Frontend", start: 4, end: 8 },
  { task: "QA",       start: 7, end: 10 },
];

export default function GanttChartCard() {
  const data = tasks.map((d) => ({
    task:     d.task,
    offset:   d.start,
    duration: d.end - d.start,
  }));

  return (
    <div className="card">
      <h2 className="font-semibold mb-4">Sprint Timeline</h2>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 20, bottom: 20, left: 50 }}
          barCategoryGap="25%"
        >
          {/* subtle horizontal grid lines */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />

          {/* X axis: days */}
          <XAxis
            type="number"
            domain={[0, "dataMax + 1"]}
            tickFormatter={(v) => `${v}d`}
            tickLine={false}
          />

          {/* Y axis: tasks in original order */}
          <YAxis
            dataKey="task"
            type="category"
            width={80}
            tickLine={false}
            tick={{ fontSize: 14, fill: "#334155" }}
          />

          {/* tooltip */}
          <Tooltip
            formatter={(value) => `${value} days`}
            cursor={{ fill: "rgba(0,0,0,0.1)" }}
          />

          {/* transparent offset bar to position start */}
          <Bar dataKey="offset" stackId="a" fill="transparent" isAnimationActive={false} />

          {/* duration bar with label list */}
          <Bar
            dataKey="duration"
            stackId="a"
            fill="#4f46e5"
            isAnimationActive
            animationDuration={600}
          >
            <LabelList
              dataKey="duration"
              position="right"
              formatter={(v) => `${v}d`}
              style={{ fill: "#334155", fontWeight: 500 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
