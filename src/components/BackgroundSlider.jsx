import React from "react";
import { motion } from "framer-motion";

const textAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const BackgroundSlider = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 🔥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/assets/fireworks-video.mp4"
      >
        Your browser does not support the video tag.
      </video>

      {/* 🔳 Overlay for dark effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>

      {/* Text at bottom */}
      <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center pb-20 z-20 px-4">
        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] tracking-wide"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            South Lanka Fireworks
          </motion.h1>

          <motion.p
            className="text-white/90 text-base sm:text-xl md:text-4xl px-6 py-3 rounded-xl backdrop-blur-sm"
            style={{ fontFamily: "Caveat, cursive" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Lighting up your celebrations with brilliance!
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default BackgroundSlider;
