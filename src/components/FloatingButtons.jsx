import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { ChevronUp } from "lucide-react";

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [whatsappPulse, setWhatsappPulse] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
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
        className="fixed bottom-6 right-6 z-50 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
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
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full bg-white/90 border border-gray-200 shadow-lg flex items-center justify-center text-gray-700 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300 backdrop-blur"
            aria-label="Scroll to top"
          >
            <ChevronUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingButtons;
