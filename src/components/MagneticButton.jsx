"use client";

import { memo, useEffect, useRef, useState } from "react";

/**
 * Magnetic button component — button subtly follows cursor on hover.
 */
const MagneticButton = ({ children, className = "", strength = 0.3, as = "button", href, ...rest }) => {
  const ref = useRef(null);
  const [transform, setTransform] = useState("translate(0px, 0px)");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;
      setTransform(`translate(${dx}px, ${dy}px)`);
    };

    const onLeave = () => setTransform("translate(0px, 0px)");

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  const Tag = href ? "a" : as;

  return (
    <Tag
      ref={ref}
      className={className}
      href={href}
      style={{ transform, transition: "transform 0.2s ease-out", willChange: "transform" }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default memo(MagneticButton);
