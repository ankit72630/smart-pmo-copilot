// src/components/CalendarHeatmap.jsx
import React from "react";
import Heatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

// compute last year… same as before
const today = new Date();
const lastYear = new Date();
lastYear.setFullYear(today.getFullYear() - 1);

// month names
const monthLabels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// mock values… same as before
const values = Array.from({ length: 365 }).map((_, i) => {
  const d = new Date(lastYear);
  d.setDate(d.getDate() + i);
  return { date: d.toISOString().slice(0,10), count: Math.floor(Math.random()*4) };
});

export default function CalendarHeatmapCard() {
  return (
    <div className="card">
      <h2 className="font-semibold mb-2" title="Days with more risk events are darker">
        Risk Heatmap
      </h2>
      <Heatmap
        startDate={lastYear}
        endDate={today}

        /** NEW: show month labels on top **/
        showMonthLabels
        monthLabels={monthLabels}

        /** tighten up the grid **/
        gutterSize={1}
        showWeekdayLabels

        /** manually fill each day **/
        transformDayElement={(rect, value, index) => {
          // compute the correct fill color
          const count = value?.count || 0;
          const fillColor =
            count >= 3 ? "#dc2626" :
            count >= 2 ? "#f87171" :
            count >= 1 ? "#fee2e2" :
            "#f3f4f6";

          // clone the existing <rect> and override its style.fill
          return React.cloneElement(rect, {
            style: { ...rect.props.style, fill: fillColor }
          });
        }}

        values={values}
      />
    </div>
  );
}
