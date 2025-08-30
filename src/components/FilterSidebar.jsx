import React, { useState, useMemo } from "react";
import { debounce } from "lodash";
import { FiX } from "react-icons/fi";

export default function FilterSidebar({ visible, onClose, filters, onChange }) {
  const [local, setLocal] = useState(filters);

  // Debounced apply
  const applyChange = useMemo(
    () => debounce(onChange, 300),
    [onChange]
  );

  const handleLocalChange = (field) => (e) => {
    const nv = { ...local, [field]: e.target.value };
    setLocal(nv);
    applyChange(nv);
  };

  return (
    <aside className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform
        ${visible ? "translate-x-0" : "-translate-x-full"} transition-transform z-40`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={onClose}><FiX /></button>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label className="block mb-1">Sprint</label>
          <select
            value={local.sprint}
            onChange={handleLocalChange("sprint")}
            className="w-full border rounded p-2"
          >
            <option>All</option>
            <option>Sprint 10</option>
            <option>Sprint 11</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Risk</label>
          <select
            value={local.risk}
            onChange={handleLocalChange("risk")}
            className="w-full border rounded p-2"
          >
            <option>All</option>
            <option>With Risk</option>
            <option>No Risk</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
