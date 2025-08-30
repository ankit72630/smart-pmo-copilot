import React from "react";
import { FaCheckCircle, FaExclamationCircle, FaUser, FaClipboardList } from "react-icons/fa";

export default function ProjectSummary({ status, owner, text, progress = 75 }) {
  const isOnTrack = status === "On track";
  const statusColor = isOnTrack
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";
  const statusIcon = isOnTrack ? (
    <FaCheckCircle className="w-4 h-4 text-green-600" />
  ) : (
    <FaExclamationCircle className="w-4 h-4 text-red-600" />
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaClipboardList className="w-5 h-5 text-indigo-500" />
          Project Summary
        </h2>
        <span
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
        >
          {statusIcon}
          {status}
        </span>
      </div>

      {/* Owner */}
      <div className="flex items-center gap-2 mb-3 text-gray-700">
        <FaUser className="w-4 h-4 opacity-70" />
        <span className="text-sm">
          <strong>Owner:</strong> {owner}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{text}</p>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
