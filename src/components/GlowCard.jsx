"use client";

import { memo } from "react";
import { motion } from "framer-motion";

/**
 * Animated gradient border card with glow effect on hover.
 */
const GlowCard = ({
  children,
  className = "",
  glowColor = "rgba(249, 115, 22, 0.3)",
  borderRadius = "1.5rem",
  delay = 0,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        y: -4,
        borderColor: glowColor,
        boxShadow: `0 20px 40px -10px ${glowColor}, 0 0 40px -15px ${glowColor}`,
        transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
      }}
      className={`relative group overflow-hidden border border-white/10 ${className}`}
      style={{ borderRadius, transition: "border-color 0.35s ease, box-shadow 0.35s ease" }}
      {...rest}
    >
      <div
        className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${glowColor}` }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full">{children}</div>
      <div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, rgba(251, 191, 36, 0.15) 20%, transparent 45%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.1) 50%, transparent 75%)`,
          backgroundSize: "200% 100%",
          animation: "shimmerSweep 2s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
};

export default memo(GlowCard);
