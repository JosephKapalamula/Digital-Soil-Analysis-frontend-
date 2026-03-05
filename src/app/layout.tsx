import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/shared/Sidebar";
import AppLayout from "@/components/shared/AppLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TerraMalawi | Precision Soil AI",
  description: "Advanced Satellite Soil Analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#808686] text-slate-200 antialiased`}
      >
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 relative overflow-y-auto bg-blue-200">
            <AppLayout>{children}</AppLayout>
          </main>
        </div>
      </body>
    </html>
  );
}
