"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AgentsGrid from "@/components/AgentsGrid";
import ChatArea from "@/components/ChatArea";
import MyCaseLibrary from "@/components/MyCaseLibrary";
import CasePage from "@/components/CasePage";
import { AgentInfo, allAgents } from "@/data/agents";
import { SavedCase } from "@/types/agent";
import { useTheme } from "@/context/ThemeContext";

type View = "home" | "agents" | "cases" | "favorites";

export default function Home() {
  const { theme } = useTheme();
  const d = theme === "dark";
  const [currentView, setCurrentView] = useState<View>("agents");
  const [selectedAgent, setSelectedAgent] = useState<AgentInfo | null>(null);
  const [initialMessage, setInitialMessage] = useState<string>("");
  const [savedCases, setSavedCases] = useState<SavedCase[]>([]);
  const [viewingCase, setViewingCase] = useState<SavedCase | null>(null);

  const handleSelectAgent = (agent: AgentInfo) => {
    setInitialMessage("");
    setSelectedAgent(agent);
    setViewingCase(null);
  };

  const handleBack = () => {
    setSelectedAgent(null);
    setInitialMessage("");
  };

  const handleChat = (message: string) => {
    const defaultAgent = allAgents[0];
    setInitialMessage(message);
    setSelectedAgent(defaultAgent);
  };

  const handleSaveCase = (caseData: SavedCase) => {
    setSavedCases((prev) => [caseData, ...prev]);
  };

  const handleViewCase = (c: SavedCase) => {
    setViewingCase(c);
    setSelectedAgent(null);
  };

  const handleBackFromCase = () => {
    setViewingCase(null);
  };

  return (
    <div className={`flex h-screen ${d ? "bg-[#1a1a2e]" : "bg-gray-50"}`}>
      {/* Left Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setSelectedAgent(null);
          setViewingCase(null);
        }}
        savedCases={savedCases}
        onSelectCase={handleViewCase}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {viewingCase ? (
          <CasePage caseData={viewingCase} onBack={handleBackFromCase} isSaved={true} />
        ) : selectedAgent ? (
          <ChatArea
            agent={selectedAgent}
            onBack={handleBack}
            initialMessage={initialMessage}
            onSaveCase={handleSaveCase}
          />
        ) : currentView === "agents" ? (
          <AgentsGrid onSelectAgent={handleSelectAgent} onChat={handleChat} />
        ) : currentView === "cases" ? (
          <MyCaseLibrary cases={savedCases} onSelectCase={handleViewCase} />
        ) : currentView === "home" ? (
          <div className={`flex-1 flex items-center justify-center ${d ? "bg-[#0d0d1a]" : "bg-white"}`}>
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${d ? "bg-purple-600/10" : "bg-purple-50"}`}>
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <h2 className={`text-lg font-semibold mb-2 ${d ? "text-white" : "text-gray-900"}`}>Welcome to AI Agents</h2>
              <p className={`text-xs ${d ? "text-gray-500" : "text-gray-500"}`}>Select an agent from the Agents tab to get started.</p>
            </div>
          </div>
        ) : (
          <div className={`flex-1 flex items-center justify-center ${d ? "bg-[#0d0d1a]" : "bg-white"}`}>
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${d ? "bg-purple-600/10" : "bg-purple-50"}`}>
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              </div>
              <h2 className={`text-lg font-semibold mb-2 ${d ? "text-white" : "text-gray-900"}`}>Favorites</h2>
              <p className={`text-xs ${d ? "text-gray-500" : "text-gray-500"}`}>Your favorite agents will appear here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
