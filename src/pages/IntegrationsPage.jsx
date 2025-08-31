import React, { useState } from "react";
import {
  SiJira,
  SiTrello,
  SiAsana,
  SiMicrosoftazure ,  // ✅ correct export name
} from "react-icons/si";
import { FiLayers } from "react-icons/fi";


export default function IntegrationsPage() {
  const [connections, setConnections] = useState({
    jira: false,
    trello: false,
    asana: false,
    azure: false,
  });

  const toggleConnection = (key) => {
    setConnections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const integrations = [
    {
      key: "jira",
      name: "Jira",
      icon: <SiJira className="text-blue-600 w-8 h-8" />,
      desc: "Track issues, sprints and backlog with Atlassian Jira.",
    },
    {
      key: "trello",
      name: "Trello",
      icon: <SiTrello className="text-cyan-500 w-8 h-8" />,
      desc: "Manage boards, tasks and workflows with Trello.",
    },
    {
      key: "asana",
      name: "Asana",
      icon: <SiAsana className="text-pink-500 w-8 h-8" />,
      desc: "Organize tasks, projects, and OKRs with Asana.",
    },
    {
      key: "azure",
      name: "Azure DevOps",
      icon: <FiLayers className="text-indigo-600 w-8 h-8" />,
      desc: "Plan, build, and ship with Microsoft Azure DevOps.",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Integrations</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Connect Smart PMO Copilot with your favorite project management tools.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {integrations.map((app) => (
          <div
            key={app.key}
            className="flex flex-col border rounded-xl shadow-sm p-5 bg-white dark:bg-gray-800 transition hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-3">
              {app.icon}
              <h2 className="text-lg font-semibold">{app.name}</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
              {app.desc}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  connections[app.key]
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {connections[app.key] ? "Connected" : "Not Connected"}
              </span>
              <button
                onClick={() => toggleConnection(app.key)}
                className={`px-4 py-1.5 rounded text-sm font-medium transition ${
                  connections[app.key]
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {connections[app.key] ? "Disconnect" : "Connect"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
