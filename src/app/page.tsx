"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AgentsGrid from "@/components/AgentsGrid";
import ChatArea from "@/components/ChatArea";
import { AgentInfo } from "@/data/agents";

type View = "home" | "agents" | "favorites";

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("agents");
  const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(null);

  const handleSelectAgent = (agent: AgentInfo) => {
    setSelectedAgent(agent);
  };

  const handleBack = () => {
    setSelectedAgent(null);
  };

  return (
    <div className="flex h-screen bg-[#1a1a2e]">
      {/* Left Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setSelectedAgent(null);
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content Area */}
        {selectedAgent ? (
          <ChatArea agent={selectedAgent} onBack={handleBack} />
        ) : currentView === "agents" ? (
          <AgentsGrid onSelectAgent={handleSelectAgent} />
        ) : currentView === "home" ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-600/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Welcome to AI Agents</h2>
              <p className="text-xs text-gray-500">Select an agent from the Agents tab to get started.</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-600/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Favorites</h2>
              <p className="text-xs text-gray-500">Your favorite agents will appear here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
