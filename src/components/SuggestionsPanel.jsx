
// src/components/SuggestionsPanel.jsx
export default function SuggestionsPanel({ suggestions }) {
    return (
      <div className="card">
        <h3 className="font-semibold mb-4">AI Suggestions</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          {suggestions.map((s,i)=> <li key={i}>{s}</li> )}
        </ul>
      </div>
    );
  }