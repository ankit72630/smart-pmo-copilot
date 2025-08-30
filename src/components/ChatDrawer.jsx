// src/components/ChatDrawer.jsx
import React from "react";
export default function ChatDrawer({ open, project, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-40">
      <div className="fixed right-0 top-0 bottom-0 w-96 bg-white dark:bg-gray-800 p-4 shadow-lg overflow-auto">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-900">Close</button>
        <h2 className="text-xl font-bold mt-4">
          Chat about {project?.name}
        </h2>
        {/* Insert your chat UI here, seeded with project context */}
        <div className="mt-4">…Chat interface…</div>
      </div>
    </div>
  );
}