import React, { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaUser,
  FaPaperPlane,
  FaChartBar,
  FaListUl,
  FaFileAlt,
  FaDownload,
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      type: "text",
      text: "👋 Hi, I'm your Smart PMO Copilot. How can I assist you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    { text: "Show risk heatmap", icon: <FaChartBar /> },
    { text: "Summarize sprint status", icon: <FaFileAlt /> },
    { text: "Generate compliance report", icon: <FaFileAlt /> },
    { text: "List top blockers", icon: <FaListUl /> },
  ];

  // Mock data
  const riskData = [
    { risk: "API Delay", severity: 8 },
    { risk: "UI Blocker", severity: 5 },
    { risk: "Docs Lag", severity: 3 },
  ];

  const complianceData = [
    { category: "Delivery", status: "On Track", percent: "92%" },
    { category: "Compliance", status: "Needs Review", percent: "75%" },
    { category: "Risks", status: "Under Control", percent: "80%" },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      type: "text",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setTyping(true);

    // Mock AI reply
    setTimeout(() => {
      if (input.toLowerCase().includes("heatmap")) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            type: "chart",
            data: riskData,
            text: "📊 Here’s the Risk Heatmap visualization:",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else if (input.toLowerCase().includes("compliance")) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            type: "table",
            data: complianceData,
            text: "📋 Here’s the Compliance Summary:",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            type: "text",
            text: `📊 Here’s an insight for: "${input}". (AI response placeholder)`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
      setTyping(false);
    }, 1200);
  };

  // CSV Export
  const exportCSV = (data, filename = "report.csv") => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Export
  const exportPDF = (data, title = "Report") => {
  const doc = new jsPDF();
  doc.text(title, 14, 16);

  autoTable(doc, {
    head: [Object.keys(data[0])],
    body: data.map((row) => Object.values(row)),
    startY: 20,
  });

  doc.save(`${title}.pdf`);
};


  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing]);

  return (
    <div className="flex flex-col h-[82vh] bg-gray-50">
      {/* Inline Chat Identity */}
      <div className="text-center py-2 border-b bg-gray-50 text-gray-600 text-sm font-medium shadow-sm">
        <FaRobot className="inline mr-2 text-gray-500" />
        Ask AI <span className="ml-2 text-green-500">● Online</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-gray-50 custom-scrollbar">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 animate-fade-in ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && <FaRobot className="text-gray-500 w-5 h-5" />}

            <div
              className={`px-4 py-3 rounded-3xl max-w-[75%] text-sm shadow relative ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-br-none"
                  : "bg-white border text-gray-800 rounded-bl-none"
              }`}
            >
              {/* Text */}
              {msg.type === "text" && <div>{msg.text}</div>}

              {/* Chart */}
              {msg.type === "chart" && (
                <div>
                  <div className="mb-2">{msg.text}</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={msg.data}>
                      <XAxis dataKey="risk" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="severity" fill="#4B5563" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Table */}
              {msg.type === "table" && (
                <div>
                  <div className="mb-2 font-medium">{msg.text}</div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs border border-gray-200 rounded-lg">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left">Category</th>
                          <th className="px-3 py-2 text-left">Status</th>
                          <th className="px-3 py-2 text-right">Percent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {msg.data.map((row, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="px-3 py-2">{row.category}</td>
                            <td className="px-3 py-2">{row.status}</td>
                            <td className="px-3 py-2 text-right">{row.percent}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Export Buttons */}
                  <div className="flex gap-2 mt-2 text-xs">
                    <button
                      onClick={() => exportCSV(msg.data, "compliance_report.csv")}
                      className="flex items-center gap-1 px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                    >
                      <FaFileExcel className="text-green-600" /> Export CSV
                    </button>
                    <button
                      onClick={() => exportPDF(msg.data, "Compliance Report")}
                      className="flex items-center gap-1 px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                    >
                      <FaFilePdf className="text-red-600" /> Export PDF
                    </button>
                  </div>
                </div>
              )}

              {/* Timestamp */}
              <div className="text-[9px] text-gray-400 mt-1 text-right">
                {msg.time}
              </div>
            </div>

            {msg.sender === "user" && <FaUser className="text-gray-400 w-5 h-5" />}
          </div>
        ))}

        {/* Typing Indicator */}
        {typing && (
          <div className="flex items-center gap-2 animate-fade-in">
            <FaRobot className="text-gray-500 w-5 h-5" />
            <div className="bg-gray-100 border rounded-2xl px-3 py-2 text-sm flex gap-1">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 px-6 py-3 border-t bg-white shadow-sm">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => setInput(s.text)}
            className="flex items-center gap-1 text-xs px-3 py-1 border border-gray-300 hover:bg-gray-100 hover:shadow-sm text-gray-700 rounded-full transition"
          >
            {s.icon} {s.text}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-100 border-t flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask AI... (Press Enter to send)"
          className="flex-1 px-4 py-2 rounded-full border focus:outline-none text-sm shadow-inner"
        />
        <button
          onClick={handleSend}
          className="ml-3 p-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-full hover:opacity-90 transition shadow-md"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
