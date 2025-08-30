// src/pages/DashboardMockup.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FiDownload, FiFileText } from "react-icons/fi";

const metrics = [
  { label: "Total Reports", value: 58 },
  { label: "Risk Trend", value: "↑ 13", accent: "text-red-500" },
  { label: "SLA Breaches", value: 4 },
  { label: "Forecast Alerts", value: 7 },
];

const pieData = [
  { name: "High", value: 20 },
  { name: "Medium", value: 35 },
  { name: "Low", value: 45 },
];
const pieColors = ["#EF4444", "#F59E0B", "#10B981"];

const lineData = [
  { day: "Mon", prob: 0.1 },
  { day: "Tue", prob: 0.3 },
  { day: "Wed", prob: 0.2 },
  { day: "Thu", prob: 0.4 },
  { day: "Fri", prob: 0.35 },
  { day: "Sat", prob: 0.5 },
  { day: "Sun", prob: 0.45 },
];

const complianceData = [
  { label: "Auto-generated", pct: 0.12 },
  { label: "Delivery", pct: 0.74 },
];

const inboxItems = [
  {
    title: "Auto-Generated message",
    body:
      "Project Gamma has entered a red status queue to multiple critical risks.",
  },
  {
    title: "Mitigation Suggestion",
    body:
      "Reallocate resources from Project Beta to address identified bottlenecks.",
  },
];

export default function DashboardMockup() {
  return (
    <div className="flex h-full bg-gray-50">
      {/* ─────────── Sidebar ─────────── */}
      <aside className="w-64 bg-gray-800 text-gray-100 p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Smart PMO</h2>
        <nav className="space-y-3">
          {[
            "Dashboard",
            "Projects",
            "Risks",
            "Compliance",
            "Briefings",
            "Integrations",
            "Commands",
            "Inbox",
            "Export",
            "PDF",
          ].map((item) => (
            <button
              key={item}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* ─────────── Main Content ─────────── */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header + Export Buttons */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Smart PMO Copilot</h1>
          <div className="space-x-3">
            <button className="px-4 py-2 bg-gray-700 text-white rounded shadow hover:bg-gray-600">
              <FiDownload className="inline mr-2" />
              Export PPT
            </button>
            <button className="px-4 py-2 bg-white border rounded shadow hover:bg-gray-100">
              <FiFileText className="inline mr-2" />
              PDF
            </button>
          </div>
        </header>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map(({ label, value, accent }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-6 shadow flex flex-col"
            >
              <span className="text-sm text-gray-500">{label}</span>
              <span
                className={`mt-2 text-2xl font-bold ${
                  accent ? accent : "text-gray-900"
                }`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Risk Distribution */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold mb-4">Risk Distribution</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                  label
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Pie>
                <ReTooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-around mt-4 text-sm">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: pieColors[i] }}
                  />
                  <span>{d.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delay Probability */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold mb-4">Delay Probability</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 1]} tickFormatter={(v) => `${v * 100}%`} />
                <ReTooltip formatter={(v) => `${Math.round(v * 100)}%`} />
                <Line
                  type="monotone"
                  dataKey="prob"
                  stroke="#3B82F6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Compliance Bars */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold mb-4">Compliance</h2>
            {complianceData.map(({ label, pct }) => (
              <div key={label} className="mb-4">
                <span className="text-sm">{label}</span>
                <div className="w-full bg-gray-200 h-3 rounded overflow-hidden mt-1">
                  <div
                    className="h-3 bg-primary"
                    style={{ width: `${pct * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {Math.round(pct * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Inbox */}
        <div className="bg-white rounded-xl p-6 shadow mb-8">
          <h2 className="font-semibold mb-4">Inbox</h2>
          <ul className="space-y-4">
            {inboxItems.map(({ title, body }, i) => (
              <li key={i} className="border-b pb-3">
                <p className="font-medium">{title}</p>
                <p className="text-gray-600">{body}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Project Summary */}
        <div className="bg-white rounded-xl p-6 shadow mb-8">
          <h2 className="font-semibold mb-4">Project Summary</h2>
          <p>Status: <span className="text-green-500">On track</span></p>
          <p>Owner: Jolin</p>
          <p className="mt-2">Finalize the contract</p>
        </div>

        {/* Search / Command Input */}
        <div className="bg-white rounded-xl p-4 shadow flex items-center space-x-4">
          <span className="text-gray-500">🔍</span>
          <input
            type="text"
            placeholder="Show all projects at risk in the last 2 weeks"
            className="w-full p-2 border-0 focus:ring-0"
          />
          <button className="bg-primary text-white px-4 py-2 rounded">
            Ask something
          </button>
        </div>
      </main>
    </div>
);
}
