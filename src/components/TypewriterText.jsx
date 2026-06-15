"use client";

import { memo, useEffect, useState } from "react";

/**
 * Typewriter effect with blinking cursor for hero text.
 * Cycles through an array of strings with type/delete animation.
 */
const TypewriterText = ({ texts = [], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setDisplayText(texts[0] || "");
      return;
    }

    const currentText = texts[textIndex] || "";
    let timeout;

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentText.substring(0, displayText.length - 1)
            : currentText.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className} aria-live="polite" role="status">
      {displayText}
      <span
        className={`inline-block w-[3px] h-[1em] ml-1 bg-current align-middle transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
    </span>
  );
};

export default memo(TypewriterText);

