"use client";
import { useState } from "react";
import { soilService } from "@/services/api";
import { SoilAnalysisResponse } from "@/types/soil";
import dynamic from "next/dynamic";
import { Search, Info, Settings2, Sparkles, MapPin, X } from "lucide-react";

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

  const handleCloseAnalysis = () => {
    setAnalysis(null);
    setCoords(null);
  };

  return (
    <div className="relative h-screen w-full">
      {/* 1. THE MAP LAYER */}
      <SatelliteExplorer
        onLocationSelect={(lat, lon) => setCoords({ lat, lon })}
      />

      {/* 2. FLOATING TOP BAR (Search & Status) */}
      <div className="absolute top-3 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-start z-40 pointer-events-none">
        <div className="bg-gray-50 backdrop-blur-md shadow-2xl border-l-4 border-green-500 p-3 sm:p-2 rounded-2xl flex items-center gap-2 sm:gap-3 w-full max-w-xs sm:max-w-md pointer-events-auto transition-all duration-300 lg:ml-0 ml-16">
          <div className="bg-green-500 p-2 sm:p-2 rounded-xl shrink-0">
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
      <div className="absolute bottom-4 sm:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-40 w-full max-w-80 sm:max-w-84 md:max-w-88 lg:max-w-92 px-4 sm:px-6">
        <div className="bg-gray-300 backdrop-blur-xl p-3 sm:p-3 lg:p-3 rounded-2xl sm:rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border-l-4 border-l-green-500">
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
            <div className="relative text-center py-3 sm:py-4">
              {/* Beautiful Close Button */}
              <button
                onClick={handleCloseAnalysis}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-500 hover:bg-red-600 text-white p-2 sm:p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group z-10"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-200" />
              </button>

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
                        {analysis.data.nutrients?.[0]?.pH
                          ? analysis.data.nutrients[0].pH.toFixed(1)
                          : "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-xs sm:text-sm">
                        Nitrogen (mg/kg)
                      </td>
                      <td className="py-1 text-xs sm:text-sm">
                        {analysis.data.nutrients?.[0]?.Nitrogen
                          ? analysis.data.nutrients[0].Nitrogen.toFixed(1)
                          : "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-xs sm:text-sm">
                        Phosphorus (mg/kg)
                      </td>
                      <td className="py-1 text-xs sm:text-sm">
                        {analysis.data.nutrients?.[0]?.Phosphorus
                          ? analysis.data.nutrients[0].Phosphorus.toFixed(1)
                          : "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-xs sm:text-sm">
                        Potassium (mg/kg)
                      </td>
                      <td className="py-1 text-xs sm:text-sm">
                        {analysis.data.nutrients?.[0]?.Potassium
                          ? analysis.data.nutrients[0].Potassium.toFixed(1)
                          : "N/A"}
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
                  </tbody>
                </table>
              </div>

              {/* AI Report Section - Conditional Display */}
              {analysis.data.report && (
                <div className="mt-6 sm:mt-8">
                  <div className="bg-linear-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-500 rounded-2xl p-4 sm:p-6 max-h-40 sm:max-h-48 overflow-y-auto">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <div className="bg-emerald-500 p-1.5 sm:p-2 rounded-lg">
                        <Sparkles className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-emerald-800">
                        AI Analysis Report
                      </h4>
                    </div>

                    <div className="prose prose-sm sm:prose-base max-w-none">
                      {analysis.data.report.split("\n").map((line, index) => {
                        // Handle headers
                        if (line.startsWith("## ")) {
                          return (
                            <h2
                              key={index}
                              className="text-base sm:text-lg font-bold text-emerald-900 mb-2 sm:mb-3"
                            >
                              {line.replace("## ", "")}
                            </h2>
                          );
                        }
                        // Handle sub-headers
                        if (line.startsWith("### ")) {
                          return (
                            <h3
                              key={index}
                              className="text-sm sm:text-base font-semibold text-emerald-800 mb-2"
                            >
                              {line.replace("### ", "")}
                            </h3>
                          );
                        }
                        // Handle bullet points
                        if (line.startsWith("* ")) {
                          return (
                            <div
                              key={index}
                              className="flex items-start gap-2 mb-1 sm:mb-2"
                            >
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                {line.replace("* ", "")}
                              </p>
                            </div>
                          );
                        }
                        // Handle regular paragraphs
                        if (line.trim()) {
                          return (
                            <p
                              key={index}
                              className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-2 sm:mb-3"
                            >
                              {line}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  <MapPin className="text-blue-700 animate-pulse w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                  <p className="text-center sm:text-left mt-1 text-xs sm:text-sm font-black text-gray-900 tracking-widest">
                    Location
                  </p>
                </div>
                <p className="text-center sm:text-left text-sm sm:text-base font-mono font-bold text-gray-700 mt-1">
                  {coords.lat.toFixed(5)}°N, {coords.lon.toFixed(5)}°E
                </p>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={loading || !coords}
                className="bg-green-500 border-l-4 border-l-blue-100 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-black transition-all shadow-lg shadow-emerald-500/20 active:scale-95 active:bg-green-600 text-xs sm:text-xs flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing..
                  </>
                ) : (
                  "Analyze Soil"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
