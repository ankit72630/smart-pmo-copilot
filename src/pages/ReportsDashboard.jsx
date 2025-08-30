import React, { useEffect, useState } from "react";
import {
  FaBug,
  FaExclamationTriangle,
  FaCheckCircle,
  FaRobot,
  FaDownload,
} from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#10B981", "#EF4444", "#3B82F6"];

function MetricCard({ icon, label, count, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center p-5 rounded-xl shadow text-white ${color} cursor-pointer`}
      tabIndex="0"
    >
      <div className="text-3xl">{icon}</div>
      <div className="text-right">
        <h3 className="text-lg font-bold">{count}</h3>
        <p className="text-sm">{label}</p>
      </div>
    </div>
  );
}

export default function ReportsDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/reports")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          console.error("Expected array, got:", data);
          setReports([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setReports([]);
        setLoading(false);
      });
  }, []);

  const riskCount = reports.filter(r => r.risk && !r.risk.includes("No major risks")).length;
  const cleanCount = reports.filter(r => r.risk && r.risk.includes("No major risks")).length;

  const pieData = [
    { name: "Clean", value: cleanCount },
    { name: "Risks", value: riskCount },
  ];

  const barData = reports.map((r, i) => ({
    name: `R${i + 1}`,
    risk: r.risk && !r.risk.includes("No major risks") ? 1 : 0,
  }));

  const lineData = reports.map((r, i) => ({
    name: `R${i + 1}`,
    summaryLength: r.summary?.length || 0,
  }));

  const handleDrillDown = (type) => {
    if (type === "risk") {
      setModalData(reports.filter(r => r.risk && !r.risk.includes("No major risks")));
      setModalTitle("Risk Reports");
    } else if (type === "clean") {
      setModalData(reports.filter(r => r.risk && r.risk.includes("No major risks")));
      setModalTitle("Clean Reports");
    } else {
      setModalData(reports);
      setModalTitle("All Reports");
    }
    setModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary">📊 PMO Copilot Dashboard</h1>

      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <>
          {/* Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <MetricCard icon={<FaBug />} label="Total Reports" count={reports.length} color="bg-primary" onClick={() => handleDrillDown("all")} />
            <MetricCard icon={<FaExclamationTriangle />} label="Risks Found" count={riskCount} color="bg-danger" onClick={() => handleDrillDown("risk")} />
            <MetricCard icon={<FaCheckCircle />} label="Clean Reports" count={cleanCount} color="bg-success" onClick={() => handleDrillDown("clean")} />
          </div>

          {/* Visualizations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">🧩 Risk Distribution</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" label outerRadius={70} fill="#8884d8" dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">📉 Risk Trend</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="risk" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-6">
            <h2 className="text-lg font-semibold mb-2">🧠 Summary Complexity</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="summaryLength" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Project Summary Section */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">🧠 Latest Project Summary</h2>

            {reports.length > 0 ? (
              <>
                <p className="text-gray-700 dark:text-gray-200 mb-2"><strong>Summary:</strong> {reports[0].summary}</p>
                <p className="text-gray-700 dark:text-gray-200 mb-2"><strong>Risk:</strong> {reports[0].risk}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(reports[0].timestamp).toLocaleString()}</p>
              </>
            ) : (
              <p>No reports available.</p>
            )}
            <a href="http://localhost:8000/download_report" className="inline-flex items-center mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition">
              <FaDownload className="mr-2" />
              Download Report PDF
            </a>
          </div>
        </>
      )}

      {/* Drill-down Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl rounded bg-white dark:bg-gray-800 p-6 shadow-xl overflow-y-auto max-h-[80vh]">
            <Dialog.Title className="text-xl font-bold mb-4">{modalTitle}</Dialog.Title>
            <ul className="space-y-3">
              {modalData.map((r, i) => (
                <li key={i} className="border-b pb-2">
                  <p><strong>Summary:</strong> {r.summary}</p>
                  <p><strong>Risk:</strong> {r.risk}</p>
                  <p className="text-sm text-gray-500">{new Date(r.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
            <div className="text-right mt-4">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-primary text-white rounded hover:bg-indigo-700">Close</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
