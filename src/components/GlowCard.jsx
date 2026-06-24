import { memo, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, animate } from "framer-motion";

/**
 * Helper to safely adjust alpha transparency of any CSS color string (rgba, rgb, hex).
 */
const adjustAlpha = (colorStr, alpha) => {
  if (!colorStr) return `rgba(249, 115, 22, ${alpha})`;
  
  if (colorStr.startsWith("rgba")) {
    return colorStr.replace(/[\d.-]+\)$/, `${alpha})`);
  }
  if (colorStr.startsWith("rgb")) {
    return colorStr.replace("rgb", "rgba").replace(/\)$/, `, ${alpha})`);
  }
  if (colorStr.startsWith("#")) {
    const hex = colorStr.replace("#", "");
    let r = 0, g = 0, b = 0;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return colorStr;
};

/**
 * Parses the class name to extract design border radius values, matching Tailwind specs.
 */
const parseBorderRadius = (className, propRadius) => {
  if (propRadius && propRadius !== "1.5rem") return propRadius;
  
  const arbitraryMatch = className.match(/rounded-\[([^\]]+)\]/);
  if (arbitraryMatch) return arbitraryMatch[1];
  
  if (className.includes("rounded-3xl")) return "1.5rem"; // 24px
  if (className.includes("rounded-2xl")) return "1rem";   // 16px
  if (className.includes("rounded-xl")) return "0.75rem";  // 12px
  if (className.includes("rounded-lg")) return "0.5rem";   // 8px
  
  return propRadius;
};

/**
 * Splits and cleans classes into outer container (layout, sizing, shadow) 
 * and inner container (backgrounds, padding, blurs) to avoid duplication.
 */
const splitClassNames = (className) => {
  const classes = className.split(/\s+/);
  
  const outerClasses = [];
  const innerClasses = [];
  
  classes.forEach(c => {
    if (!c) return;
    
    // Sizing and layout dimensions must reside on the outer container
    if (
      c.startsWith("w-") || 
      c.startsWith("h-") || 
      c.startsWith("col-") || 
      c.startsWith("row-") || 
      c.startsWith("grid-") || 
      c.startsWith("flex-") || 
      c === "flex" || 
      c === "grid" ||
      c.startsWith("m-") || 
      c.startsWith("mx-") || 
      c.startsWith("my-") || 
      c.startsWith("mt-") || 
      c.startsWith("mb-") || 
      c.startsWith("ml-") || 
      c.startsWith("mr-")
    ) {
      outerClasses.push(c);
    }
    // Shadows and animations reside on the outer container
    else if (c.startsWith("shadow-") || c === "shadow") {
      outerClasses.push(c);
    }
    // Background colors, paddings, and filters reside on the inner container
    else if (
      c.startsWith("bg-") || 
      c.startsWith("p-") || 
      c.startsWith("px-") || 
      c.startsWith("py-") || 
      c.startsWith("pt-") || 
      c.startsWith("pb-") || 
      c.startsWith("pl-") || 
      c.startsWith("pr-") ||
      c.startsWith("backdrop-blur")
    ) {
      innerClasses.push(c);
    }
    // Remove border styles entirely from the inner container to avoid duplication
    else if (c.startsWith("border-") || c === "border") {
      // Stripped out
    }
    // Clean rounded corners to prevent conflicts with manual style overrides
    else if (c.startsWith("rounded-")) {
      // Stripped out
    }
    else {
      // Fallback classes go to outer container
      outerClasses.push(c);
    }
  });

  return {
    outerClass: outerClasses.join(" "),
    innerClass: innerClasses.join(" ")
  };
};

/**
 * Animated gradient border card with dynamic mouse-tracking glow spotlight.
 * Used for service cards, testimonial cards, contact modules, etc.
 */
const GlowCard = ({
  children,
  className = "",
  glowColor = "rgba(249, 115, 22, 0.3)",
  borderRadius = "1.5rem",
  delay = 0,
  ...rest
}) => {
  const cardRef = useRef(null);
  
  // Motion values for relative cursor coordinates on the card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Control the visual opacity of the spotlight effects (fade in on enter, out on leave)
  const spotlightOpacity = useMotionValue(0);

  // Springs configuration for organic, lag-free cursor tracking
  const springConfig = { stiffness: 350, damping: 25 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseEnter = () => {
    animate(spotlightOpacity, 1, { duration: 0.3, ease: "easeOut" });
  };

  const handleMouseLeave = () => {
    animate(spotlightOpacity, 0, { duration: 0.35, ease: "easeOut" });
  };

  // Border spotlight: higher opacity, smaller radius for precision
  const borderBg = useMotionTemplate`
    radial-gradient(
      180px circle at ${mouseXSpring}px ${mouseYSpring}px,
      ${adjustAlpha(glowColor, 0.65)},
      transparent 80%
    )
  `;

  // Inner card spotlight: lower opacity, wider radius for ambient glow
  const innerBg = useMotionTemplate`
    radial-gradient(
      280px circle at ${mouseXSpring}px ${mouseYSpring}px,
      ${adjustAlpha(glowColor, 0.18)},
      transparent 80%
    )
  `;

  const finalRadius = parseBorderRadius(className, borderRadius);
  const { outerClass, innerClass } = splitClassNames(className);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        y: -6,
        scale: 1.012,
        boxShadow: `0 25px 50px -12px ${adjustAlpha(glowColor, 0.28)}, 0 0 35px -15px ${adjustAlpha(glowColor, 0.18)}`,
        transition: { type: "spring", stiffness: 400, damping: 22 },
      }}
      className={`relative p-[1.2px] overflow-hidden ${outerClass}`}
      style={{
        borderRadius: finalRadius,
      }}
      {...rest}
    >
      {/* 1. Base static border color (visible when not hovered) */}
      <div 
        className="absolute inset-0 bg-white/10 z-0 pointer-events-none rounded-[inherit]" 
        style={{ borderRadius: finalRadius }}
      />

      {/* 2. Dynamic border spotlight background */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 rounded-[inherit]"
        style={{
          background: borderBg,
          opacity: spotlightOpacity,
          borderRadius: finalRadius,
        }}
      />

      {/* 3. Inner card container - masks the backdrop and supports inner ambient glow */}
      <div
        className={`relative z-10 w-full h-full overflow-hidden bg-[#0d0717]/60 ${innerClass}`}
        style={{
          borderRadius: `calc(${finalRadius} - 1.2px)`,
        }}
      >
        {/* Soft inner ambient spotlight glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: innerBg,
            opacity: spotlightOpacity,
          }}
        />

        {/* Card Content */}
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    </motion.div>
  );
};

export default memo(GlowCard);


