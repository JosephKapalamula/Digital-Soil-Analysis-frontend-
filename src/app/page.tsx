import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Globe2 } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white px-4 sm:px-6 md:px-12 lg:px-24 relative overflow-hidden rounded-l-2xl ml-1">
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img7.png"
          alt="Malawi Soil Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      {/* Hero Content */}
      <div className="max-w-4xl mx-auto text-center z-10 grow flex flex-col justify-center mt-4 sm:mt-6 md:mt-8 px-2 sm:px-4">
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#00D261]/20 bg-white text-[#00D261] text-xs sm:text-xs font-black tracking-widest uppercase">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D261] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#00D261]"></span>
            </span>
            Precision Agriculture Malawi
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight">
          SOIL INTELLIGENCE <br />
          <span className="text-transparent bg-clip-text bg-linear-to-br from-emerald-400 to-blue-400">
            FROM SPACE
          </span>
        </h1>

        <p className="mb-8 sm:mb-10 md:mb-12 mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          The AI-powered soil analysis platform built specifically for the
          unique topography of Malawi. 10-meter precision.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5">
          <Link
            href="/explorer"
            className="w-auto sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 active:scale-95 text-white rounded-4xl font-bold text-sm sm:text-base md:text-lg transition-all flex items-center justify-center gap-2 group shadow-lg hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 active:shadow-sm active:translate-y-0 min-w-0"
          >
            Start Exploring{" "}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
          <Link
            href="/lab"
            className="w-auto sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-green-400 hover:bg-emerald-500 active:bg-emerald-600 active:scale-95 text-white rounded-4xl font-bold text-sm sm:text-base md:text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 active:shadow-sm active:translate-y-0 min-w-0"
          >
            Field Lab Login
          </Link>
        </div>
      </div>

      {/* Trust Badges - VISIBILITY FIX: Added relative and z-10 */}
      <div className="relative z-10 mt-12 sm:mt-14 md:mt-16 pb-8 sm:pb-10 md:pb-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-8 sm:pt-10 md:pt-12 w-full max-w-4xl mx-auto px-2 sm:px-4">
        <div className="flex flex-col items-center text-center group border-l-green-400 border-gray-300 shadow hover:shadow-xl border-4 p-1.5 sm:p-2 md:p-3 rounded-2xl bg-gray-50">
          <div className="p-1.5 sm:p-2 md:p-2.5 rounded-full bg-green-400 mb-1.5 sm:mb-2 md:mb-3">
            <Globe2 className="text-gray-50 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </div>
          <h4 className="text-gray-700 font-bold mb-1 sm:mb-1.5 md:mb-2 text-xs">
            Sentinel-2 Data
          </h4>
          <p className="text-gray-600 font-semibold text-xs leading-relaxed">
            Real-time multispectral imagery
          </p>
        </div>
        <div className="flex flex-col items-center text-center group border-l-green-400 border-gray-300 shadow hover:shadow-xl border-4 p-1.5 sm:p-2 md:p-3 rounded-2xl bg-gray-50">
          <div className="p-1.5 sm:p-2 md:p-2.5 rounded-full bg-green-400 mb-1.5 sm:mb-2 md:mb-3">
            <ShieldCheck className="text-gray-50 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </div>
          <h4 className="text-gray-700 font-bold mb-1 sm:mb-1.5 md:mb-2 text-xs">
            Verified Truth
          </h4>
          <p className="text-gray-600 font-semibold text-xs leading-relaxed">
            Validated by Malawian soil labs
          </p>
        </div>
        <div className="flex flex-col items-center text-center group border-l-green-400 border-gray-300 shadow hover:shadow-xl border-4 p-1.5 sm:p-2 md:p-3 rounded-2xl bg-gray-50">
          <div className="p-1.5 sm:p-2 md:p-2.5 rounded-full bg-green-400 mb-1.5 sm:mb-2 md:mb-3">
            <div className="text-gray-50 font-black text-sm sm:text-base md:text-lg lg:text-xl">
              10m
            </div>
          </div>
          <h4 className="text-gray-700 font-bold mb-1 sm:mb-1.5 md:mb-2 text-xs">
            Pixel Precision
          </h4>
          <p className="text-gray-600 font-semibold text-xs leading-relaxed">
            Analyze specific field sections
          </p>
        </div>
      </div>
    </div>
  );
}
