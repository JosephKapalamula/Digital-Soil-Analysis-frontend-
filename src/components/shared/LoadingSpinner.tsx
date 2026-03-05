"use client";

import { useState, useEffect } from "react";

interface LoadingSpinnerProps {
  onComplete?: () => void;
}

export default function LoadingSpinner({ onComplete }: LoadingSpinnerProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Main spinner container */}
      <div className="relative w-24 h-24">
        {/* Outer ring */}
        <div className="absolute inset-0 w-24 h-24 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />

        {/* Middle ring */}
        <div className="absolute inset-2 w-20 h-20 border-4 border-gray-200 border-b-teal-500 rounded-full animate-spin animation-delay-150" />

        {/* Inner ring */}
        <div className="absolute inset-4 w-16 h-16 border-4 border-gray-200 border-l-green-500 rounded-full animate-spin animation-delay-300" />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Custom styles for animation delays */}
      <style jsx>{`
        @keyframes animation-delay-150 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes animation-delay-300 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animation-delay-150 {
          animation: spin 1.5s linear infinite;
          animation-delay: 150ms;
        }

        .animation-delay-300 {
          animation: spin 1s linear infinite;
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
}
