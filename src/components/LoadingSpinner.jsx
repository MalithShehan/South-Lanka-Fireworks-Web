"use client";

import { asset } from "@/lib/assetPath";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
    <div className="relative h-24 w-24">
      <div className="absolute inset-0 rounded-full border-4 border-white/10 bg-white/5 shadow-[0_0_40px_rgba(249,115,22,0.08)]" />
      <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-orange-400 border-r-amber-300 animate-spin" />
      <div className="absolute inset-3 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400/20 to-amber-300/20 ring-1 ring-white/10">
        <img
          src={asset("/assets/SouthLankaFireworks.webp")}
          alt="South Lanka Fireworks Logo"
          className="h-11 w-11 object-contain"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
    <div className="text-center">
      <p className="text-sm font-medium text-gray-300">Loading experience</p>
      <p className="text-xs text-gray-500 mt-1">Preparing something spectacular...</p>
    </div>
  </div>
);

export default LoadingSpinner;
