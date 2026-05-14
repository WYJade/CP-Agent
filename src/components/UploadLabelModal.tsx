"use client";

import { useState, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

export interface UploadFile {
  name: string;
  type: string;
  size: number;
  file: File;
}

interface UploadLabelModalProps {
  outboundNo: string;
  onUpload: (files: UploadFile[]) => void;
  onCancel: () => void;
}

export default function UploadLabelModal({ outboundNo, onUpload, onCancel }: UploadLabelModalProps) {
  const { theme } = useTheme();
  const d = theme === "dark";
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    const newFiles: UploadFile[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (["jpg", "jpeg", "png", "pdf"].includes(ext || "") && file.size <= 10 * 1024 * 1024) {
        newFiles.push({ name: file.name, type: file.type, size: file.size, file });
      }
    }
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <div className={`relative w-[600px] max-h-[80vh] rounded-xl shadow-2xl flex flex-col ${d ? "bg-[#1a1a2e] border border-[#2a2a3e]" : "bg-white border border-gray-200"}`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between flex-shrink-0 ${d ? "border-[#2a2a3e]" : "border-gray-200"}`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${d ? "bg-green-600/10" : "bg-green-50"}`}>
              <svg className={`w-5 h-5 ${d ? "text-green-400" : "text-green-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${d ? "text-white" : "text-gray-900"}`}>Upload Shipping Label</h3>
              <p className={`text-[11px] ${d ? "text-gray-500" : "text-gray-500"}`}>Outbound Order: {outboundNo}</p>
            </div>
          </div>
          <button onClick={onCancel} className={`p-1 rounded ${d ? "hover:bg-[#2a2a3e]" : "hover:bg-gray-100"}`}>
            <svg className={`w-4 h-4 ${d ? "text-gray-400" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* File Input Row */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`flex-1 h-9 rounded-md border px-3 flex items-center ${d ? "border-[#2a2a3e] bg-[#12121f]" : "border-gray-300 bg-gray-50"}`}>
              <span className={`text-xs ${d ? "text-gray-500" : "text-gray-400"}`}>
                {files.length > 0 ? `${files.length} file(s) selected` : "No file selected"}
              </span>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 text-xs font-medium rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              SELECT FILE
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-colors ${
              dragOver
                ? (d ? "border-purple-500 bg-purple-600/5" : "border-purple-400 bg-purple-50")
                : (d ? "border-[#2a2a3e] bg-[#12121f]" : "border-gray-300 bg-gray-50")
            }`}
          >
            <svg className={`w-8 h-8 mx-auto mb-2 ${d ? "text-gray-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <p className={`text-xs ${d ? "text-gray-500" : "text-gray-500"}`}>Drop file into zone</p>
            <p className={`text-[10px] mt-1 ${d ? "text-gray-600" : "text-gray-400"}`}>Supports JPG, PNG, PDF · Max 10MB per file</p>
          </div>

          {/* Upload Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => files.length > 0 && onUpload(files)}
              disabled={files.length === 0}
              className="px-5 py-2 text-xs rounded-md bg-teal-500 hover:bg-teal-600 text-white transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Upload
            </button>
          </div>

          {/* File List Table */}
          <div className={`rounded-lg border overflow-hidden ${d ? "border-[#2a2a3e]" : "border-gray-200"}`}>
            <table className="w-full text-[11px]">
              <thead>
                <tr className={d ? "bg-teal-900/30" : "bg-teal-600"}>
                  <th className={`text-left px-4 py-2 font-medium ${d ? "text-teal-300" : "text-white"}`}>File Name</th>
                  <th className={`text-left px-4 py-2 font-medium ${d ? "text-teal-300" : "text-white"}`}>Type</th>
                  <th className={`text-left px-4 py-2 font-medium ${d ? "text-teal-300" : "text-white"}`}>Size</th>
                  <th className={`text-left px-4 py-2 font-medium ${d ? "text-teal-300" : "text-white"}`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {files.length === 0 ? (
                  <tr>
                    <td colSpan={4} className={`px-4 py-6 text-center ${d ? "text-gray-600" : "text-gray-400"}`}>No files selected</td>
                  </tr>
                ) : (
                  files.map((f, i) => (
                    <tr key={i} className={d ? "border-b border-[#2a2a3e]" : "border-b border-gray-100"}>
                      <td className={`px-4 py-2 ${d ? "text-gray-300" : "text-gray-700"}`}>{f.name}</td>
                      <td className={`px-4 py-2 ${d ? "text-gray-400" : "text-gray-500"}`}>{f.type.split("/")[1]?.toUpperCase()}</td>
                      <td className={`px-4 py-2 ${d ? "text-gray-400" : "text-gray-500"}`}>{formatSize(f.size)}</td>
                      <td className="px-4 py-2">
                        <button onClick={() => removeFile(i)} className="text-red-400 hover:text-red-300 text-[10px]">Remove</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
