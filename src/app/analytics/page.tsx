"use client";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  Map as MapIcon,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
);

export default function AnalyticsPage() {
  // Sample Data for the 10/10 "Wow" factor
  const barData = {
    labels: ["Lilongwe", "Blantyre", "Mzuzu", "Zomba", "Kasungu", "Mangochi"],
    datasets: [
      {
        label: "Avg Nitrogen Level",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(16, 185, 129, 0.9)",
          "rgba(16, 185, 129, 0.85)",
          "rgba(16, 185, 129, 0.75)",
          "rgba(16, 185, 129, 0.8)",
        ],
        borderColor: "#10b981",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };
  const FilterButton = ({ fullWidth = false }: { fullWidth?: boolean }) => (
    <button
      className={`${fullWidth ? "w-3/4 justify-center" : ""} flex items-center gap-1 bg-gray-100 border border-gray-200 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all text-gray-700`}
    >
      <Filter className="w-3.5 h-3.5 text-blue-700 animate-pulse" />
      Filter Region
    </button>
  );

  const ExportButton = ({ fullWidth = false }: { fullWidth?: boolean }) => (
    <button
      className={`${fullWidth ? "w-3/4 justify-center" : ""} flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10`}
    >
      <Download className="w-3.5 h-3.5 text-white" />
      Export Report
    </button>
  );

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8 animate-in fade-in duration-1000 bg-gray-50 ml-1 mt-1 rounded-t-xl border-l-4 border-gray-400">
      {/* 1. TOP ACTION BAR (Desktop Version) */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-8">
        <div className="w-full sm:w-auto sm:flex-1 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-700 tracking-tighter uppercase">
            National{" "}
            <span className="text-emerald-500 underline decoration-white/10 underline-offset-2 sm:underline-offset-4 md:underline-offset-8">
              Intelligence
            </span>
          </h1>
          <p className="text-slate-600 mt-1 sm:mt-2 font-medium text-xs sm:text-sm md:text-base">
            Aggregated soil metrics across Malawi regions.
          </p>
        </div>

        {/* Only shows on Tablet/Desktop (sm and up) */}
        <div className="hidden sm:flex gap-1.5 sm:gap-2 sm:items-end sm:mt-1 md:gap-3">
          <FilterButton />
          <ExportButton />
        </div>
      </div>

      {/* ... Your Charts and Main Content Go Here ... */}

      {/* 2. BOTTOM ACTION BAR (Mobile Version) */}
      <div className="flex sm:hidden mt-8 pt-6 border-t border-gray-100 gap-2 w-full">
        <div className="grid grid-cols-2 gap-2 w-full">
          <FilterButton fullWidth />
          <ExportButton fullWidth />
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {[
          { label: "Analyzed Area", val: "1.2M ha", trend: "+12%", up: true },
          { label: "Avg pH Level", val: "6.2", trend: "-0.2%", up: false },
          { label: "Ground Truths", val: "4,829", trend: "+402", up: true },
          { label: "Model Accuracy", val: "94.2%", trend: "+2.1%", up: true },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gray-200 border-l-4 p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl border-emerald-500/50 relative overflow-hidden group hover:border-green-400 transition-colors"
          >
            <p className="text-[6px] sm:text-[8px] md:text-[10px] font-black text-gray-800 uppercase tracking-widest">
              {stat.label}
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-500 mt-0.5 sm:mt-1">
              {stat.val}
            </p>
            <div
              className={cn(
                "flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] md:text-[12px] font-bold mt-1 sm:mt-2",
                stat.up ? "text-green-400" : "text-rose-500",
              )}
            >
              {stat.up ? (
                <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
              ) : (
                <ArrowDownRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
              )}
              <h1 className="text-[10px] sm:text-[12px] md:text-[15px]">
                {stat.trend}{" "}
              </h1>
              <span className="text-slate-700 ml-0.5 sm:ml-1 underline underline-offset-2 italic uppercase text-[8px] sm:text-xs">
                vs last month
              </span>
            </div>
            <div className="absolute -right-1 sm:-right-2 -bottom-1 sm:-bottom-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <div className="bg-gray-200 border-l-4 border-emerald-500/50 p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] shadow-2xl">
          <h3 className="text-base sm:text-lg md:text-xl font-black text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-1.5 sm:gap-2">
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-500" />{" "}
            <span className="text-emerald-500 text-xs sm:text-sm md:text-base">
              Nitrogen Distribution
            </span>
          </h3>
          <div className="h-32 sm:h-40 md:h-48 lg:h-64 xl:h-75">
            <Bar
              data={barData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    titleColor: "#10b981",
                    bodyColor: "#ffffff",
                    borderColor: "#10b981",
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                  },
                },
                scales: {
                  y: {
                    grid: {
                      color: "rgba(0, 73, 73, 0.1)",
                    },
                    ticks: {
                      color: "#000000",
                      font: {
                        size: 11,
                      },
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: "#000000",
                      font: {
                        size: 12,
                        family: "Arial",
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* The "Heatmap" Preview */}
        <div className="bg-gray-200 border-l-4 border-emerald-500/50 p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-black text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
              <MapIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-500" />{" "}
              Regional pH Heatmap
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm">
              Real-time interpolation of satellite and ground data.
            </p>
          </div>

          <div className="mt-3 sm:mt-4 md:mt-6 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden h-24 sm:h-32 md:h-40 lg:h-48 bg-slate-900 border border-white/5 flex items-center justify-center group cursor-pointer relative">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
              alt="Heatmap"
            />
            <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay" />
            <div className="relative z-10 bg-black/60 backdrop-blur-md px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 text-xs font-black text-white uppercase tracking-widest">
              Launch Interactive 3D Map
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
