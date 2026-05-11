"use client";

import { SavedCase } from "@/types/agent";
import { useTheme } from "@/context/ThemeContext";

interface CasePageProps {
  caseData: SavedCase;
  onBack: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

export default function CasePage({ caseData, onBack }: CasePageProps) {
  const { theme } = useTheme();
  const d = theme === "dark";

  const handleDownloadImage = () => { alert("Downloading as image..."); };
  const handleExportPDF = () => { alert("Exporting as PDF..."); };
  const handleExportXLS = () => {
    const headers = caseData.tableColumns.join(",");
    const rows = caseData.tableData.map((row) => caseData.tableColumns.map((col) => row[col] ?? "").join(","));
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${caseData.name}.csv`; a.click(); URL.revokeObjectURL(url);
  };
  const handleShare = () => { navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); };

  return (
    <div className={`flex-1 flex flex-col overflow-hidden ${d ? "bg-[#0d0d1a]" : "bg-white"}`}>
      {/* Top Bar */}
      <div className={`h-12 border-b flex items-center justify-between px-6 flex-shrink-0 ${d ? "border-[#2a2a3e] bg-[#12121f]" : "border-gray-200 bg-white"}`}>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className={`p-1 rounded transition-colors ${d ? "hover:bg-[#2a2a3e]" : "hover:bg-gray-100"}`}>
            <svg className={`w-4 h-4 ${d ? "text-gray-400" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span className={`text-xs ${d ? "text-gray-500" : "text-gray-400"}`}>{caseData.agentName}</span>
        </div>
        <div className="flex items-center gap-2">
          <ActionBtn onClick={handleShare} dark={d} label="Share" icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>} />
          <ActionBtn onClick={handleDownloadImage} dark={d} label="Image" icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
          <ActionBtn onClick={handleExportPDF} dark={d} label="PDF" icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>} />
          <ActionBtn onClick={handleExportXLS} dark={d} label="XLS" icon={<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
          <span className={`text-[10px] ml-2 ${d ? "text-gray-600" : "text-gray-400"}`}>Saved: {caseData.createdAt.toLocaleString()}</span>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Title */}
          <div>
            <h1 className={`text-xl font-bold ${d ? "text-white" : "text-gray-900"}`}>{caseData.name}</h1>
            <p className={`text-xs mt-1 ${d ? "text-gray-500" : "text-gray-500"}`}>Real-time overview with alerts and detailed records</p>
          </div>

          {/* Summary Cards */}
          <div>
            <h2 className={`text-[10px] font-semibold uppercase tracking-wider mb-3 ${d ? "text-gray-500" : "text-gray-500"}`}>Overview</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {caseData.summary.map((card, i) => {
                const borderColor = { purple: "border-l-purple-500", green: "border-l-green-500", orange: "border-l-orange-500", blue: "border-l-blue-500" }[card.color];
                const changeColor = card.changeType === "up" ? (d ? "text-green-400" : "text-green-600") : card.changeType === "down" ? (d ? "text-red-400" : "text-red-500") : (d ? "text-gray-500" : "text-gray-400");
                return (
                  <div key={i} className={`border-l-4 ${borderColor} rounded-lg p-4 ${d ? "bg-[#12121f] border border-[#2a2a3e]" : "bg-white border border-gray-200"}`}>
                    <p className={`text-[11px] ${d ? "text-gray-500" : "text-gray-500"}`}>{card.label}</p>
                    <p className={`text-2xl font-bold mt-1 ${d ? "text-white" : "text-gray-900"}`}>{card.value}</p>
                    {card.change && <p className={`text-[10px] mt-1 ${changeColor}`}>{card.change}</p>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alerts */}
          {caseData.alerts.length > 0 && (
            <div>
              <h2 className={`text-[10px] font-semibold uppercase tracking-wider mb-3 ${d ? "text-gray-500" : "text-gray-500"}`}>Alerts & Recommendations</h2>
              <div className="space-y-2">
                {caseData.alerts.map((alert, i) => {
                  const styles = d
                    ? { warning: "bg-orange-900/20 border-orange-700/30 text-orange-300", info: "bg-blue-900/20 border-blue-700/30 text-blue-300", success: "bg-green-900/20 border-green-700/30 text-green-300" }
                    : { warning: "bg-orange-50 border-orange-200 text-orange-800", info: "bg-blue-50 border-blue-200 text-blue-800", success: "bg-green-50 border-green-200 text-green-800" };
                  const icons = { warning: "⚠️", info: "ℹ️", success: "✅" };
                  return (<div key={i} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs ${styles[alert.type]}`}><span>{icons[alert.type]}</span><span>{alert.message}</span></div>);
                })}
              </div>
            </div>
          )}

          {/* Data Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-[10px] font-semibold uppercase tracking-wider ${d ? "text-gray-500" : "text-gray-500"}`}>Detail Records</h2>
              <span className={`text-[11px] ${d ? "text-gray-600" : "text-gray-400"}`}>{caseData.tableData.length} records</span>
            </div>
            <div className={`rounded-lg overflow-hidden ${d ? "bg-[#12121f] border border-[#2a2a3e]" : "bg-white border border-gray-200"}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className={d ? "bg-[#1a1a2e] border-b border-[#2a2a3e]" : "bg-gray-50 border-b border-gray-200"}>
                      {caseData.tableColumns.map((col) => (
                        <th key={col} className={`text-left px-4 py-3 font-medium whitespace-nowrap ${d ? "text-gray-400" : "text-gray-600"}`}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {caseData.tableData.map((row, i) => (
                      <tr key={i} className={d ? "border-b border-[#1e1e32] hover:bg-[#1a1a2e]" : "border-b border-gray-100 hover:bg-gray-50"}>
                        {caseData.tableColumns.map((col) => (
                          <td key={col} className={`px-4 py-3 whitespace-nowrap ${d ? "text-gray-300" : "text-gray-700"}`}>
                            {col === "Status" ? <StatusBadge value={String(row[col])} dark={d} /> : String(row[col] ?? "")}
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
      </div>
    </div>
  );
}

function ActionBtn({ onClick, dark, label, icon }: { onClick: () => void; dark: boolean; label: string; icon: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-colors border ${dark ? "text-gray-400 border-[#2a2a3e] hover:bg-[#2a2a3e]" : "text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
      {icon}
      {label}
    </button>
  );
}

function StatusBadge({ value, dark }: { value: string; dark: boolean }) {
  const lower = value.toLowerCase();
  let cls = dark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600";
  if (lower === "normal" || lower === "healthy") cls = dark ? "bg-green-900/40 text-green-400" : "bg-green-100 text-green-700";
  if (lower === "low" || lower === "warning") cls = dark ? "bg-yellow-900/40 text-yellow-400" : "bg-yellow-100 text-yellow-700";
  if (lower === "critical" || lower === "out" || lower === "overdue") cls = dark ? "bg-red-900/40 text-red-400" : "bg-red-100 text-red-700";
  return <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${cls}`}>{value}</span>;
}
