import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Globe2 } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white px-6 md:px-24 relative overflow-hidden rounded-l-2xl ml-1">
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img7.png"
          alt="Malawi Soil Background"
          fill
          className="object-cover" // Added object-cover to ensure it fills correctly
          priority
        />
      </div>
      {/* Hero Content */}
      <div className="max-w-4xl mx-auto text-center z-10 grow flex flex-col justify-center mt-8">
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00D261]/20 bg-white text-[#00D261] text-xs font-black tracking-widest uppercase">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D261]  opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D261]"></span>
            </span>
            Precision Agriculture Malawi
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          SOIL INTELLIGENCE <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-400">
            FROM SPACE
          </span>
        </h1>

       <p className="mb-12 mt-5 text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
  The AI-powered soil analysis platform built specifically for the
  unique topography of Malawi. 10-meter precision.
</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/explorer"
            className="w-full sm:w-auto px-4 py-3 border-2 border-emerald-400  active:bg-emerald-600 active:scale-95 text-white rounded-4xl font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-lg hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 active:shadow-sm active:translate-y-0"
          >
            Start Exploring{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/lab"
            className="w-full sm:w-auto px-4 hover:px-4.5 hover: py-3 bg-green-400 hover:bg-emerald-400 active:bg-emerald-600 active:scale-95 text-white rounded-4xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 active:shadow-sm active:translate-y-0"
          >
            Field Lab Login
          </Link>
        </div>
      </div>

      {/* Trust Badges - VISIBILITY FIX: Added relative and z-10 */}
      <div className="relative z-10 mt-16 pb-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center group border-l-green-400 border-gray-300 shadow hover:shadow-xl border-4  p-2 rounded-2xl bg-gray-50">
          <div className="p-3 rounded-full bg-green-400 mb-4">
            <Globe2 className="text-gray-50" size={28} />
          </div>
          <h4 className="text-gray-700 font-bold mb-2">Sentinel-2 Data</h4>
          <p className="text-gray-600 font-semibold text-sm leading-relaxed">
            Real-time multispectral imagery
          </p>
        </div>
        <div className="flex flex-col items-center text-center group border-l-green-400 border-gray-300 shadow hover:shadow-xl border-4  p-2 rounded-2xl bg-gray-50">
          <div className="p-3 rounded-full bg-green-400 mb-4">
            <ShieldCheck className="text-gray-50" size={28} />
          </div>
          <h4 className="text-gray-700 font-bold mb-2">Verified Truth</h4>
          <p className="text-gray-600 font-semibold text-sm leading-relaxed">
            Validated by Malawian soil labs
          </p>
        </div>
        <div className="flex flex-col items-center text-center group border-l-green-400 border-gray-300 shadow hover:shadow-xl border-4  p-2 rounded-2xl bg-gray-50">
          <div className="p-3 rounded-full bg-green-400 mb-4  ">
            <div className="text-gray-50 font-black text-2xl">10m</div>
          </div>
          <h4 className="text-gray-700 font-bold mb-2">Pixel Precision</h4>
          <p className="text-gray-600 font-semibold text-sm leading-relaxed">
            Analyze specific field sections
          </p>
        </div>
      </div>
    </div>
  );
}
