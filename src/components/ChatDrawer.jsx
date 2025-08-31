// src/components/ChatDrawer.jsx
import React from "react";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ChatDrawer({ open, onClose, project }) {
  if (!open || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div className="w-full sm:w-[400px] bg-white shadow-lg flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            AI Chat – {project.name}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">✖</button>
        </div>

        {/* Body */}
        <div className="flex-1 p-4 overflow-y-auto">
          <p className="text-gray-600">
            👋 Ask me about <strong>{project.name}</strong> — summary: {project.summary}
          </p>
        </div>

        {/* Input */}
        <div className="p-3 border-t flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <FiSend />
          </button>
        </div>

        {/* Footer actions */}
        <div className="flex justify-between items-center p-3 border-t">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded border hover:bg-gray-100"
          >
            Close
          </button>
          <Link
            to={`/chat?project=${encodeURIComponent(project.name)}&summary=${encodeURIComponent(project.summary)}`}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Open in Full Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
