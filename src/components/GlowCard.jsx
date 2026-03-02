import { memo } from "react";
import { motion } from "framer-motion";

/**
 * Animated gradient border card with glow effect on hover.
 * Used for service cards, testimonial cards, etc.
 */
const GlowCard = ({
  children,
  className = "",
  glowColor = "rgba(236, 72, 153, 0.3)",
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
        y: -8,
        boxShadow: `0 25px 60px -12px ${glowColor}`,
        transition: { duration: 0.3 },
      }}
      className={`relative group overflow-hidden ${className}`}
      style={{ borderRadius }}
      {...rest}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-[inherit] p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${glowColor}, transparent, ${glowColor})`,
          backgroundSize: "200% 200%",
          animation: "borderGlow 3s ease infinite",
          filter: "blur(10px)",
        }}
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-[inherit] bg-[#0c0a1a]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>

      {/* Hover glow spot — soft gradient, no filter blur */}
      <div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 40%)`,
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
};

export default memo(GlowCard);
