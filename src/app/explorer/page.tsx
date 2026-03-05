"use client";
import { useState } from "react";
import { soilService } from "@/services/api";
import { SoilAnalysisResponse } from "@/types/soil";
import dynamic from "next/dynamic";
import { Search, Info, Settings2, Sparkles, MapPin } from "lucide-react";

const SatelliteExplorer = dynamic(
  () => import("@/components/map/SatelliteExplorer"),
  { ssr: false },
);

export default function ExplorerPage() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SoilAnalysisResponse | null>(null);

  const handleAnalyze = async () => {
    if (!coords) return;
    setLoading(true);
    try {
      const result = await soilService.analyzeSoil(coords.lat, coords.lon);
      setAnalysis(result);
      console.log("Analysis result:", result);
    } catch (error) {
      console.error("Failed to analyze soil:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* 1. THE MAP LAYER */}
      <SatelliteExplorer
        onLocationSelect={(lat, lon) => setCoords({ lat, lon })}
      />

      {/* 2. FLOATING TOP BAR (Search & Status) */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-start z-500 pointer-events-none">
        <div className="bg-gray-50 backdrop-blur-md shadow-2xl border-l-4 border-green-500 p-3 sm:p-2 rounded-2xl flex items-center gap-2 sm:gap-3 w-full max-w-xs sm:max-w-md pointer-events-auto">
          <div className="bg-green-500 p-2 sm:p-2 rounded-xl flex-shrink-0">
            <Search className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <input
            type="text"
            placeholder="Search farm location in Malawi..."
            className="bg-transparent border-none outline-none text-sm sm:text-normal font-semibold w-full text-gray-700 placeholder:text-slate-500 placeholder:text-xs sm:placeholder:text-sm placeholder:font-italic"
          />
        </div>

        <div className="flex gap-2 pointer-events-auto items-center">
          <button className="backdrop-blur-md p-2 sm:p-3 rounded-xl bg-green-500 shadow-2xl text-sm sm:text-normal text-gray-50 font-black transition-all sm:self-auto">
            <Settings2 className="text-gray w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
      {/* 3. FLOATING ACTION PANEL (The Intelligence) */}
      <div className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-500 w-full max-w-sm sm:max-w-xl px-4 sm:px-6">
        <div className="bg-gray-300 backdrop-blur-xl p-4 sm:p-6 rounded-4xl sm:rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border-l-4 border-l-green-500">
          {!coords ? (
            <div className="text-center py-3 sm:py-4">
              <div className="bg-green-500 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Sparkles className="text-white animate-pulse w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800">
                Select your field
              </h3>
              <p className="text-gray-800 font-semibold text-xs sm:text-xs">
                Tap exactly on your land to analyze 10m² of soil health
              </p>
            </div>
          ) : analysis ? (
            <div className="text-center py-3 sm:py-4">
              <div className="bg-green-500 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Sparkles className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
                Soil Analysis Results
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-800 mt-4 text-xs sm:text-sm">
                  <thead>
                    <tr>
                      <th className="border-b pb-2 font-semibold text-xs sm:text-sm">
                        Metric
                      </th>
                      <th className="border-b pb-2 font-semibold text-xs sm:text-sm">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 text-xs sm:text-sm">
                        Crop Recommendation
                      </td>
                      <td className="py-1 text-xs sm:text-sm">
                        {analysis.data.crop}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-xs sm:text-sm">pH Level</td>
                      <td className="py-1 text-xs sm:text-sm">
                        {analysis.data.pH}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-xs sm:text-sm">Nitrogen</td>
                      <td className="py-1 text-xs sm:text-sm">
                        {analysis.data.nutrients.Nitrogen}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-xs sm:text-sm">Phosphorus</td>
                      <td className="py-1 text-xs sm:text-sm">
                        {analysis.data.nutrients.Phosphorus}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-xs sm:text-sm">Potassium</td>
                      <td className="py-1 text-xs sm:text-sm">
                        {analysis.data.nutrients.Potassium}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-xs sm:text-sm">Confidence</td>
                      <td className="py-1 text-xs sm:text-sm">
                        {analysis.data?.confidence
                          ? (analysis.data.confidence * 100).toFixed(1) + "%"
                          : "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-xs sm:text-sm">Elevation</td>
                      <td className="py-1 text-xs sm:text-sm">
                        {analysis.data?.elevation
                          ? analysis.data.elevation + "m"
                          : "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-xs sm:text-sm">Slope</td>
                      <td className="py-1 text-xs sm:text-sm">
                        {analysis.data?.slope
                          ? analysis.data.slope.toFixed(2) + "°"
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  <MapPin className="text-blue-700 animate-pulse w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                  <p className="text-center sm:text-left mt-1 text-xs sm:text-sm font-black text-gray-900 tracking-widest mb-2">
                    Selected Location
                  </p>
                </div>
                <p className="text-center sm:text-left text-sm sm:text-xl font-mono font-bold text-gray-800">
                  {coords.lat.toFixed(5)}°N, {coords.lon.toFixed(5)}°E
                </p>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={loading || !coords}
                className="bg-green-500 border-l-4 border-l-blue-100 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-black transition-all shadow-lg shadow-emerald-500/20 active:scale-95 active:bg-green-600 text-xs sm:text-sm"
              >
                {loading ? "ANALYZING..." : "ANALYZE SOIL"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
