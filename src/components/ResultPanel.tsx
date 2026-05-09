"use client";

import { ResultItem } from "@/components/ChatArea";
import { QuickAction } from "@/data/agents";
import { SavedCase } from "@/types/agent";

interface ResultPanelProps {
  results: ResultItem[];
  quickActions: QuickAction[];
  onQuickAction: (label: string) => void;
  onSaveAsCase?: () => void;
  caseData: SavedCase | null;
}

export default function ResultPanel({ results, quickActions, onQuickAction, onSaveAsCase, caseData }: ResultPanelProps) {
  const hasResults = results.length > 0;
  const panelWidth = hasResults ? "w-[520px]" : "w-[280px]";

  const handleExport = () => {
    if (!caseData) return;
    const headers = caseData.tableColumns.join(",");
    const rows = caseData.tableData.map((row) =>
      caseData.tableColumns.map((col) => row[col] ?? "").join(",")
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${caseData.name}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    const text = caseData ? `${caseData.name} - ${caseData.summary.map(s => `${s.label}: ${s.value}`).join(", ")}` : "";
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className={`${panelWidth} border-l border-[#2a2a3e] bg-[#12121f] flex flex-col flex-shrink-0 transition-all duration-300`}>
      {/* Panel Header */}
      <div className="h-11 border-b border-[#2a2a3e] flex items-center px-4 flex-shrink-0">
        <span className="text-xs font-medium text-gray-300">
          {hasResults ? "Results" : "Quick Actions"}
        </span>
        {hasResults && (
          <div className="ml-auto flex items-center gap-1.5">
            <button onClick={handleShare} className="p-1 hover:bg-[#2a2a3e] rounded transition-colors" title="Share">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button onClick={handleExport} className="p-1 hover:bg-[#2a2a3e] rounded transition-colors" title="Export XLS">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            {onSaveAsCase && (
              <button onClick={onSaveAsCase} className="flex items-center gap-1 px-2 py-1 text-[10px] text-purple-400 hover:bg-purple-600/10 rounded transition-colors border border-purple-500/20" title="Save to My Case Library">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
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
                <button
                  key={i}
                  onClick={() => onQuickAction(action.label)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md border border-[#2a2a3e] hover:border-purple-600/30 hover:bg-purple-600/5 transition-colors text-left group"
                >
                  <QuickActionIcon icon={action.icon} color={action.color} />
                  <span className="text-[11px] text-gray-400 group-hover:text-gray-200 transition-colors truncate">
                    {action.label}
                  </span>
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
  return (
    <div className="bg-white text-gray-900 min-h-full">
      {/* Title */}
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-base font-bold text-gray-900">{caseData.name}</h2>
        <p className="text-[10px] text-gray-500 mt-0.5">Real-time overview with alerts and detailed records</p>
      </div>

      {/* Summary Cards */}
      <div className="px-5 pb-4">
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Overview</p>
        <div className="grid grid-cols-2 gap-2">
          {caseData.summary.map((card, i) => {
            const borderColor = {
              purple: "border-l-purple-500",
              green: "border-l-green-500",
              orange: "border-l-orange-500",
              blue: "border-l-blue-500",
            }[card.color];
            const changeColor = card.changeType === "up" ? "text-green-600" : card.changeType === "down" ? "text-red-500" : "text-gray-400";
            return (
              <div key={i} className={`border border-gray-200 border-l-4 ${borderColor} rounded-md p-3`}>
                <p className="text-[9px] text-gray-500">{card.label}</p>
                <p className="text-lg font-bold text-gray-900 mt-0.5">{card.value}</p>
                {card.change && <p className={`text-[9px] mt-0.5 ${changeColor}`}>{card.change}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Alerts */}
      {caseData.alerts.length > 0 && (
        <div className="px-5 pb-4">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Alerts & Recommendations</p>
          <div className="space-y-1.5">
            {caseData.alerts.map((alert, i) => {
              const styles = {
                warning: "bg-orange-50 border-orange-200 text-orange-800",
                info: "bg-blue-50 border-blue-200 text-blue-800",
                success: "bg-green-50 border-green-200 text-green-800",
              };
              const icons = { warning: "⚠️", info: "ℹ️", success: "✅" };
              return (
                <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded border text-[10px] ${styles[alert.type]}`}>
                  <span>{icons[alert.type]}</span>
                  <span>{alert.message}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Detail Records</p>
          <span className="text-[9px] text-gray-400">{caseData.tableData.length} records</span>
        </div>
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {caseData.tableColumns.map((col) => (
                    <th key={col} className="text-left px-3 py-2 font-medium text-gray-600 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {caseData.tableData.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    {caseData.tableColumns.map((col) => (
                      <td key={col} className="px-3 py-2 text-gray-700 whitespace-nowrap">
                        {col === "Status" ? <StatusBadge value={String(row[col])} /> : String(row[col] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ value }: { value: string }) {
  const lower = value.toLowerCase();
  let cls = "bg-gray-100 text-gray-600";
  if (lower === "normal" || lower === "healthy") cls = "bg-green-100 text-green-700";
  if (lower === "low" || lower === "warning") cls = "bg-yellow-100 text-yellow-700";
  if (lower === "critical" || lower === "out" || lower === "overdue") cls = "bg-red-100 text-red-700";
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${cls}`}>{value}</span>;
}

function QuickActionIcon({ icon, color }: { icon: string; color: string }) {
  const colorMap: Record<string, string> = {
    purple: "text-purple-400",
    yellow: "text-yellow-400",
    blue: "text-blue-400",
    green: "text-green-400",
    orange: "text-orange-400",
  };
  const textColor = colorMap[color] || "text-gray-400";

  switch (icon) {
    case "chart":
      return (<svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>);
    case "warning":
      return (<svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>);
    case "table":
      return (<svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>);
    case "report":
      return (<svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
    case "forecast":
      return (<svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>);
    case "optimize":
      return (<svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>);
    default:
      return null;
  }
}
