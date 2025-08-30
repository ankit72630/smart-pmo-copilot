import React from "react";

export default function CommandBar({ placeholder, onAsk }) {
  const [text, setText] = React.useState("");
  return (
    <div className="bg-white rounded-xl p-4 shadow flex items-center space-x-4">
      <span className="text-gray-500">🔍</span>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="w-full p-2 border-0 focus:ring-0"
        onKeyDown={e => e.key === "Enter" && onAsk(text)}
      />
      <button
        onClick={() => onAsk(text)}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Ask
      </button>
    </div>
  );
}
