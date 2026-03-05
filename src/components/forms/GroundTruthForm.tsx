"use client";
import { useState } from "react";
import { FlaskConical, Save, X, AlertCircle } from "lucide-react";
import { soilService} from "@/services/api";

interface Props {
  lat: number;
  lon: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function GroundTruthForm({ lat, lon, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ph: 6.5,
    nitrogen: 0.1,
    phosphorus: 0.05,
    potassium: 0.1,
    confidence: 1.0,
    recommended_crop: "Maize"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await soilService.submitGroundTruth({
        latitude: lat,
        longitude: lon,
        ...formData
      });
      onSuccess();
      onClose();
    } catch (error) {
      alert("Error saving data. Check if this location already has a fact.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[1000] border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-6 border-b flex justify-between items-center bg-slate-900 text-white">
        <div className="flex items-center gap-2">
          <FlaskConical className="text-emerald-400" />
          <h2 className="text-xl font-bold">New Ground Truth</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 flex gap-3">
          <AlertCircle className="text-emerald-600 shrink-0" size={18} />
          <p className="text-xs text-emerald-800">
            You are recording a physical lab result for <strong>{lat.toFixed(4)}, {lon.toFixed(4)}</strong>. 
            This will be used to train the AI.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Soil pH</label>
            <input 
              type="number" step="0.1"
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              value={formData.ph}
              onChange={(e) => setFormData({...formData, ph: parseFloat(e.target.value)})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Confidence Score (0.0 - 1.0)</label>
            <input 
              type="range" min="0" max="1" step="0.1"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              value={formData.confidence}
              onChange={(e) => setFormData({...formData, confidence: parseFloat(e.target.value)})}
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
              <span>UNSURE</span>
              <span>CERTAIN ({formData.confidence})</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Recommended Crop</label>
            <select 
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.recommended_crop}
              onChange={(e) => setFormData({...formData, recommended_crop: e.target.value})}
            >
              <option>Maize</option>
              <option>Tobacco</option>
              <option>Soybeans</option>
              <option>Groundnuts</option>
            </select>
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 flex items-center justify-center gap-2 transition-all disabled:bg-slate-300"
        >
          {loading ? "Saving..." : <><Save size={18} /> Save to Ground Truth</>}
        </button>
      </form>
    </div>
  );
}