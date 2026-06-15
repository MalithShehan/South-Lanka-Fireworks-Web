"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const variants = {
  hidden: { opacity: 0, y: 30 },
  fadeUp: { opacity: 0, y: 30 },
  scaleUp: { opacity: 0, scale: 0.92 },
  fadeLeft: { opacity: 0, x: -30 },
  fadeRight: { opacity: 0, x: 30 },
};

const AnimatedSection = ({
  children,
  variant = "fadeUp",
  delay = 0,
  className = "",
  ...rest
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={variants[variant] || variants.fadeUp}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default memo(AnimatedSection);
