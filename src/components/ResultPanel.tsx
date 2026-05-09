"use client";

import { ResultItem } from "@/components/ChatArea";
import { QuickAction } from "@/data/agents";

interface ResultPanelProps {
  results: ResultItem[];
  quickActions: QuickAction[];
  onQuickAction: (label: string) => void;
}

export default function ResultPanel({ results, quickActions, onQuickAction }: ResultPanelProps) {
  const handleExport = (result: ResultItem) => {
    const content = `Title: ${result.title}\nType: ${result.type}\nSummary: ${result.content.summary}\nGenerated: ${result.timestamp.toLocaleString()}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.title.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = (result: ResultItem) => {
    if (navigator.share) {
      navigator.share({
        title: result.title,
        text: `${result.title} - ${result.content.summary}`,
      });
    } else {
      // Fallback: copy to clipboard
      const text = `${result.title}\n${result.content.summary}\nGenerated: ${result.timestamp.toLocaleString()}`;
      navigator.clipboard.writeText(text);
      alert("Result copied to clipboard!");
    }
  };

  return (
    <div className="w-[300px] border-l border-[#2a2a3e] bg-[#12121f] flex flex-col flex-shrink-0">
      {/* Panel Header */}
      <div className="h-11 border-b border-[#2a2a3e] flex items-center px-4 flex-shrink-0">
        <span className="text-xs font-medium text-gray-300">Results</span>
        <span className="ml-2 text-[10px] text-gray-600">
          {results.length > 0 && `(${results.length}/3)`}
        </span>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Results Cards */}
        {results.length > 0 ? (
          <div className="space-y-3 mb-5">
            {results.map((result, index) => (
              <ResultCard
                key={result.id}
                result={result}
                isLatest={index === 0}
                onExport={() => handleExport(result)}
                onShare={() => handleShare(result)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-[10px] text-gray-600">Results will appear here</p>
            <p className="text-[9px] text-gray-700 mt-1">Ask a question or use Quick Actions</p>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 px-1">Quick Actions</p>
          <div className="space-y-1">
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
      </div>
    </div>
  );
}

function ResultCard({
  result,
  isLatest,
  onExport,
  onShare,
}: {
  result: ResultItem;
  isLatest: boolean;
  onExport: () => void;
  onShare: () => void;
}) {
  return (
    <div className={`rounded-lg border overflow-hidden ${isLatest ? "border-purple-600/40 bg-[#0d0d1a]" : "border-[#2a2a3e] bg-[#0d0d1a]"}`}>
      {/* Card Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a2a3e]">
        <div className="flex items-center gap-2 min-w-0">
          <ResultTypeIcon type={result.type} />
          <span className="text-[11px] text-gray-200 font-medium truncate">{result.title}</span>
        </div>
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button
            onClick={onExport}
            className="p-1 hover:bg-[#2a2a3e] rounded transition-colors"
            title="Export"
          >
            <svg className="w-3 h-3 text-gray-500 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button
            onClick={onShare}
            className="p-1 hover:bg-[#2a2a3e] rounded transition-colors"
            title="Share"
          >
            <svg className="w-3 h-3 text-gray-500 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Card Visualization */}
      <div className="p-3">
        <ResultVisualization chartType={result.content.chartType || "generic-chart"} />
      </div>

      {/* Card Footer */}
      <div className="px-3 py-2 border-t border-[#2a2a3e] flex items-center justify-between">
        <span className="text-[9px] text-gray-500">{result.content.summary}</span>
        {isLatest && (
          <span className="text-[8px] bg-purple-600/20 text-purple-400 px-1.5 py-0.5 rounded">Latest</span>
        )}
      </div>
    </div>
  );
}

function ResultTypeIcon({ type }: { type: string }) {
  switch (type) {
    case "chart":
      return (
        <svg className="w-3 h-3 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case "table":
      return (
        <svg className="w-3 h-3 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case "alert":
      return (
        <svg className="w-3 h-3 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    default:
      return null;
  }
}

function ResultVisualization({ chartType }: { chartType: string }) {
  switch (chartType) {
    case "inventory-health":
      return (
        <div className="flex items-end gap-1.5 h-20 px-1">
          <div className="flex-1 flex flex-col items-center gap-0.5">
            <div className="w-full bg-green-500/50 rounded-t transition-all" style={{ height: "85%" }}></div>
            <span className="text-[7px] text-gray-600">Healthy</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-0.5">
            <div className="w-full bg-yellow-500/50 rounded-t" style={{ height: "35%" }}></div>
            <span className="text-[7px] text-gray-600">Low</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-0.5">
            <div className="w-full bg-red-500/50 rounded-t" style={{ height: "15%" }}></div>
            <span className="text-[7px] text-gray-600">Critical</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-0.5">
            <div className="w-full bg-gray-500/50 rounded-t" style={{ height: "8%" }}></div>
            <span className="text-[7px] text-gray-600">Over</span>
          </div>
        </div>
      );
    case "reorder-alert":
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[8px] text-gray-500 w-10">3 days</span>
            <div className="flex-1 h-3 bg-[#1a1a2e] rounded overflow-hidden">
              <div className="h-full bg-red-500/60 rounded" style={{ width: "14%" }}></div>
            </div>
            <span className="text-[8px] text-red-400">12</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] text-gray-500 w-10">7 days</span>
            <div className="flex-1 h-3 bg-[#1a1a2e] rounded overflow-hidden">
              <div className="h-full bg-orange-500/60 rounded" style={{ width: "38%" }}></div>
            </div>
            <span className="text-[8px] text-orange-400">34</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] text-gray-500 w-10">14 days</span>
            <div className="flex-1 h-3 bg-[#1a1a2e] rounded overflow-hidden">
              <div className="h-full bg-yellow-500/60 rounded" style={{ width: "48%" }}></div>
            </div>
            <span className="text-[8px] text-yellow-400">43</span>
          </div>
        </div>
      );
    case "turnover-chart":
    case "forecast-chart":
      return (
        <div className="relative h-16">
          <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
            <polygon fill="url(#grad1)" points="0,45 33,40 66,38 100,32 133,28 166,25 200,20 200,60 0,60" opacity="0.3" />
            <polyline fill="none" stroke="#a855f7" strokeWidth="1.5" points="0,45 33,40 66,38 100,32 133,28 166,25 200,20" />
            <circle cx="200" cy="20" r="2.5" fill="#a855f7" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    case "dead-stock-table":
    case "optimization-table":
      return (
        <div className="space-y-1">
          <div className="flex text-[7px] text-gray-500 border-b border-[#2a2a3e] pb-1">
            <span className="flex-1">Item</span>
            <span className="w-12 text-right">Value</span>
            <span className="w-12 text-right">Status</span>
          </div>
          <div className="flex text-[8px] text-gray-400">
            <span className="flex-1 truncate">Legacy Adapter</span>
            <span className="w-12 text-right">$12.4K</span>
            <span className="w-12 text-right text-red-400">●</span>
          </div>
          <div className="flex text-[8px] text-gray-400">
            <span className="flex-1 truncate">Disc. Panel</span>
            <span className="w-12 text-right">$9.8K</span>
            <span className="w-12 text-right text-red-400">●</span>
          </div>
          <div className="flex text-[8px] text-gray-400">
            <span className="flex-1 truncate">Old Connector</span>
            <span className="w-12 text-right">$7.2K</span>
            <span className="w-12 text-right text-yellow-400">●</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="relative h-16">
          <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
            <polygon fill="url(#grad2)" points="0,50 40,42 80,45 120,30 160,28 200,22 200,60 0,60" opacity="0.3" />
            <polyline fill="none" stroke="#a855f7" strokeWidth="1.5" points="0,50 40,42 80,45 120,30 160,28 200,22" />
            <circle cx="200" cy="22" r="2.5" fill="#a855f7" />
            <defs>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
  }
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
      return (
        <svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case "warning":
      return (
        <svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    case "table":
      return (
        <svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case "report":
      return (
        <svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "forecast":
      return (
        <svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    case "optimize":
      return (
        <svg className={`w-3.5 h-3.5 ${textColor} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return null;
  }
}
