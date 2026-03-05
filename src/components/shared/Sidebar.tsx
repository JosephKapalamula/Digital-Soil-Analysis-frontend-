"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Home, 
  Map as MapIcon, 
  BarChart3, 
  FlaskConical, 
  Database, 
  BookOpen, 
  UserCircle,
  Leaf
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Explorer", icon: MapIcon, href: "/explorer" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Knowledge", icon: BookOpen, href: "/knowledge" },
   { name: "Field Lab", icon: FlaskConical, href: "/lab" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-blue-200">
      {/* <div className="bg-blue-200 h-2"></div> */}
    <div className="w-10 lg:w-64 h-screen bg-gray-50 border-t-4 border-green-500 rounded-t-2xl flex flex-col p-4 z-1000 mt-0.5">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="bg-green-500 p-2 rounded-xl">
          <Leaf className="text-white" size={24} />
        </div>
        <span className="hidden lg:block font-black text-xl tracking-tighter text-gray-700">
          TERRA<span className="text-emerald-500">MALAWI</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-3 py-3 rounded-xl transition-all group",
                isActive 
                  ? "bg-green-500 text-white shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]" 
                  : "text-slate-600 hover:text-gray-900 hover:bg-white/5"
              )}
            >
              <item.icon size={22} className={cn(isActive ? "text-white" : "group-hover:text-blue-600")} />
              <span className="hidden lg:block font-bold text-sm">{item.name}</span>
              {isActive && <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Section */}
      <div className="mt-auto border-t border-white/5 pt-4">
        <button className="flex items-center gap-4 px-3 py-3 w-full text-slate-500 hover:text-white transition-all">
          <UserCircle size={22} />
          <span className="hidden lg:block font-bold text-sm">Account</span>
        </button>
      </div>
    </div>
    </div>
  );
}