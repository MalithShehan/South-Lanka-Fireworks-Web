import { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * Reusable scroll-reveal wrapper with multiple animation presets.
 * 
 * @param {"fadeUp"|"fadeDown"|"fadeLeft"|"fadeRight"|"scaleUp"|"blur"|"rotate"} variant
 * @param {number} delay - Stagger delay in seconds
 * @param {number} duration - Animation duration in seconds
 * @param {boolean} once - Only animate once when entering viewport
 * @param {string} className - Additional CSS classes
 */

const presets = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -5, y: 40 },
    visible: { opacity: 1, rotate: 0, y: 0 },
  },
};

const AnimatedSection = ({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.7,
  once = true,
  className = "",
  as = "div",
  threshold = 0.15,
  ...rest
}) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  const animations = presets[variant] || presets.fadeUp;
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={animations}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
};

export default memo(AnimatedSection);
