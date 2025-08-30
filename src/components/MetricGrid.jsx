import React from "react";
import MetricCard from "./MetricCard";

export default function MetricGrid({ metrics }) {
  return (
    <div className="flex flex-wrap gap-6 mb-6">
      {metrics.map((m) => (
        <MetricCard
          key={m.label}
          icon={m.icon}
          label={m.label}
          value={m.value}
          accent={m.accent}
        />
      ))}
    </div>
  );
}
