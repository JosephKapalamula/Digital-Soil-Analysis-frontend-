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
    <div className="min-h-screen rounded-l-xl shadow-sm border-l-4 ml-1 border-gray-400   bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6 relative">
      <div className="w-full max-w-md space-y-8">
        {/* The Auth Card */}
        <div className="bg-white border-l-4 border-gray-300 rounded-[3rem] p-12 shadow-2xl shadow-slate-200/60 space-y-8 animate-in slide-in-from-bottom-6 duration-700">
          <div className="text-center space-y-3">
            <div className="">
              <h1 className="text-2xl font-black text-center text-green-600 tracking-normal leading">
                Field Lab
              </h1>
            </div>
            <h2 className="text-2xl font-black text-left text-slate-600 tracking-tighter leading">
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
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 border-gray-300 rounded-2xl  border-b focus:bg-white focus:border-[#00D261] focus:ring-0 font-bold transition-all outline-none  focus:border-b-line"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-6 py-4 text-slate-600 border-gray-300 rounded-2xl border-b-2 focus:bg-white focus:border-[#00D261] focus:ring-0 font-bold transition-all outline-none focus:border-b-line"
                required
              />
            </div>

            <div className="relative">
              <LockKeyhole
                className="absolute left-4 top-1/2 -translate-y-1/2  text-blue-400"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 text-slate-600 border-gray-300 rounded-2xl border-b-2 focus:bg-white focus:border-[#00D261] focus:ring-0 font-bold transition-all outline-none focus:border-b-line"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-slate-800 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* ACTION AREA - Prompts on Left, Button on Right */}
            <div className="flex items-center justify-between gap-4 pt-4">
              <p className="text-slate-500 font-bold text-sm">
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
                className="bg-[#00D261] hover:bg-[#00b854] disabled:bg-gray-400 text-white px-6 py-3 rounded-full font-black text-lg shadow-lg shadow-[#00D261]/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? "Loading..." : isLogin ? "Login" : "Register"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </div>
          </form>

          <p className="text-red-500 text-center">{error}</p>

          <div className="flex items-center gap-2 justify-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] pt-6">
            <Globe size={14} className="animate-pulse text-blue-500" />{" "}
            Sentinel-V3 Security Protocol
          </div>
        </div>
      </div>
    </div>
  );
}
