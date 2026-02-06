const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <div className="relative h-16 w-16">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-4 border-white/10" />
      {/* Spinning gradient ring */}
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-500 border-r-amber-400 animate-spin" />
      {/* Inner glow */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-pink-500/20 to-amber-500/20 flex items-center justify-center">
        <span className="text-lg">✨</span>
      </div>
    </div>
    <div className="text-center">
      <p className="text-sm font-medium text-gray-300">Loading experience</p>
      <p className="text-xs text-gray-500 mt-1">Preparing something spectacular...</p>
    </div>
  </div>
);

export default LoadingSpinner;
