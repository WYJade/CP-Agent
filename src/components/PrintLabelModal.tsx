"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export interface CartonLabel {
  inboundNo: string;
  cartonNo: string;
  sku: string;
  productName: string;
  qty: number;
  weight: string;
  dimensions: string;
  warehouse: string;
  destination: string;
  poNo: string;
}

interface PrintLabelModalProps {
  labels: CartonLabel[];
  onConfirmPrint: () => void;
  onCancel: () => void;
}

export default function PrintLabelModal({ labels, onConfirmPrint, onCancel }: PrintLabelModalProps) {
  const { theme } = useTheme();
  const d = theme === "dark";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <div className={`relative w-[680px] max-h-[80vh] rounded-xl shadow-2xl flex flex-col ${d ? "bg-[#1a1a2e] border border-[#2a2a3e]" : "bg-white border border-gray-200"}`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between flex-shrink-0 ${d ? "border-[#2a2a3e]" : "border-gray-200"}`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${d ? "bg-blue-600/10" : "bg-blue-50"}`}>
              <svg className={`w-5 h-5 ${d ? "text-blue-400" : "text-blue-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${d ? "text-white" : "text-gray-900"}`}>Print Carton Labels</h3>
              <p className={`text-[11px] ${d ? "text-gray-500" : "text-gray-500"}`}>Inbound No: {labels[0]?.inboundNo} · {labels.length} carton(s)</p>
            </div>
          </div>
          <button onClick={onCancel} className={`p-1 rounded ${d ? "hover:bg-[#2a2a3e]" : "hover:bg-gray-100"}`}>
            <svg className={`w-4 h-4 ${d ? "text-gray-400" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Label Preview */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3">
            {labels.map((label, i) => (
              <div key={i} className={`rounded-lg border p-4 ${d ? "bg-[#12121f] border-[#2a2a3e]" : "bg-gray-50 border-gray-200"}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold ${d ? "text-purple-400" : "text-purple-700"}`}>Carton #{label.cartonNo}</span>
                  <span className={`text-[10px] ${d ? "text-gray-600" : "text-gray-400"}`}>PO: {label.poNo}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-[11px]">
                  <Field label="SKU" value={label.sku} dark={d} />
                  <Field label="Product" value={label.productName} dark={d} />
                  <Field label="Quantity" value={String(label.qty)} dark={d} />
                  <Field label="Weight" value={label.weight} dark={d} />
                  <Field label="Dimensions" value={label.dimensions} dark={d} />
                  <Field label="Warehouse" value={label.warehouse} dark={d} />
                  <Field label="Destination" value={label.destination} dark={d} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t flex items-center justify-end gap-2 flex-shrink-0 ${d ? "border-[#2a2a3e]" : "border-gray-200"}`}>
          <button onClick={onCancel} className={`px-4 py-2 text-xs rounded-lg transition-colors ${d ? "text-gray-400 hover:bg-[#2a2a3e]" : "text-gray-600 hover:bg-gray-100"}`}>Cancel</button>
          <button onClick={onConfirmPrint} className="px-5 py-2 text-xs rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Confirm Print
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, dark }: { label: string; value: string; dark: boolean }) {
  return (
    <div>
      <p className={`text-[9px] ${dark ? "text-gray-600" : "text-gray-400"}`}>{label}</p>
      <p className={`text-[11px] font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{value}</p>
    </div>
  );
}
