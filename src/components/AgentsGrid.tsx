"use client";

import { useState } from "react";
import { agentCategories, AgentInfo } from "@/data/agents";
import { useTheme } from "@/context/ThemeContext";

interface AgentsGridProps {
  onSelectAgent: (agent: AgentInfo) => void;
  onChat: (message: string) => void;
}

function getAgentIcon(agentId: string) {
  const cls = "w-4 h-4";
  switch (agentId) {
    case "purchase-assistant":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
    case "supplier-assistant":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
    case "quote-agent":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>);
    case "inbound-agent":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>);
    case "inventory-advisor":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>);
    case "sales-assistant":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>);
    case "work-order-agent":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>);
    case "outbound-agent":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>);
    case "dispatch-coordinator":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>);
    case "yms-agent":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>);
    case "small-parcel-agent":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>);
    case "ltl-agent":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>);
    case "supply-chain-agent":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>);
    case "exception-handler":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>);
    case "finance-specialist":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
    case "system-profile-agent":
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
    default:
      return (<svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>);
  }
}

export default function AgentsGrid({ onSelectAgent, onChat }: AgentsGridProps) {
  const { theme } = useTheme();
  const d = theme === "dark";
  const [chatValue, setChatValue] = useState("");
  // Default: Procurement collapsed, Inbound and Outbound expanded
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({
    0: false,
    1: true,
    2: true,
  });

  const rows: { title: string; agents: AgentInfo[] }[] = [
    {
      title: "Procurement",
      agents: agentCategories.find((c) => c.id === "procurement")!.agents.filter((a) => a.id !== "quote-agent"),
    },
    {
      title: "Inbound · Inventory · Order Processing",
      agents: [
        ...agentCategories.find((c) => c.id === "inbound")!.agents,
        ...agentCategories.find((c) => c.id === "inventory")!.agents,
        ...agentCategories.find((c) => c.id === "order-processing")!.agents,
      ],
    },
    {
      title: "Outbound · Transportation & Logistics",
      agents: [
        ...agentCategories.find((c) => c.id === "outbound")!.agents,
        ...agentCategories.find((c) => c.id === "transportation-logistics")!.agents,
        ...agentCategories.find((c) => c.id === "procurement")!.agents.filter((a) => a.id === "quote-agent"),
      ],
    },
    {
      title: "Supply Chain · Exception · Finance · System",
      agents: [
        ...agentCategories.find((c) => c.id === "supply-chain-analysis")!.agents,
        ...agentCategories.find((c) => c.id === "exception-handling")!.agents,
        ...agentCategories.find((c) => c.id === "finance")!.agents,
        ...agentCategories.find((c) => c.id === "system-profile")!.agents,
      ],
    },
  ];

  const toggleSection = (idx: number) => {
    setExpandedSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSend = () => {
    if (!chatValue.trim()) return;
    onChat(chatValue);
    setChatValue("");
  };

  return (
    <div className={`flex-1 flex flex-col overflow-hidden ${d ? "bg-[#0d0d1a]" : "bg-white"}`}>
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="max-w-6xl mx-auto px-10 py-10">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className={`text-2xl font-bold ${d ? "text-white" : "text-gray-900"}`}>AI Agents</h1>
            <p className={`text-sm mt-1 ${d ? "text-gray-500" : "text-gray-500"}`}>
              Select an agent to start a conversation and get intelligent assistance.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-5">
            {rows.map((row, idx) => {
              const isExpanded = expandedSections[idx] ?? false;
              return (
                <section key={idx}>
                  <button onClick={() => toggleSection(idx)} className="w-full flex items-center justify-between mb-3 group">
                    <h2 className={`text-xs font-medium ${d ? "text-gray-500 group-hover:text-gray-300" : "text-gray-500 group-hover:text-gray-700"} transition-colors`}>{row.title}</h2>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] ${d ? "text-gray-600" : "text-gray-400"}`}>{row.agents.length} agents</span>
                      <svg className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""} ${d ? "text-gray-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px border rounded-lg overflow-hidden ${d ? "bg-[#1e1e32] border-[#1e1e32]" : "bg-gray-200 border-gray-200"}`}>
                      {row.agents.map((agent) => (
                        <button key={agent.id} onClick={() => onSelectAgent(agent)} className={`text-left p-5 transition-colors group ${d ? "bg-[#12121f] hover:bg-[#1a1a2e]" : "bg-white hover:bg-gray-50"}`}>
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${d ? "bg-purple-600/10 border border-purple-500/20 text-purple-400 group-hover:bg-purple-600/20" : "bg-purple-50 border border-purple-200 text-purple-600 group-hover:bg-purple-100"}`}>
                              {getAgentIcon(agent.id)}
                            </div>
                            <h3 className={`text-sm font-semibold transition-colors ${d ? "text-purple-400 group-hover:text-purple-300" : "text-purple-700 group-hover:text-purple-800"}`}>{agent.name}</h3>
                          </div>
                          <p className={`text-[11px] leading-relaxed line-clamp-2 transition-colors pl-[42px] ${d ? "text-gray-500 group-hover:text-gray-400" : "text-gray-500 group-hover:text-gray-600"}`}>{agent.description}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Chat Input */}
      <div className={`flex-shrink-0 border-t px-10 py-4 ${d ? "border-[#1e1e32] bg-[#12121f]" : "border-gray-200 bg-white"}`}>
        <div className="max-w-6xl mx-auto">
          <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-colors ${d ? "border-[#2a2a3e] bg-[#0d0d1a] focus-within:border-purple-500/40" : "border-gray-300 bg-white focus-within:border-purple-400"}`}>
            <svg className={`w-5 h-5 flex-shrink-0 ${d ? "text-gray-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <input type="text" value={chatValue} onChange={(e) => setChatValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Hi! I'm your AI assistant. Ask me anything — e.g. 'Check inventory status' or 'Help me create a purchase order'..." className={`flex-1 outline-none text-sm bg-transparent ${d ? "text-gray-200 placeholder-gray-600" : "text-gray-700 placeholder-gray-400"}`} />
            <button onClick={handleSend} className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
          <p className={`text-[10px] mt-2 text-center ${d ? "text-gray-600" : "text-gray-400"}`}>Press Enter to send · I'll route your question to the best agent automatically</p>
        </div>
      </div>
    </div>
  );
}
