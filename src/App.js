import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardMockup from "./pages/DashboardMockup";
 import ProjectsPage from "./pages/ProjectsPage";
 import IntegrationsPage from "./pages/IntegrationsPage";
import ChatPage from "./pages/ChatPage";
import InsightsPage from "./pages/InsightsPage";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wraps all routes that share Sidebar + Header */}
        <Route path="/" element={<Layout />}>
          {/* index → Dashboard */}
          <Route index element={<DashboardMockup />} />
           <Route path="projects" element={<ProjectsPage />} />
           <Route path="integrations" element={<IntegrationsPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="insights" element={<InsightsPage />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
