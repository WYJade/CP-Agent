"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface SaveCaseModalProps {
  defaultName: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}

export default function SaveCaseModal({ defaultName, onSave, onCancel }: SaveCaseModalProps) {
  const { theme } = useTheme();
  const d = theme === "dark";
  const [name, setName] = useState(defaultName);

  const handleSubmit = () => {
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />

      {/* Modal */}
      <div className={`relative w-[420px] rounded-xl shadow-2xl p-6 ${d ? "bg-[#1a1a2e] border border-[#2a2a3e]" : "bg-white border border-gray-200"}`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${d ? "bg-purple-600/10" : "bg-purple-50"}`}>
            <svg className={`w-5 h-5 ${d ? "text-purple-400" : "text-purple-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <div>
            <h3 className={`text-sm font-semibold ${d ? "text-white" : "text-gray-900"}`}>Save to My Case Library</h3>
            <p className={`text-[11px] ${d ? "text-gray-500" : "text-gray-500"}`}>Enter a name for this case report</p>
          </div>
        </div>

        {/* Input */}
        <div className="mb-5">
          <label className={`block text-[11px] font-medium mb-1.5 ${d ? "text-gray-400" : "text-gray-600"}`}>Case Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            autoFocus
            className={`w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-colors ${d ? "bg-[#12121f] border border-[#2a2a3e] text-white placeholder-gray-600 focus:border-purple-500/50" : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-400"}`}
            placeholder="e.g. Inventory Health Report - May 2025"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onCancel}
            className={`px-4 py-2 text-xs rounded-lg transition-colors ${d ? "text-gray-400 hover:bg-[#2a2a3e]" : "text-gray-600 hover:bg-gray-100"}`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="px-4 py-2 text-xs rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Case
          </button>
        </div>
      </div>
    </div>
  );
}
