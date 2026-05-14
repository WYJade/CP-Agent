"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { CartonLabel } from "@/components/PrintLabelModal";

interface EditLabelModalProps {
  labels: CartonLabel[];
  onSave: (updatedLabels: CartonLabel[]) => void;
  onCancel: () => void;
}

export default function EditLabelModal({ labels, onSave, onCancel }: EditLabelModalProps) {
  const { theme } = useTheme();
  const d = theme === "dark";
  const [editedLabels, setEditedLabels] = useState<CartonLabel[]>(JSON.parse(JSON.stringify(labels)));

  const updateField = (index: number, field: keyof CartonLabel, value: string | number) => {
    setEditedLabels((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSave = () => {
    onSave(editedLabels);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <div className={`relative w-[720px] max-h-[85vh] rounded-xl shadow-2xl flex flex-col ${d ? "bg-[#1a1a2e] border border-[#2a2a3e]" : "bg-white border border-gray-200"}`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between flex-shrink-0 ${d ? "border-[#2a2a3e]" : "border-gray-200"}`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${d ? "bg-orange-600/10" : "bg-orange-50"}`}>
              <svg className={`w-5 h-5 ${d ? "text-orange-400" : "text-orange-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${d ? "text-white" : "text-gray-900"}`}>Edit Carton Label Information</h3>
              <p className={`text-[11px] ${d ? "text-gray-500" : "text-gray-500"}`}>Inbound No: {labels[0]?.inboundNo} · Modify fields then save</p>
            </div>
          </div>
          <button onClick={onCancel} className={`p-1 rounded ${d ? "hover:bg-[#2a2a3e]" : "hover:bg-gray-100"}`}>
            <svg className={`w-4 h-4 ${d ? "text-gray-400" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Edit Form */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            {editedLabels.map((label, i) => (
              <div key={i} className={`rounded-lg border p-4 ${d ? "bg-[#12121f] border-[#2a2a3e]" : "bg-gray-50 border-gray-200"}`}>
                <p className={`text-xs font-semibold mb-3 ${d ? "text-purple-400" : "text-purple-700"}`}>Carton #{label.cartonNo}</p>
                <div className="grid grid-cols-2 gap-3">
                  <EditField label="SKU" value={label.sku} onChange={(v) => updateField(i, "sku", v)} dark={d} />
                  <EditField label="Product Name" value={label.productName} onChange={(v) => updateField(i, "productName", v)} dark={d} />
                  <EditField label="Quantity" value={String(label.qty)} onChange={(v) => updateField(i, "qty", Number(v) || 0)} dark={d} type="number" />
                  <EditField label="Weight" value={label.weight} onChange={(v) => updateField(i, "weight", v)} dark={d} />
                  <EditField label="Dimensions (L×W×H)" value={label.dimensions} onChange={(v) => updateField(i, "dimensions", v)} dark={d} />
                  <EditField label="Destination" value={label.destination} onChange={(v) => updateField(i, "destination", v)} dark={d} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t flex items-center justify-end gap-2 flex-shrink-0 ${d ? "border-[#2a2a3e]" : "border-gray-200"}`}>
          <button onClick={onCancel} className={`px-4 py-2 text-xs rounded-lg transition-colors ${d ? "text-gray-400 hover:bg-[#2a2a3e]" : "text-gray-600 hover:bg-gray-100"}`}>Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 text-xs rounded-lg bg-orange-600 hover:bg-orange-700 text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function EditField({ label, value, onChange, dark, type = "text" }: { label: string; value: string; onChange: (v: string) => void; dark: boolean; type?: string }) {
  return (
    <div>
      <label className={`block text-[10px] font-medium mb-1 ${dark ? "text-gray-500" : "text-gray-500"}`}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-2.5 py-1.5 rounded-md text-xs outline-none transition-colors ${dark ? "bg-[#0d0d1a] border border-[#2a2a3e] text-gray-200 focus:border-purple-500/50" : "bg-white border border-gray-300 text-gray-700 focus:border-purple-400"}`}
      />
    </div>
  );
}
