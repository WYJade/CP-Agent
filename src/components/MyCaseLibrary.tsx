"use client";

import { SavedCase } from "@/types/agent";

interface MyCaseLibraryProps {
  cases: SavedCase[];
  onSelectCase: (c: SavedCase) => void;
}

export default function MyCaseLibrary({ cases, onSelectCase }: MyCaseLibraryProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#0d0d1a]">
      <div className="max-w-5xl mx-auto px-10 py-10">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">My Case Library</h1>
          <p className="text-sm text-gray-500 mt-1">
            Saved analysis results and reports from your agent conversations.
          </p>
        </div>

        {cases.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-[#1e1e32] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">No saved cases yet</p>
            <p className="text-xs text-gray-600 mt-1">Chat with an agent and save results to build your library</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cases.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCase(c)}
                className="text-left bg-[#12121f] border border-[#1e1e32] rounded-xl p-5 hover:border-purple-500/30 hover:bg-[#16162a] transition-all group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/10 border border-purple-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors truncate">
                    {c.name}
                  </h3>
                </div>
                <p className="text-[11px] text-gray-500 mb-3">
                  {c.summary.length} metrics · {c.tableData.length} records
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-600">{c.agentName}</span>
                  <span className="text-[10px] text-gray-600">{c.createdAt.toLocaleDateString()}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
