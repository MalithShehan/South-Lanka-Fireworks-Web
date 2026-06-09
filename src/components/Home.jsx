import { useEffect, useState, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { asset } from "../lib/assetPath";
import TypewriterText from "./TypewriterText";
import MagneticButton from "./MagneticButton";
import { Sparkles, ChevronDown } from "lucide-react";

const HERO_MESSAGES = [
  "Spectacular Firework Shows",
  "Professional Pyrotechnics",
  "Lighting Up Your Events",
  "Creating Unforgettable Moments",
];

const TRUST_PILLS = [
  { icon: "🔥", text: "1000+ Shows", color: "border-orange-400/30 hover:shadow-orange-400/20" },
  { icon: "⭐", text: "100% Safety", color: "border-emerald-400/30 hover:shadow-emerald-400/20" },
  { icon: "🏆", text: "20+ Years", color: "border-amber-400/30 hover:shadow-amber-400/20" },
  { icon: "🇱🇰", text: "Nationwide", color: "border-cyan-400/30 hover:shadow-cyan-400/20" },
];

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
};

// Stagger container variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Home = () => {
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const scrollYRef = useRef(0);
  const parallaxRef = useRef(null);
  const overlayRef = useRef(null);
  const rafRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setCanPlayVideo(false);
      return undefined;
    }

    const enableVideo = () => setCanPlayVideo(true);

    if (typeof window === "undefined") return undefined;

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(enableVideo, { timeout: 1500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(enableVideo, 600);
    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  // Parallax scroll tracking — uses refs + rAF to avoid React re-renders
  useEffect(() => {
    if (prefersReducedMotion) return;
    let ticking = false;
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(() => {
          const y = scrollYRef.current;
          if (parallaxRef.current) {
            parallaxRef.current.style.transform = `translateY(${y * 0.3}px)`;
          }
          if (overlayRef.current) {
            overlayRef.current.style.opacity = String(Math.max(0, 1 - y / 700));
          }
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <div id="home" className="relative min-h-screen w-full overflow-hidden" role="banner">
      
      <Helmet>
        <title>South Lanka Fireworks | Best Fireworks & Pyrotechnics in Sri Lanka</title>
        <meta
          name="description"
          content="South Lanka Fireworks is the premier pyrotechnic company in Sri Lanka. We deliver spectacular fireworks shows and displays for weddings, festivals, corporate events, and celebrations nationwide."
        />
        <meta
          name="keywords"
          content="South Lanka Fireworks, fireworks Sri Lanka, best fireworks Sri Lanka, wedding fireworks Sri Lanka, pyrotechnics Sri Lanka, event fireworks Sri Lanka, Galle fireworks, Colombo fireworks, Southern Province fireworks, local fireworks company, fireworks show Sri Lanka"
        />
        <meta property="og:image" content="https://slfireworks.com/assets/SouthLankaFireworks.webp" />
        <link rel="icon" href={asset("/assets/SouthLankaFireworks.webp")} />
      </Helmet>

      {/* Background with parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 overflow-hidden"
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-0 left-0 w-full h-[120%] bg-gradient-to-br from-gray-900 via-slate-900 to-black" />
        {canPlayVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute top-0 left-0 w-full h-[120%] object-cover z-10"
            src={asset("/assets/fireworks-video.mp4")}
            aria-hidden="true"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a1a] via-transparent to-transparent z-20" />

      {/* Hero content with staggered animations */}
      <motion.div
        ref={overlayRef}
        className="relative z-30 flex flex-col items-center justify-center text-center min-h-screen px-4 font-poppins"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Sparkle badge */}
        <motion.div variants={itemVariants} className="mb-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-[#0c0a1a]/90 via-[#1a0f14]/85 to-[#0c0a1a]/90 px-5 py-2 text-xs sm:text-sm font-medium text-white/90 shadow-lg backdrop-blur-xl hover:border-amber-400/30 hover:shadow-amber-400/20 hover:shadow-2xl transition-all duration-300">
            <Sparkles size={14} className="text-amber-400 animate-pulse drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            Sri Lanka's Premier Pyrotechnics Company
            <Sparkles size={14} className="text-pink-400 animate-pulse drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
          </span>
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.div variants={itemVariants} className="mb-6 font-Kaushan min-h-[40px]">
          <TypewriterText
            texts={HERO_MESSAGES}
            typingSpeed={70}
            deletingSpeed={35}
            pauseTime={2200}
            className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-amber-200 via-orange-300 to-rose-400 text-transparent bg-clip-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] opacity-90"
          />
        </motion.div>

        {/* Main heading with reveal animation */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight font-Kaushan bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-rose-400 to-violet-400 animate-gradient max-w-5xl"
          style={{
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(251, 191, 36, 0.12)',
            filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))'
          }}
        >
          <span className="sr-only">South Lanka Fireworks - </span>
          We Create Magical
          <br />
          <span className="relative inline-block bg-gradient-to-r from-yellow-300 via-rose-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
            Firework Experiences in Sri Lanka
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-400 via-rose-500 to-cyan-400 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.6)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-200 max-w-2xl text-lg sm:text-xl mb-8 font-light leading-relaxed backdrop-blur-sm"
          style={{
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
          }}
        >
          South Lanka Fireworks delivers unforgettable fireworks shows for
          weddings, festivals, and corporate events across Sri Lanka.
        </motion.p>

        {/* Trust pills */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center mb-10">
          {TRUST_PILLS.map((pill, i) => (
            <motion.span
              key={pill.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`inline-flex items-center gap-2 rounded-full border ${pill.color} bg-gradient-to-br from-[#0c0a1a]/90 to-[#1a0f14]/85 px-4 py-2 text-xs sm:text-sm text-gray-200 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-default`}
            >
              <span aria-hidden="true" className="text-base">{pill.icon}</span>
              {pill.text}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons with magnetic effect */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <nav className="flex gap-4 flex-wrap justify-center" aria-label="Hero actions">
            <MagneticButton
              href="#services"
              strength={0.25}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/30 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold tracking-wide text-white shadow-[0_10px_35px_rgba(255,179,71,0.4),0_0_60px_rgba(236,72,153,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(255,179,71,0.6),0_0_80px_rgba(236,72,153,0.3)] hover:border-rose-300/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-rose-500 opacity-95 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 shimmer-effect" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative flex items-center gap-2 text-white drop-shadow-lg">
                <span className="text-lg" aria-hidden="true">🚀</span>
                Get Started
              </span>
            </MagneticButton>

            <MagneticButton
              href="#contact"
              strength={0.25}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/25 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold tracking-wide text-white shadow-[0_10px_35px_rgba(139,92,246,0.35),0_0_60px_rgba(6,182,212,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(139,92,246,0.5),0_0_80px_rgba(6,182,212,0.3)] hover:border-cyan-300/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-blue-600 to-cyan-500 opacity-95 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 shimmer-effect" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative flex items-center gap-2 text-white drop-shadow-lg">
                <span className="text-lg" aria-hidden="true">📞</span>
                Contact Us
              </span>
            </MagneticButton>
          </nav>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/40">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="text-white/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default memo(Home);