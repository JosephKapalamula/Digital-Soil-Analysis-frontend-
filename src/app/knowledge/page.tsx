"use client";
import { useState } from "react";
import { BookOpen, Sprout, BarChart3, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

export default function KnowledgeHub() {
  const [activeTopic, setActiveTopic] = useState<number>(1);

  // High-level educational topics
  const topics = [
    {
      id: 1,
      name: "Soil Health Basics",
      icon: Sprout,
      title: "Understanding Your Soil",
      text: "Healthy soil is essential for high yields. It provides nutrients, water, and anchorage for roots. Our system analyzes key factors like pH and nutrient levels to guide your farming decisions.",
    },
    {
      id: 2,
      name: "Crop Selection",
      icon: Lightbulb,
      title: "Choosing the Right Crop",
      text: "Not all crops thrive in the same conditions. By matching your soil's specific profile with regional climate data, we recommend crops that have the highest likelihood of success in your specific location.",
    },
    {
      id: 3,
      name: "Data Driven Farming",
      icon: BarChart3,
      title: "Using Technology on the Farm",
      text: "Modern agriculture uses data to maximize efficiency. By combining physical soil tests with satellite insights, we provide a comprehensive view of your land's potential, helping you make informed decisions.",
    },
  ];

  return (
    <div className="min-h-screen ml-1 border-l-4 border-gray-400 rounded-l-2xl bg-linear-to-br from-slate-50 via-emerald-50 to-teal-50 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 md:space-y-12 animate-in fade-in zoom-in-95 duration-1000">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-linear-to-br from-emerald-600 via-teal-700 to-cyan-800 rounded-2xl sm:rounded-3xl md:rounded-[3rem] p-6 sm:p-8 md:p-12 text-white">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none mb-4 sm:mb-6">
            Agricultural <br /> <span className="text-white/70">Insights</span>
          </h1>
          <p className="text-base sm:text-lg font-bold opacity-80 leading-relaxed">
            Learn the basics of soil management and how digital tools can help
            improve your farming outcomes.
          </p>
        </div>
        <BookOpen className="absolute -right-6 -bottom-6 sm:-right-8 sm:-bottom-8 md:-right-10 md:-bottom-10 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 opacity-10 rotate-12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12">
        {/* TOPIC SELECTOR */}
        <div className="lg:col-span-4 space-y-3 sm:space-y-4">
          <div className="space-y-2 sm:space-y-3">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={cn(
                  "w-full text-left rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 transition-all duration-300 cursor-pointer flex items-center gap-3 sm:gap-4 md:gap-5 ",
                  activeTopic === topic.id
                    ? "bg-gray-200 shadow-xl border-l-2 border-emerald-500"
                    : "bg-white border-l-2 border-gray-400",
                )}
              >
                <div
                  className={cn(
                    "p-3 sm:p-4 rounded-xl sm:rounded-2xl shrink-0",
                    activeTopic === topic.id
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-green-400",
                  )}
                >
                  <topic.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "font-bold text-sm sm:text-base md:text-lg truncate",
                      activeTopic === topic.id
                        ? "text-slate-900"
                        : "text-slate-600",
                    )}
                  >
                    {topic.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT COLUMN */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          <div className="bg-white border-l-4 border-gray-400 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 min-h-75 sm:min-h-87.5 shadow-sm flex flex-col justify-center">
            <div className="animate-in fade-in slide-in-from-right-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-700 mb-4 sm:mb-6 tracking-tighter">
                {topics.find((t) => t.id === activeTopic)?.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                {topics.find((t) => t.id === activeTopic)?.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
