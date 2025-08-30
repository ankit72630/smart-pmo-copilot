import React, { useState } from "react";
import {
  FiFileText,
  FiTrendingUp,
  FiAlertTriangle,
  FiBell,
  FiClock,
  FiActivity,
} from "react-icons/fi";
import MetricGrid from "../components/MetricGrid";
import TaskStatusDonut from "../components/TaskStatusDonut";
import GanttChartCard from "../components/GanttChart";
import HealthGauge from "../components/HealthGauge";
import CalendarHeatmapCard from "../components/CalendarHeatmap";
import SeverityTable from "../components/SeverityTable";
import AverageCycleTimeCard from "../components/AverageCycleTimeCard";
import BarChartCard from "../components/BarChartCard";
import LineChartCard from "../components/LineChartCard";
import ComplianceCard from "../components/ComplianceCard";
import Inbox from "../components/Inbox";
import ProjectSummary from "../components/ProjectSummary";
import CommandBar from "../components/CommandBar";
import FilterSidebar from "../components/FilterSidebar";
import ChatCopilot from "../components/ChatCopilot";

export default function DashboardMockup() {
  // ─── Mock data & state ──────────────────────────────────────
  const mockReports = [
    { summary: "Alpha done", risk: "⚠️ UI blockers", timestamp: "2025-07-01" },
    { summary: "Beta done", risk: "✅ No risks", timestamp: "2025-06-25" },
    { summary: "Gamma done", risk: "⚠️ API delay", timestamp: "2025-06-18" },
    { summary: "Delta done", risk: "✅ No risks", timestamp: "2025-06-11" },
  ];
  const [filters, setFilters] = useState({ sprint: "All", risk: "All" });
  const [showFilters, setShowFilters] = useState(false);

  // ─── Derived metrics & chart data ───────────────────────────
  const total = mockReports.length;
  const riskCount = mockReports.filter(
    (r) => !r.risk.includes("No risks")
  ).length;
  const clean = total - riskCount;

  const metrics = [
    {
      label: "Total Reports",
      value: 58,
      icon: FiFileText,
      accent: "text-blue-600",
      subtext: "This month",
    },
    {
      label: "Risk Trend",
      value: "↑ 13",
      icon: FiTrendingUp,
      accent: "text-red-500",
      subtext: "vs last week",
    },
    {
      label: "SLA Breaches",
      value: 4,
      icon: FiAlertTriangle,
      accent: "text-yellow-600",
      subtext: "past 30 days",
    },
    {
      label: "Forecast Alerts",
      value: 7,
      icon: FiBell,
      accent: "text-purple-600",
      subtext: "active alerts",
    },
    {
      label: "Avg. Cycle Time",
      value: "4.2 d",
      icon: FiClock,
      accent: "text-green-600",
      subtext: "avg across projects",
    },
    {
      label: "Overall Health",
      value: "75%",
      icon: FiActivity,
      accent: "text-teal-600",
      subtext: "portfolio status",
    },
  ];

  const pieData = [
    { name: "Clean", value: clean },
    { name: "Risk", value: riskCount },
  ];
  const barData = mockReports.map((r, i) => ({
    name: `R${i + 1}`,
    risk: r.risk.includes("No risks") ? 0 : 1,
  }));
  const lineData = mockReports.map((r, i) => ({
    name: `R${i + 1}`,
    length: r.summary.length,
  }));
  const complianceData = [
    { label: "Gen-AI", pct: 0.18 },
    { label: "Delivery", pct: 0.75 },
  ];
  const inboxItems = [
  { title: "Auto-Message", body: "Gamma hit red status.", time: "2h ago" },
  { title: "Mitigation Tip", body: "Reassign Beta resources.", time: "5h ago" },
  /* { title: "Reminder", body: "Sprint demo scheduled for tomorrow.", time: "1d ago" }, */
];
  const severityData = [
    { name: "API Delay", severity: "High", owner: "Alice" },
    { name: "UI Blocker", severity: "Medium", owner: "Bob" },
    { name: "Docs Lag", severity: "Low", owner: "Carol" },
  ];
  const trendData = [{ days: 2 }, { days: 3 }, { days: 5 }, { days: 4 }];

  const handleAsk = (q) => alert("Ask: " + q);
  const toggleFilters = () => setShowFilters((v) => !v);

  return (
    <div className="relative space-y-8">
      {/* 8) Filter Sidebar */}
      <FilterSidebar
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onChange={setFilters}
      />

      {/* 2) Metrics */}
      <MetricGrid metrics={metrics} className="card-row" />

      {/* 1+3+... Top visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 card-row">
        <TaskStatusDonut />
        <GanttChartCard />
        <HealthGauge />
      </div>

      {/* 4+5) Mid visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 card-row">
        <CalendarHeatmapCard />
        <SeverityTable data={severityData} />
      </div>

      {/* 6+7) Lower visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 card-row">
        <AverageCycleTimeCard value={4.2} trend={trendData} />
        <ComplianceCard items={complianceData} />
        <BarChartCard
          data={barData}
          dataKey="risk"
          title="Risk Trend"
          fill="#EF4444"
        />
        <LineChartCard
          data={lineData}
          dataKey="length"
          title="Summary Len"
          stroke="#3B82F6"
        />
      </div>

      {/* 9) Inbox, Summary & Command */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 card-row">
        <Inbox items={inboxItems} />
        <ProjectSummary
          status="On track"
          owner="Jolin"
          text="Alpha module delivered, Beta in progress. Risks under control."
          progress={72}
        />
      </div>

      {/* <CommandBar placeholder="Ask PMO Copilot…" onAsk={handleAsk} /> */}
      
    </div>
  );
}
