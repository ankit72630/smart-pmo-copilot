// src/pages/ProjectsPage.jsx
import React, { useState, useMemo } from "react";
import { FiLayers, FiAlertTriangle, FiSlash, FiTrendingUp, FiClock, FiActivity } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import {
  FiFilter,
  FiMessageCircle,
  FiFileText,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import MetricGrid       from "../components/MetricGrid";
import FilterSidebar    from "../components/FilterSidebar";
import ChatDrawer       from "../components/ChatDrawer";
import GanttChartCard   from "../components/GanttChart";
import SuggestionsPanel from "../components/SuggestionsPanel";

export default function ProjectsPage() {
  // ─── Mock data loaded immediately ────────────────────
  const mockProjects = [
    {
      id: 1,
      name: "Project Alpha",
      status: "On track",
      summary: "12 tasks done, velocity stable.",
      riskScore: 2,
      completePct: 0.75,
      nextMilestone: "2025-07-15",
      lastUpdated: "2025-07-01T10:00:00Z",
      velocity: 12,
      cycleTime: 3.4,
      timeline: [
        { task: "Design",   start: 0, end: 3 },
        { task: "Backend",  start: 2, end: 6 },
        { task: "Frontend", start: 4, end: 8 },
        { task: "QA",       start: 7, end: 10 },
      ],
      suggestions: [
        "Reassign 2 QA engineers to unblock UI testing.",
        "Defer Feature X to recover 2 days.",
      ],
    },
    {
      id: 2,
      name: "Project Beta",
      status: "At risk",
      summary: "Velocity down 20%, API delays.",
      riskScore: 4,
      completePct: 0.48,
      nextMilestone: "2025-07-20",
      lastUpdated: "2025-06-28T14:30:00Z",
      velocity: 8,
      cycleTime: 4.8,
      timeline: [
        { task: "Design",   start: 0, end: 2 },
        { task: "Backend",  start: 1, end: 5 },
        { task: "Frontend", start: 5, end: 9 },
        { task: "QA",       start: 9, end: 11 },
      ],
      suggestions: [
        "Add a backend developer to reduce delays.",
        "Hold off integration tests until stable.",
      ],
    },
  ];

  const [projects] = useState(mockProjects);

  // ─── Filters, Search & Sort ───────────────────────────
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters]         = useState({ status: "All", riskLevel: "All" });
  const [search, setSearch]           = useState("");
  const [sortBy, setSortBy]           = useState("name");
  const [sortDir, setSortDir]         = useState("asc");

  const filtered = useMemo(() => {
    let arr = projects.filter((p) => {
      if (filters.status !== "All" && p.status !== filters.status) return false;
      if (filters.riskLevel === "High"   && p.riskScore < 3) return false;
      if (filters.riskLevel === "Medium" && (p.riskScore < 2 || p.riskScore >= 3)) return false;
      if (filters.riskLevel === "Low"    && p.riskScore >= 2) return false;
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
    });
    arr.sort((a, b) => {
      let v1 = a[sortBy], v2 = b[sortBy];
      if (sortBy === "completePct") { v1 = a.completePct; v2 = b.completePct; }
      if (v1 < v2) return sortDir === "asc" ? -1 : 1;
      if (v1 > v2) return sortDir === "asc" ? 1  : -1;
      return 0;
    });
    return arr;
  }, [projects, filters, search, sortBy, sortDir]);

  // ─── Pagination ───────────────────────────────────────
  const [page, setPage] = useState(0);
  const pageSize  = 5;
  const pageCount = Math.ceil(filtered.length / pageSize);
  const pageData  = filtered.slice(page * pageSize, (page + 1) * pageSize);

  // ─── KPI cards ────────────────────────────────────────
  const total   = filtered.length;
  const atRisk  = filtered.filter(p => p.status === "At risk").length;
  const blocked = filtered.filter(p => p.status === "Blocked").length;
  const avgVel  = (filtered.reduce((sum,p)=>sum+p.velocity, 0)/(total||1)).toFixed(1);
  const avgCt   = (filtered.reduce((sum,p)=>sum+p.cycleTime,0)/(total||1)).toFixed(1);

  

const kpis = [
  { 
    label: "Total Projects",  
    value: total,  
    icon: FiLayers, 
    accent: "text-blue-600", 
    subtext: "all portfolios", 
    onClick: () => { setFilters({ status: "All", riskLevel: "All" }); setPage(0); }
  },
  { 
    label: "At Risk",         
    value: atRisk, 
    icon: FiAlertTriangle, 
    accent: "text-red-500", 
    subtext: "needs attention", 
    onClick: () => { setFilters(f => ({ ...f, status: "At risk" })); setPage(0); }
  },
  { 
    label: "Blocked",         
    value: blocked, 
    icon: FiSlash, 
    accent: "text-yellow-600", 
    subtext: "not progressing", 
    onClick: () => { setFilters(f => ({ ...f, status: "Blocked" })); setPage(0); }
  },
  { 
    label: "Avg. Velocity",   
    value: `${avgVel} t/s`, 
    icon: FiTrendingUp, 
    accent: "text-green-600", 
    subtext: "tasks per sprint" 
  },
  { 
    label: "Avg. Cycle Time", 
    value: `${avgCt} d`, 
    icon: FiClock, 
    accent: "text-purple-600", 
    subtext: "avg across sprints" 
  },
  { 
    label: "Overall Health",  
    value: "75%", 
    icon: FiActivity, 
    accent: "text-teal-600", 
    subtext: "portfolio status" 
  },
];

  // ─── Selection & Actions ───────────────────────────────
  const [selected, setSelected]     = useState(null);
  const [chatProject, setChatProject] = useState(null);
  const [chatOpen, setChatOpen]       = useState(false);
  const [busy, setBusy]               = useState({});

  const openChat  = p => { setChatProject(p); setChatOpen(true); };
  const runReport = p => {
    setBusy(b => ({ ...b, [p.id]: true }));
    setTimeout(() => setBusy(b => ({ ...b, [p.id]: false })), 800);
  };

  return (
    <div className="space-y-8">
      {/* Filter Drawer */}
      <FilterSidebar
        visible={filtersOpen}
        onClose={()=>setFiltersOpen(false)}
        filters={filters}
        onChange={setFilters}
      />

      {/* KPI Row */}
      <MetricGrid
        metrics={kpis}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      />

      {/* Search & Filter */}
      <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
        <input
          type="text"
          placeholder="Search projects…"
          value={search}
          onChange={e=>{setSearch(e.target.value);setPage(0)}}
          className="px-3 py-2 border rounded flex-1 min-w-[200px]"
          aria-label="Search projects"
        />
        <button
          onClick={()=>setFiltersOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded flex items-center"
        >
          <FiFilter className="mr-1"/> Filters
        </button>
      </div>

      {/* Projects Table */}
      <div className="overflow-x-auto">
        <table className="table-fixed w-full text-left">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th
                className="w-2/12 px-4 py-2 font-medium text-gray-700"
                onClick={()=>{setSortBy("name");setSortDir(d=>d==="asc"?"desc":"asc")}}
              >
                Project {sortBy==="name"?(sortDir==="asc"?"▲":"▼"):""}
              </th>
              <th className="w-2/12 px-4 py-2 font-medium text-gray-700">Status</th>
              <th className="w-4/12 px-4 py-2 font-medium text-gray-700">AI Summary</th>
              <th
                className="w-1/12 px-4 py-2 font-medium text-gray-700"
                onClick={()=>{setSortBy("riskScore");setSortDir(d=>d==="asc"?"desc":"asc")}}
              >
                Risk Score {sortBy==="riskScore"?(sortDir==="asc"?"▲":"▼"):""}
              </th>
              <th
                className="w-1/12 px-4 py-2 font-medium text-gray-700"
                onClick={()=>{setSortBy("completePct");setSortDir(d=>d==="asc"?"desc":"asc")}}
              >
                % Complete {sortBy==="completePct"?(sortDir==="asc"?"▲":"▼"):""}
              </th>
              <th className="w-1/12 px-4 py-2 font-medium text-gray-700 hidden lg:table-cell">
                Next Milestone
              </th>
              <th className="w-1/12 px-4 py-2 font-medium text-gray-700 hidden lg:table-cell">
                Last Updated
              </th>
              <th className="w-1/12 px-4 py-2 font-medium text-gray-700 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                  No projects match your criteria.
                </td>
              </tr>
            ) : pageData.map(p => (
              <tr
                key={p.id}
                className={`border-t hover:bg-gray-50 cursor-pointer ${selected?.id===p.id?"bg-gray-100":""}`}
                onClick={()=>setSelected(p)}
              >
                <td className="px-4 py-2 break-words">{p.name}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-sm text-white rounded-full ${
                    p.status==="On track"?"bg-green-500":
                    p.status==="At risk"?"bg-yellow-500":"bg-red-500"
                  }`}>{p.status}</span>
                </td>
                <td className="px-4 py-2 break-words text-sm line-clamp-2" title={p.summary}>
                  {p.summary}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{p.riskScore}</td>
                <td className="px-4 py-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="h-2 bg-primary" style={{width:`${p.completePct*100}%`}}/>
                  </div>
                  <div className="text-xs mt-1">{(p.completePct*100).toFixed(0)}%</div>
                </td>
                <td className="px-4 py-2 hidden lg:table-cell">{p.nextMilestone}</td>
                <td className="px-4 py-2 hidden lg:table-cell">
                  {formatDistanceToNow(new Date(p.lastUpdated),{addSuffix:true})}
                </td>
                <td className="px-4 py-2 text-center space-x-2 flex">
                  <button
                    onClick={e=>{e.stopPropagation();openChat(p)}}
                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    aria-label={`Chat about ${p.name}`}
                  >
                    <FiMessageCircle/>
                  </button>
                  <button
                    onClick={e=>{e.stopPropagation();runReport(p)}}
                    className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                    aria-label={`Generate report for ${p.name}`}
                  >
                    {busy[p.id]?"…":<FiFileText/>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center space-x-3">
        <button
          onClick={()=>setPage(p=>Math.max(p-1,0))}
          disabled={page===0}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          aria-label="Previous page"
        >
          <FiChevronLeft/>
        </button>
        <span>{page+1} / {pageCount||1}</span>
        <button
          onClick={()=>setPage(p=>Math.min(p+1,pageCount-1))}
          disabled={page>=pageCount-1}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          aria-label="Next page"
        >
          <FiChevronRight/>
        </button>
      </div>

      {/* Detail pane */}
      {selected && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GanttChartCard data={selected.timeline} />
          <SuggestionsPanel suggestions={selected.suggestions} />
        </div>
      )}

      {/* Chat Drawer */}
      <ChatDrawer
        open={chatOpen}
        project={chatProject}
        onClose={()=>setChatOpen(false)}
      />
    </div>
  );
}
