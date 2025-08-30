import React, { useState } from 'react';
import axios from 'axios';

export default function ChatInterface() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);

    try {
      const res = await axios.post('http://localhost:8000/chat', { query });
      setResponse(res.data.response);
    } catch (err) {
      console.error('Error:', err);
      setResponse({ summary: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-4">💬 Ask PMO Copilot</h2>

      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. Summarize the sprint"
          className="flex-1 px-4 py-2 border border-gray-300 rounded shadow-sm"
        />
        <button
          onClick={handleChat}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ask
        </button>
      </div>

      {loading && <p className="text-gray-500">🧠 Thinking...</p>}

      {response && (
        <div className="bg-white border rounded p-4 shadow mt-4 space-y-4">
          {response.summary && (
            <>
              <h3 className="text-lg font-semibold text-blue-700">🧠 Summary</h3>
              <p className="whitespace-pre-wrap">{response.summary}</p>
            </>
          )}
          {response.risk && (
            <>
              <h3 className="text-lg font-semibold text-red-600">⚠️ Risk</h3>
              <p className="whitespace-pre-wrap">{response.risk}</p>
            </>
          )}
          {response.report_path && (
            <a
              href={`http://localhost:8000/download_report`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              📥 Download Report
            </a>
          )}
        </div>
      )}
    </div>
  );
}
