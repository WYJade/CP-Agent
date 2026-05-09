"use client";

import { SavedCase } from "@/types/agent";

interface SidebarProps {
  currentView: "home" | "agents" | "cases" | "favorites";
  onNavigate: (view: "home" | "agents" | "cases" | "favorites") => void;
  savedCases: SavedCase[];
  onSelectCase: (c: SavedCase) => void;
}

export default function Sidebar({ currentView, onNavigate, savedCases, onSelectCase }: SidebarProps) {
  return (
    <div className="w-[220px] bg-[#12121f] border-r border-[#2a2a3e] flex flex-col h-full">
      {/* Logo / Account Area */}
      <div className="px-4 py-4 border-b border-[#2a2a3e]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">AI Agent Platform</p>
            <p className="text-sm font-medium text-white truncate">Agent Hub</p>
          </div>
          <button className="p-1 hover:bg-[#2a2a3e] rounded transition-colors">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <NavItem
          icon="home"
          label="Home"
          active={currentView === "home"}
          onClick={() => onNavigate("home")}
        />
        <NavItem
          icon="agents"
          label="AI Agents"
          active={currentView === "agents"}
          onClick={() => onNavigate("agents")}
        />
        <NavItem
          icon="cases"
          label="My Case Library"
          active={currentView === "cases"}
          onClick={() => onNavigate("cases")}
        />
        <NavItem
          icon="favorites"
          label="Favorites"
          active={currentView === "favorites"}
          onClick={() => onNavigate("favorites")}
        />

        {/* Saved Cases Sub-items */}
        {savedCases.length > 0 && (
          <div className="mt-4 pt-3 border-t border-[#2a2a3e]">
            <p className="px-2.5 text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-2">Saved Cases</p>
            {savedCases.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCase(c)}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] text-gray-500 hover:bg-[#1e1e32] hover:text-gray-300 transition-colors mb-0.5 truncate"
              >
                <svg className="w-3 h-3 flex-shrink-0 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="truncate">{c.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom User */}
      <div className="px-4 py-3 border-t border-[#2a2a3e]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-purple-700 flex items-center justify-center text-xs text-white font-medium">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-200 truncate">user@item.com</p>
            <p className="text-[10px] text-gray-500 truncate">user@item.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const getIcon = () => {
    switch (icon) {
      case "home":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case "agents":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "cases":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        );
      case "favorites":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs transition-colors mb-0.5 ${
        active
          ? "bg-purple-600/20 text-purple-400 font-medium"
          : "text-gray-400 hover:bg-[#1e1e32] hover:text-gray-200"
      }`}
    >
      {getIcon()}
      <span>{label}</span>
    </button>
  );
}
