import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { ChevronUp } from "lucide-react";

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [whatsappPulse, setWhatsappPulse] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShowScrollTop(window.scrollY > 400);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stop pulsing after 10 seconds to reduce distraction
  useEffect(() => {
    const timer = setTimeout(() => setWhatsappPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/94777135516?text=Hello%20South%20Lanka%20Fireworks!%20I%20would%20like%20to%20know%20about%20your%20firework%20packages."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={mounted ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-8 sm:bottom-6 right-4 sm:right-6 z-50 group"
      >
        {/* Pulse ring */}
        {whatsappPulse && (
          <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
        )}
        <div className="relative flex items-center gap-3">
          {/* Tooltip */}
          <span className="hidden sm:block absolute right-full mr-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            Chat with us!
          </span>
          <div className="relative h-14 w-14 rounded-full bg-green-500 shadow-lg shadow-green-500/40 flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all duration-300">
            <FaWhatsapp size={28} className="text-white" />
          </div>
        </div>
      </motion.a>

      {/* Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-8 sm:bottom-6 left-4 sm:left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-rose-300/20 bg-gradient-to-br from-amber-400 to-rose-500 text-white shadow-lg shadow-rose-500/30 transition-colors duration-300 hover:from-amber-300 hover:to-rose-400"
            aria-label="Scroll to top"
          >
            <ChevronUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(FloatingButtons);
