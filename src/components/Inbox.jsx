import React from "react";
import { FaInfoCircle, FaLightbulb, FaExclamationTriangle } from "react-icons/fa";

export default function Inbox({ items }) {
  const getIcon = (title) => {
    if (title.toLowerCase().includes("auto")) {
      return <FaExclamationTriangle className="text-red-500 w-5 h-5" />;
    }
    if (title.toLowerCase().includes("tip")) {
      return <FaLightbulb className="text-yellow-500 w-5 h-5" />;
    }
    return <FaInfoCircle className="text-blue-500 w-5 h-5" />;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        Inbox
        <span className="ml-2 bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </h2>

      {/* List */}
      <ul className="space-y-4">
        {items.map(({ title, body, time }, i) => (
          <li
            key={i}
            className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition"
          >
            <div className="mt-1">{getIcon(title)}</div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{title}</p>
              <p className="text-gray-600 text-sm">{body}</p>
              {time && (
                <span className="text-xs text-gray-400">{time}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

