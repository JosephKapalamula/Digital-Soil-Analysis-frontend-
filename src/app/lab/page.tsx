"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { soilService } from "@/services/api";
import {
  Lock,
  UserPlus,
  Fingerprint,
  ArrowRight,
  Mail,
  User,
  Key,
  Globe,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function FieldLabAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen rounded-l-xl shadow-sm border-l-4 ml-1 border-gray-400 bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center p-3 sm:p-4 md:p-6 relative">
      <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8">
        {/* The Auth Card */}
        <div className="bg-white border-l-4 border-gray-300 ounded-4xl sm:rounded-[3rem] p-6 sm:p-8 md:p-12 shadow-2xl shadow-slate-200/60 space-y-6 sm:space-y-8 animate-in slide-in-from-bottom-6 duration-700">
          <div className="text-center space-y-2 sm:space-y-3">
            <div className="">
              <h1 className="text-xl sm:text-2xl font-black text-center text-green-600 tracking-normal leading">
                Field Lab
              </h1>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-left text-slate-600 tracking-tighter leading">
              {isLogin ? "Sign In " : "Create Account"}
            </h2>
          </div>

          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setError("");
              setLoading(true);
              try {
                const result = isLogin
                  ? await soilService.login({ email, password })
                  : await soilService.createUser({ username, email, password });
                localStorage.setItem("token", result.token);
                localStorage.setItem("username", result.username);
                router.push("/lab/dashboard");
              } catch (e: any) {
                setError(e.message);
              } finally {
                setLoading(false);
              }
            }}
          >
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4 sm:w-4.5 sm:h-4.5" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 border-gray-300 rounded-2xl border-b focus:bg-white focus:border-[#00D261] focus:ring-0 font-bold transition-all outline-none focus:border-b-line text-sm sm:text-base"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 text-slate-600 border-gray-300 rounded-2xl border-b-2 focus:bg-white focus:border-[#00D261] focus:ring-0 font-bold transition-all outline-none focus:border-b-line text-sm sm:text-base"
                required
              />
            </div>

            <div className="relative">
              <LockKeyhole className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 text-slate-600 border-gray-300 rounded-2xl border-b-2 focus:bg-white focus:border-[#00D261] focus:ring-0 font-bold transition-all outline-none focus:border-b-line text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-slate-800 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                )}
              </button>
            </div>
            {/* ACTION AREA - Prompts on Left, Button on Right */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-4">
              <p className="text-slate-500 font-bold text-xs sm:text-sm text-center sm:text-left">
                {isLogin ? "No account?" : "Have account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#00D261] hover:underline decoration-2 underline-offset-4 font-black transition-all"
                >
                  {isLogin ? "Sign Up" : "Log In"}
                </button>
              </p>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#00D261] hover:bg-[#00b854] disabled:bg-gray-400 text-white px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 rounded-full font-black text-sm sm:text-lg shadow-lg shadow-[#00D261]/20 transition-all active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                {loading ? "Loading..." : isLogin ? "Login" : "Register"}
                {!loading && (
                  <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                )}
              </button>
            </div>
          </form>

          <p className="text-red-500 text-center">{error}</p>

          <div className="flex items-center gap-2 justify-center text-[8px] sm:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] pt-4 sm:pt-6">
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse text-blue-500" />{" "}
            Sentinel-V3 Security Protocol
          </div>
        </div>
      </div>
    </div>
  );
}
