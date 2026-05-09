"use client";

import { SavedCase } from "@/types/agent";
import { useTheme } from "@/context/ThemeContext";

interface SidebarProps {
  currentView: "home" | "agents" | "cases" | "favorites";
  onNavigate: (view: "home" | "agents" | "cases" | "favorites") => void;
  savedCases: SavedCase[];
  onSelectCase: (c: SavedCase) => void;
}

export default function Sidebar({ currentView, onNavigate, savedCases, onSelectCase }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const d = theme === "dark";

  return (
    <div className={`w-[220px] border-r flex flex-col h-full ${d ? "bg-[#12121f] border-[#2a2a3e]" : "bg-white border-gray-200"}`}>
      {/* Logo */}
      <div className={`px-4 py-4 border-b ${d ? "border-[#2a2a3e]" : "border-gray-200"}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs ${d ? "text-gray-400" : "text-gray-500"}`}>AI Agent Platform</p>
            <p className={`text-sm font-medium truncate ${d ? "text-white" : "text-gray-900"}`}>Agent Hub</p>
          </div>
          <button onClick={toggleTheme} className={`p-1 rounded transition-colors ${d ? "hover:bg-[#2a2a3e]" : "hover:bg-gray-100"}`} title="Toggle theme">
            {d ? (
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <NavItem icon="home" label="Home" active={currentView === "home"} onClick={() => onNavigate("home")} dark={d} />
        <NavItem icon="agents" label="AI Agents" active={currentView === "agents"} onClick={() => onNavigate("agents")} dark={d} />
        <NavItem icon="cases" label="My Case Library" active={currentView === "cases"} onClick={() => onNavigate("cases")} dark={d} />
        <NavItem icon="favorites" label="Favorites" active={currentView === "favorites"} onClick={() => onNavigate("favorites")} dark={d} />

        {savedCases.length > 0 && (
          <div className={`mt-4 pt-3 border-t ${d ? "border-[#2a2a3e]" : "border-gray-200"}`}>
            <p className={`px-2.5 text-[10px] font-semibold uppercase tracking-wider mb-2 ${d ? "text-gray-600" : "text-gray-400"}`}>Saved Cases</p>
            {savedCases.map((c) => (
              <button key={c.id} onClick={() => onSelectCase(c)} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] transition-colors mb-0.5 truncate ${d ? "text-gray-500 hover:bg-[#1e1e32] hover:text-gray-300" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}>
                <svg className={`w-3 h-3 flex-shrink-0 ${d ? "text-gray-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <span className="truncate">{c.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom User */}
      <div className={`px-4 py-3 border-t ${d ? "border-[#2a2a3e]" : "border-gray-200"}`}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-purple-700 flex items-center justify-center text-xs text-white font-medium">U</div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-medium truncate ${d ? "text-gray-200" : "text-gray-700"}`}>user@item.com</p>
            <p className={`text-[10px] truncate ${d ? "text-gray-500" : "text-gray-400"}`}>user@item.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick, dark }: { icon: string; label: string; active?: boolean; onClick?: () => void; dark: boolean }) {
  const getIcon = () => {
    switch (icon) {
      case "home": return (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>);
      case "agents": return (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>);
      case "cases": return (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>);
      case "favorites": return (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>);
      default: return null;
    }
  };

  const activeClass = dark ? "bg-purple-600/20 text-purple-400 font-medium" : "bg-purple-50 text-purple-700 font-medium";
  const inactiveClass = dark ? "text-gray-400 hover:bg-[#1e1e32] hover:text-gray-200" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

  return (
    <button onClick={onClick} className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs transition-colors mb-0.5 ${active ? activeClass : inactiveClass}`}>
      {getIcon()}
      <span>{label}</span>
    </button>
  );
}
