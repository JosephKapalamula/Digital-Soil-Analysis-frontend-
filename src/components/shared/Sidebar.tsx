"use client";
import { useState } from "react";
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
  Leaf,
  Menu,
  X,
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Menu Button - Only visible on screens < 1024px */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-50 border-2 border-green-500 p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
      >
        <Menu className="w-5 h-5 text-gray-700 group-hover:text-green-600 transition-colors" />
      </button>

      {/* Mobile Overlay - Only visible when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div className="bg-blue-200">
        <div
          className={cn(
            "fixed top-0 left-0 bg-gray-50 border-t-4 border-green-500 rounded-t-2xl rounded-b-2xl flex flex-col p-4 z-50 mt-0.5 transition-transform duration-300 ease-in-out shadow-lg",
            "w-64 transform max-h-[75vh] my-4",
            // Always visible on desktop (>= 1024px) - make it long like before
            "lg:translate-x-0 lg:static lg:z-auto lg:h-screen lg:max-h-screen lg:my-0 lg:shadow-none",
            // Hidden by default on mobile, slide in when open
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0",
          )}
        >
          {/* Mobile Close Button - Only visible on mobile */}
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 border-l-2 border-l-gray-400 lg:hidden bg-gray-300 hover:bg-gray-200 p-2 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>

          {/* Brand Logo */}
          <div className="flex items-center gap-3 px-2 mb-10 mt-8 lg:mt-0">
            <div className="bg-green-500 p-2 rounded-xl">
              <Leaf className="text-white" size={24} />
            </div>
            <span className="font-black text-xl tracking-tighter text-gray-700">
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
                  onClick={closeSidebar} // Close sidebar on mobile when link is clicked
                  className={cn(
                    "flex items-center gap-4 px-3 py-3 rounded-xl transition-all group",
                    isActive
                      ? "bg-green-500 text-white shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]"
                      : "text-slate-600 hover:text-gray-900 hover:bg-white/5",
                  )}
                >
                  <item.icon
                    size={22}
                    className={cn(
                      isActive ? "text-white" : "group-hover:text-blue-600",
                    )}
                  />
                  <span className="font-bold text-sm">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
