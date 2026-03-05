"use client";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  TrendingUp, 
  Map as MapIcon, 
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight
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
  Filler 
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, Filler);

export default function AnalyticsPage() {
  // Sample Data for the 10/10 "Wow" factor
  const barData = {
    labels: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu', 'Mangochi'],
    datasets: [{
      label: 'Avg Nitrogen Level',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'grey',
      borderColor: '#10b981',
      borderWidth: 2,
      borderRadius: 8,
    }]
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-1000 bg-gray-50  ml-1 mt-1 rounded-t-xl border-l-4 border-gray-400">
      {/* Top Action Bar */}  
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-700 tracking-tighter uppercase">
            National <span className="text-emerald-500 underline decoration-white/10 underline-offset-8">Intelligence</span>
          </h1>
          <p className="text-slate-600 mt-2 font-medium">Aggregated soil metrics across Malawi regions.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
            <Filter size={16} className="text-blue-700 animate-pulse" /> Filter Region
          </button>
          <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
            <Download size={16} className="text-white" /> Export Report
          </button>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Analyzed Area", val: "1.2M ha", trend: "+12%", up: true },
          { label: "Avg pH Level", val: "6.2", trend: "-0.2%", up: false },
          { label: "Ground Truths", val: "4,829", trend: "+402", up: true },
          { label: "Model Accuracy", val: "94.2%", trend: "+2.1%", up: true },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-200 border-l-4 p-6 rounded-3xl border-emerald-500/50 relative overflow-hidden group hover:border-green-400 transition-colors">
            <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-bold text-blue-500 mt-1">{stat.val}</p>
            <div className={cn(
              "flex items-center gap-1 text-[12px] font-bold mt-2",
              stat.up ? "text-green-400" : "text-rose-500"
            )}>
              {stat.up ? <ArrowUpRight size={14}  /> : <ArrowDownRight size={14} />}
              <h1 className="text-[15px]">{stat.trend} </h1><span className="text-slate-700 ml-1 underline underline-offset-2 italic uppercase">vs last month</span>
            </div>
            <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <BarChart3 size={80} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-200 border-l-4 border-emerald-500/50 p-8 rounded-[2.5rem] shadow-2xl">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            <TrendingUp className="text-emerald-500" />  <h1 className="text-emerald-500">Nitrogen Distribution</h1>
          </h3>
          <div className="h-75">
            <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(138, 163, 163, 0.05)' } } } }} />
          </div>
        </div>

        {/* The "Heatmap" Preview */}
        <div className="bg-gray-200 border-l-4 border-emerald-500/50 p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black text-gray-700 mb-2 flex items-center gap-2">
              <MapIcon className="text-emerald-500" /> Regional pH Heatmap
            </h3>
            <p className="text-gray-700 text-sm">Real-time interpolation of satellite and ground data.</p>
          </div>
          
          <div className="mt-6 rounded-3xl overflow-hidden h-48 bg-slate-900 border border-white/5 flex items-center justify-center group cursor-pointer relative">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" 
              alt="Heatmap"
            />
            <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay" />
            <div className="relative z-10 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-black text-white uppercase tracking-widest">
              Launch Interactive 3D Map
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}