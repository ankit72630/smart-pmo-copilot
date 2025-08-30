import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardMockup from "./pages/DashboardMockup";
 import ProjectsPage from "./pages/ProjectsPage";
import ChatPage from "./pages/ChatPage";
/*import RisksPage from "./pages/RisksPage";
import CompliancePage from "./pages/CompliancePage";
import BriefingsPage from "./pages/BriefingsPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import CommandsPage from "./pages/CommandsPage";
import InboxPage from "./pages/InboxPage";
import ExportPage from "./pages/ExportPage";
import PDFPage from "./pages/PDFPage";
import NotFound from "./pages/NotFound"; */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wraps all routes that share Sidebar + Header */}
        <Route path="/" element={<Layout />}>
          {/* index → Dashboard */}
          <Route index element={<DashboardMockup />} />
           <Route path="projects" element={<ProjectsPage />} />
            <Route path="chat" element={<ChatPage />} />
          {/*<Route path="risks" element={<RisksPage />} />
          <Route path="compliance" element={<CompliancePage />} />
          <Route path="briefings" element={<BriefingsPage />} />
          <Route path="integrations" element={<IntegrationsPage />} />
          <Route path="commands" element={<CommandsPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="export" element={<ExportPage />} />
          <Route path="pdf" element={<PDFPage />} /> */}
          {/* 404 */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
