import { SoilAnalysis } from "@/types/soil";
import { BrainCircuit, FlaskConical, TrendingUp, Info } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for clean tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AnalysisResult({ data }: { data: SoilAnalysis }) {
  const isFact = data.source === "ground_truth";

  // Determine color based on pH (Simple Agronomy logic)
  const getPhColor = (ph: number) => {
    if (ph < 5.5) return "text-orange-600 bg-orange-50"; // Acidic
    if (ph > 7.5) return "text-blue-600 bg-blue-50";     // Alkaline
    return "text-emerald-600 bg-emerald-50";            // Neutral/Optimal
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header with Source Badge */}
      <div className={cn(
        "px-6 py-4 flex justify-between items-center border-b",
        isFact ? "bg-emerald-50/50" : "bg-blue-50/50"
      )}>
        <div className="flex items-center gap-2">
          {isFact ? <FlaskConical className="text-emerald-600" size={20} /> : <BrainCircuit className="text-blue-600" size={20} />}
          <span className="font-bold text-slate-700 uppercase tracking-wider text-xs">
            {isFact ? "Verified Lab Result" : "AI Predicted Analysis"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
          <TrendingUp size={14} />
          {Math.round(data.confidence * 100)}% Confidence
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={cn("p-4 rounded-xl border flex flex-col items-center", getPhColor(data.nutrients.pH))}>
            <span className="text-[10px] uppercase font-bold opacity-70">Soil pH</span>
            <span className="text-3xl font-black">{data.nutrients.pH.toFixed(1)}</span>
          </div>
          
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Nitrogen</span>
            <span className="text-2xl font-bold text-slate-700">{data.nutrients.nitrogen} <small className="text-xs font-normal opacity-50">mg/kg</small></span>
          </div>
        </div>

        {/* Crop Recommendation Section */}
        <div className="bg-slate-900 rounded-xl p-5 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-1">Recommended Crop</p>
            <h3 className="text-2xl font-bold">{data.crop}</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed italic">
              "Based on current nutrient profiles, {data.crop} has the highest yield potential for this soil type."
            </p>
          </div>
          <BrainCircuit className="absolute -right-4 -bottom-4 text-white/5 w-24 h-24" />
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-3 bg-slate-50 border-t flex items-center gap-2 text-[10px] text-slate-400">
        <Info size={12} />
        <span>Location: {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}</span>
      </div>
    </div>
  );
}