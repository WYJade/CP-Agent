"use client";

import { SavedCase } from "@/types/agent";

interface CasePageProps {
  caseData: SavedCase;
  onBack: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

export default function CasePage({ caseData, onBack, onSave, isSaved }: CasePageProps) {
  const handleDownloadImage = () => {
    alert("Downloading as image...");
  };

  const handleExportPDF = () => {
    alert("Exporting as PDF...");
  };

  const handleExportXLS = () => {
    // Create CSV content
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
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      {/* Top Bar */}
      <div className="h-12 border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded transition-colors">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-xs text-gray-400">{caseData.agentName}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition-colors border border-gray-200">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
          <button onClick={handleDownloadImage} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition-colors border border-gray-200">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Download Image
          </button>
          <button onClick={handleExportPDF} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition-colors border border-gray-200">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            PDF
          </button>
          <button onClick={handleExportXLS} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition-colors border border-gray-200">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            XLS
          </button>
          <span className="text-[10px] text-gray-400 ml-2">
            Saved: {caseData.createdAt.toLocaleString()}
          </span>
          {!isSaved && onSave && (
            <button onClick={onSave} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors ml-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save
            </button>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-8 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900">{caseData.name}</h1>
            <p className="text-xs text-gray-500 mt-1">Real-time overview with alerts and detailed records</p>
          </div>

          {/* Summary Cards */}
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Overview</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {caseData.summary.map((card, i) => (
                <SummaryCardComponent key={i} card={card} />
              ))}
            </div>
          </div>

          {/* Alerts */}
          {caseData.alerts.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Alerts & Recommendations</h2>
              <div className="space-y-2">
                {caseData.alerts.map((alert, i) => (
                  <AlertRow key={i} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {/* Data Table */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Detail Records</h2>
              <span className="text-[11px] text-gray-400">{caseData.tableData.length} records</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {caseData.tableColumns.map((col) => (
                        <th key={col} className="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {caseData.tableData.map((row, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        {caseData.tableColumns.map((col) => (
                          <td key={col} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                            {col === "Status" ? (
                              <StatusBadge value={String(row[col])} />
                            ) : (
                              String(row[col] ?? "")
                            )}
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

function SummaryCardComponent({ card }: { card: SavedCase["summary"][0] }) {
  const colorMap = {
    purple: "border-l-purple-500",
    green: "border-l-green-500",
    orange: "border-l-orange-500",
    blue: "border-l-blue-500",
  };

  const changeColor = card.changeType === "up" ? "text-green-600" : card.changeType === "down" ? "text-red-500" : "text-gray-400";

  return (
    <div className={`bg-white border border-gray-200 border-l-4 ${colorMap[card.color]} rounded-lg p-4`}>
      <p className="text-[11px] text-gray-500 mb-1">{card.label}</p>
      <p className="text-2xl font-bold text-gray-900">{card.value}</p>
      {card.change && (
        <p className={`text-[10px] mt-1 ${changeColor}`}>{card.change}</p>
      )}
    </div>
  );
}

function AlertRow({ alert }: { alert: SavedCase["alerts"][0] }) {
  const styles = {
    warning: "bg-orange-50 border-orange-200 text-orange-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
  };

  const icons = {
    warning: "⚠️",
    info: "ℹ️",
    success: "✅",
  };

  return (
    <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs ${styles[alert.type]}`}>
      <span>{icons[alert.type]}</span>
      <span>{alert.message}</span>
    </div>
  );
}

function StatusBadge({ value }: { value: string }) {
  const lower = value.toLowerCase();
  let cls = "bg-gray-100 text-gray-600";
  if (lower === "normal" || lower === "healthy" || lower === "active") cls = "bg-green-100 text-green-700";
  if (lower === "low" || lower === "warning") cls = "bg-yellow-100 text-yellow-700";
  if (lower === "critical" || lower === "out" || lower === "overdue") cls = "bg-red-100 text-red-700";
  if (lower === "overstock") cls = "bg-blue-100 text-blue-700";

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${cls}`}>
      {value}
    </span>
  );
}
