import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaRobot, FaUser } from "react-icons/fa";

export default function ChatCopilot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi 👋 I'm your PMO Copilot. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const suggestions = [
    "Show risk heatmap",
    "Summarize sprint status",
    "Generate compliance report",
    "List top blockers",
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    // Mock AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `📊 Here's an insight for: "${input}" (AI response placeholder).`,
        },
      ]);
    }, 1000);
  };

  // 🔥 Auto-scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition"
      >
        {open ? <FaTimes /> : <FaComments />}
      </button>

      {/* Chat Drawer */}
      {open && (
        <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border overflow-hidden animate-slide-up flex flex-col">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <h2 className="font-semibold flex items-center gap-2">
              <FaRobot /> Smart PMO Copilot
            </h2>
            <button onClick={() => setOpen(false)}>
              <FaTimes className="text-white" />
            </button>
          </div>

          {/* Messages (scrollable area) */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <FaRobot className="text-indigo-500 mt-1" />
                )}
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white border text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <FaUser className="text-gray-400 mt-1" />
                )}
              </div>
            ))}
            {/* 🔥 Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 p-3 border-t bg-white">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setInput(s)}
                className="text-xs px-3 py-1 bg-gray-100 hover:bg-indigo-100 text-gray-700 rounded-full transition"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center p-3 border-t bg-gray-100">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask PMO Copilot..."
              className="flex-1 px-4 py-2 rounded-full border focus:outline-none text-sm"
            />
            <button
              onClick={handleSend}
              className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
