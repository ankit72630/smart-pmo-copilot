// src/pages/InsightsPage.jsx
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FiAlertTriangle,
  FiShield,
  FiFileText,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

export default function InsightsPage() {
  const [timeRange, setTimeRange] = useState("thisWeek");
  const [briefingOpen, setBriefingOpen] = useState(true);

  // Mock datasets for each time range
  const datasets = {
    thisWeek: {
      risks: [
        { risk: "API delays", severity: "High", owner: "Backend Team", status: "Open" },
        { risk: "UI defects", severity: "Medium", owner: "Frontend Team", status: "Mitigating" },
      ],
      trend: [
        { week: "Mon", risks: 2 },
        { week: "Tue", risks: 3 },
        { week: "Wed", risks: 1 },
        { week: "Thu", risks: 2 },
        { week: "Fri", risks: 2 },
      ],
      compliance: {
        Delivery: { percent: 92, status: "On Track", color: "green" },
        Security: { percent: 88, status: "Compliant", color: "green" },
        Governance: { percent: 79, status: "Needs Review", color: "yellow" },
      },
      briefing: `📌 This Week’s Summary:
- 2 projects at risk (API delays, UI defects).
- 1 SLA breach reported in Delivery.
- Avg cycle time: 4.3d (upwards trend).
- Recommendation: Add backend resources & tighten QA review.`,
    },
    lastWeek: {
      risks: [
        { risk: "Database lag", severity: "High", owner: "Infra Team", status: "Closed" },
        { risk: "Test failures", severity: "Medium", owner: "QA Team", status: "Mitigating" },
      ],
      trend: [
        { week: "Mon", risks: 4 },
        { week: "Tue", risks: 2 },
        { week: "Wed", risks: 3 },
        { week: "Thu", risks: 1 },
        { week: "Fri", risks: 2 },
      ],
      compliance: {
        Delivery: { percent: 86, status: "Needs Review", color: "yellow" },
        Security: { percent: 75, status: "Needs Review", color: "yellow" },
        Governance: { percent: 82, status: "Compliant", color: "green" },
      },
      briefing: `📌 Last Week’s Summary:
- 1 major database issue (resolved).
- QA failures caused sprint delays.
- Avg cycle time: 3.7d (stable).
- Recommendation: Improve regression test coverage.`,
    },
    last30: {
      risks: [
        { risk: "Vendor delays", severity: "High", owner: "PM Team", status: "Open" },
        { risk: "Resource shortage", severity: "Medium", owner: "HR", status: "Mitigating" },
        { risk: "Compliance gap", severity: "Low", owner: "Security", status: "Open" },
      ],
      trend: [
        { week: "Wk1", risks: 6 },
        { week: "Wk2", risks: 5 },
        { week: "Wk3", risks: 4 },
        { week: "Wk4", risks: 7 },
      ],
      compliance: {
        Delivery: { percent: 78, status: "Needs Review", color: "yellow" },
        Security: { percent: 69, status: "Critical", color: "red" },
        Governance: { percent: 81, status: "Compliant", color: "green" },
      },
      briefing: `📌 Last 30 Days Summary:
- 3 risks identified: vendor, HR, compliance.
- 2 SLA breaches reported.
- Avg cycle time: 4.8d (increasing).
- Recommendation: Prioritize vendor negotiations & security fixes.`,
    },
    custom: {
      risks: [
        { risk: "Legacy migration", severity: "Medium", owner: "DevOps", status: "Mitigating" },
      ],
      trend: [
        { week: "Phase 1", risks: 2 },
        { week: "Phase 2", risks: 1 },
      ],
      compliance: {
        Delivery: { percent: 84, status: "Compliant", color: "green" },
        Security: { percent: 72, status: "Needs Review", color: "yellow" },
        Governance: { percent: 65, status: "Critical", color: "red" },
      },
      briefing: `📌 Custom Range Summary:
- Migration risks being tracked.
- Avg cycle time: 5.0d.
- Recommendation: Allocate extra DevOps support.`,
    },
  };

  const activeData = datasets[timeRange];

  // Color helpers
  const complianceColor = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className="space-y-8">
      {/* Header & Time Range */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Insights</h1>
        <div className="flex gap-2 border rounded-full p-1 bg-white shadow-sm">
          {[
            { key: "thisWeek", label: "This Week" },
            { key: "lastWeek", label: "Last Week" },
            { key: "last30", label: "Last 30 Days" },
            { key: "custom", label: "Custom" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setTimeRange(opt.key)}
              className={`px-3 py-1 text-xs md:text-sm rounded-full transition ${
                timeRange === opt.key
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400">
        A consolidated view of <b>Risks</b>, <b>Compliance</b>, and{" "}
        <b>Executive Briefings</b>.
      </p>

      {/* Risks Section */}
      <section>
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <FiAlertTriangle className="text-red-500" /> Risks Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risks Table */}
          <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 w-3/12">Risk</th>
                  <th className="px-4 py-3 w-2/12">Severity</th>
                  <th className="px-4 py-3 w-3/12">Owner</th>
                  <th className="px-4 py-3 w-2/12">Status</th>
                </tr>
              </thead>
              <tbody>
                {activeData.risks.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-3">{r.risk}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          r.severity === "High"
                            ? "bg-red-100 text-red-700"
                            : r.severity === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {r.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3">{r.owner}</td>
                    <td className="px-4 py-3">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Risk Trend Chart */}
          <div className="rounded-lg border bg-white shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Risk Trend ({timeRange})
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activeData.trend}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="risks" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Compliance Section - Dynamic */}
      <section>
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <FiShield className="text-indigo-500" /> Compliance Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Object.entries(activeData.compliance).map(([key, val]) => (
            <div
              key={key}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-sm font-medium mb-1">{key}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${complianceColor[val.color]} h-2 rounded-full`}
                  style={{ width: `${val.percent}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {val.percent}% – {val.status}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Executive Briefing */}
      <section>
        <button
          onClick={() => setBriefingOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-3 border rounded-lg bg-gradient-to-r from-gray-50 to-white shadow-sm hover:shadow transition"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <FiFileText className="text-green-600" /> Executive Briefing
          </h2>
          {briefingOpen ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </button>
        {briefingOpen && (
          <div className="mt-3 p-6 border rounded-lg shadow-sm bg-gradient-to-br from-gray-50 to-white animate-fade-in">
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {activeData.briefing}
            </p>
          </div>
        )}
      </section>

      {/* AI Recommendations (static for now) */}
      <section>
        <div className="p-6 rounded-xl border shadow-sm bg-indigo-50 border-indigo-200">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-700 mb-3">
            <FiTrendingUp /> AI-Powered Recommendations
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <FiCheckCircle className="text-green-600 mt-0.5" />
              Prioritize fixing <b>API delays</b> to avoid cascading delivery risks.
            </li>
            <li className="flex items-start gap-2">
              <FiClock className="text-yellow-500 mt-0.5" />
              <b>Cycle time trending up (4.3d)</b> → add 1 QA resource.
            </li>
            <li className="flex items-start gap-2">
              <FiAlertTriangle className="text-red-500 mt-0.5" />
              <b>UI defects</b> mitigation ongoing → schedule regression test.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
