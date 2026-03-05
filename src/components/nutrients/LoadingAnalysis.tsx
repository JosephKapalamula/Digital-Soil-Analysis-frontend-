import { Box, Layers, Radio } from "lucide-react";

export default function LoadingAnalysis() {
  return (
    <div className="p-8 border-2 border-dashed border-emerald-100 rounded-2xl bg-emerald-50/30 flex flex-col items-center justify-center space-y-4 animate-pulse">
      <div className="relative">
        <Layers className="text-emerald-600 w-12 h-12" />
        <Radio className="absolute -top-2 -right-2 text-emerald-400 animate-ping" size={20} />
      </div>
      <div className="text-center">
        <h3 className="font-bold text-slate-700">Analyzing Satellite Bands</h3>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Extracting B2, B4, B8, B11...
        </p>
      </div>
      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div className="bg-emerald-500 h-full w-1/2 animate-[loading_2s_ease-in-out_infinite]" 
             style={{
               animation: 'loading 1.5s infinite linear',
               backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
               backgroundSize: '1rem 1rem'
             }} 
        />
      </div>
    </div>
  );
}