"use client";

import { ResultItem } from "@/components/ChatArea";
import { QuickAction } from "@/data/agents";
import { SavedCase } from "@/types/agent";
import { useTheme } from "@/context/ThemeContext";

interface ResultPanelProps {
  results: ResultItem[];
  quickActions: QuickAction[];
  onQuickAction: (label: string) => void;
  onSaveAsCase?: () => void;
  caseData: SavedCase | null;
}

export default function ResultPanel({ results, quickActions, onQuickAction, onSaveAsCase, caseData }: ResultPanelProps) {
  const { theme } = useTheme();
  const d = theme === "dark";
  const hasResults = results.length > 0;
  const panelWidth = hasResults ? "w-[600px]" : "w-[280px]";

  const handleExportXLS = () => {
    if (!caseData) return;
    const headers = caseData.tableColumns.join(",");
    const rows = caseData.tableData.map((row) => caseData.tableColumns.map((col) => row[col] ?? "").join(","));
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${caseData.name}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => { alert("Exporting as PDF..."); };
  const handleDownloadImage = () => { alert("Downloading as image..."); };

  const handleCopyLink = () => {
    const text = caseData ? `${caseData.name} - ${caseData.summary.map(s => `${s.label}: ${s.value}`).join(", ")}` : window.location.href;
    navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  };

  return (
    <div className={`${panelWidth} border-l flex flex-col flex-shrink-0 transition-all duration-300 ${d ? "border-[#2a2a3e] bg-[#0d0d1a]" : "border-gray-200 bg-gray-50"}`}>
      {/* Panel Header */}
      <div className={`h-11 border-b flex items-center px-4 flex-shrink-0 ${d ? "border-[#2a2a3e] bg-[#12121f]" : "border-gray-200 bg-white"}`}>
        <span className={`text-xs font-medium ${d ? "text-gray-300" : "text-gray-700"}`}>
          {hasResults ? "Results" : "Quick Actions"}
        </span>
        {hasResults && (
          <div className="ml-auto flex items-center gap-1">
            <button onClick={handleCopyLink} className={`p-1.5 rounded transition-colors ${d ? "hover:bg-[#2a2a3e]" : "hover:bg-gray-100"}`} title="Copy Link">
              <svg className={`w-3.5 h-3.5 ${d ? "text-gray-400" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            </button>
            <button onClick={handleDownloadImage} className={`p-1.5 rounded transition-colors ${d ? "hover:bg-[#2a2a3e]" : "hover:bg-gray-100"}`} title="Download Image">
              <svg className={`w-3.5 h-3.5 ${d ? "text-gray-400" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </button>
            <button onClick={handleExportPDF} className={`p-1.5 rounded transition-colors ${d ? "hover:bg-[#2a2a3e]" : "hover:bg-gray-100"}`} title="Export PDF">
              <svg className={`w-3.5 h-3.5 ${d ? "text-gray-400" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </button>
            <button onClick={handleExportXLS} className={`p-1.5 rounded transition-colors ${d ? "hover:bg-[#2a2a3e]" : "hover:bg-gray-100"}`} title="Export XLS">
              <svg className={`w-3.5 h-3.5 ${d ? "text-gray-400" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </button>
            {onSaveAsCase && (
              <button onClick={onSaveAsCase} className="flex items-center gap-1 px-2 py-1 text-[10px] text-purple-500 hover:bg-purple-600/10 rounded transition-colors border border-purple-500/20 ml-1" title="Save to My Case Library">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                Save
              </button>
            )}
          </div>
        )}
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto">
        {hasResults && caseData ? (
          <CaseInlineView caseData={caseData} />
        ) : (
          <div className="p-4">
            <div className="space-y-1.5">
              {quickActions.map((action, i) => (
                <button key={i} onClick={() => onQuickAction(action.label)} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md border transition-colors text-left group ${d ? "border-[#2a2a3e] hover:border-purple-600/30 hover:bg-purple-600/5" : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"}`}>
                  <QuickActionIcon icon={action.icon} color={action.color} />
                  <span className={`text-[11px] transition-colors truncate ${d ? "text-gray-400 group-hover:text-gray-200" : "text-gray-600 group-hover:text-gray-900"}`}>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CaseInlineView({ caseData }: { caseData: SavedCase }) {
  // Always rendered inside the panel which handles outer bg
  return (
    <div className="min-h-full px-6 pt-6 pb-6 space-y-5">
      {/* Title */}
      <div>
        <h2 className="text-base font-bold text-white">{caseData.name}</h2>
        <p className="text-[10px] text-gray-500 mt-0.5">Real-time overview with alerts and detailed records</p>
      </div>

      {/* Summary Cards */}
      <div>
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Overview</p>
        <div className="grid grid-cols-2 gap-3">
          {caseData.summary.map((card, i) => {
            const borderColor = { purple: "border-l-purple-500", green: "border-l-green-500", orange: "border-l-orange-500", blue: "border-l-blue-500" }[card.color];
            const changeColor = card.changeType === "up" ? "text-green-400" : card.changeType === "down" ? "text-red-400" : "text-gray-500";
            return (
              <div key={i} className={`bg-[#12121f] border border-[#2a2a3e] border-l-4 ${borderColor} rounded-lg p-4`}>
                <p className="text-[10px] text-gray-500">{card.label}</p>
                <p className="text-xl font-bold text-white mt-1">{card.value}</p>
                {card.change && <p className={`text-[9px] mt-1 ${changeColor}`}>{card.change}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Alerts */}
      {caseData.alerts.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Alerts & Recommendations</p>
          <div className="space-y-2">
            {caseData.alerts.map((alert, i) => {
              const styles = { warning: "bg-orange-900/20 border-orange-700/30 text-orange-300", info: "bg-blue-900/20 border-blue-700/30 text-blue-300", success: "bg-green-900/20 border-green-700/30 text-green-300" };
              const icons = { warning: "⚠️", info: "ℹ️", success: "✅" };
              return (<div key={i} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-[11px] ${styles[alert.type]}`}><span>{icons[alert.type]}</span><span>{alert.message}</span></div>);
            })}
          </div>
        </div>
      )}

      {/* Table */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Detail Records</p>
          <span className="text-[9px] text-gray-600">{caseData.tableData.length} records</span>
        </div>
        <div className="bg-[#12121f] border border-[#2a2a3e] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead><tr className="border-b border-[#2a2a3e] bg-[#1a1a2e]">{caseData.tableColumns.map((col) => (<th key={col} className="text-left px-4 py-2.5 font-medium text-gray-400 whitespace-nowrap">{col}</th>))}</tr></thead>
              <tbody>{caseData.tableData.map((row, i) => (<tr key={i} className="border-b border-[#1e1e32] hover:bg-[#1a1a2e]">{caseData.tableColumns.map((col) => (<td key={col} className="px-4 py-2.5 text-gray-300 whitespace-nowrap">{col === "Status" ? <StatusBadge value={String(row[col])} /> : String(row[col] ?? "")}</td>))}</tr>))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ value }: { value: string }) {
  const lower = value.toLowerCase();
  let cls = "bg-gray-800 text-gray-300";
  if (lower === "normal" || lower === "healthy") cls = "bg-green-900/40 text-green-400";
  if (lower === "low" || lower === "warning") cls = "bg-yellow-900/40 text-yellow-400";
  if (lower === "critical" || lower === "out" || lower === "overdue") cls = "bg-red-900/40 text-red-400";
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${cls}`}>{value}</span>;
}

function QuickActionIcon({ icon, color }: { icon: string; color: string }) {
  const colorMap: Record<string, string> = { purple: "text-purple-400", yellow: "text-yellow-400", blue: "text-blue-400", green: "text-green-400", orange: "text-orange-400" };
  const textColor = colorMap[color] || "text-gray-400";
  switch (icon) {
    case "chart": return (<svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>);
    case "warning": return (<svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>);
    case "table": return (<svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>);
    case "report": return (<svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
    case "forecast": return (<svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>);
    case "optimize": return (<svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>);
    default: return null;
  }
}
