import { useEffect, useState, memo } from "react";
import { Helmet } from "react-helmet-async";

const HERO_MESSAGES = [
  "Spectacular Firework Shows",
  "Professional Pyrotechnics",
  "Lighting Up Your Events",
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

const Home = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const intervalId = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % HERO_MESSAGES.length);
    }, 2600);
    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

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

  const heroMessage = prefersReducedMotion
    ? HERO_MESSAGES[0]
    : HERO_MESSAGES[messageIndex];

  return (
    <div id="home" className="relative min-h-screen w-full overflow-hidden" role="banner">
      
      <Helmet>
        <title>South Lanka Fireworks - Home</title>
        
        <meta
          name="description"
          content="South Lanka Fireworks delivers unforgettable fireworks shows for weddings, festivals, and corporate events across Sri Lanka."
        />
        <meta
          name="keywords"
          content="Fireworks, Pyrotechnics, Firework Shows, Event Fireworks, Wedding Fireworks, Festival Fireworks, Corporate Event Fireworks, Sri Lanka Fireworks"
        />
        <meta property="og:image" content="/assets/SouthLankaFireworks.webp" />
        <link rel="icon" href="/assets/SouthLankaFireworks.webp" />
      </Helmet>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-slate-900 to-black" />
        {canPlayVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute top-0 left-0 w-full h-full object-cover z-10"
            src="/assets/fireworks-video.mp4"
            aria-hidden="true"
          >
            Your browser does not support the video tag.
          </video>
        
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/45 z-20" />


      {/* Hero content */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center min-h-screen px-4 font-poppins">
        <div className="mb-6 font-Kaushan">
          <span
            className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 text-transparent bg-clip-text drop-shadow-[0_0_12px_rgba(255,169,64,0.45)]"
            aria-live="polite"
            role="status"
          >
            {heroMessage}
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-xl font-Kaushan bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 animate-gradient"
        >
          We Create Magical Firework Experiences
          
        </h1>

        <p
          className="text-gray-200 max-w-2xl text-lg sm:text-xl mb-8 font-light"
        >
          South Lanka Fireworks delivers unforgettable fireworks shows for
          weddings, festivals, and corporate events across Sri Lanka.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <nav className="flex gap-4 flex-wrap justify-center mt-6" aria-label="Hero actions">
            <a
              href="#services"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/25 px-8 py-3 text-sm sm:text-base font-semibold tracking-wide text-white shadow-[0_10px_35px_rgba(255,179,71,0.35)] transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 opacity-90 group-hover:opacity-100" />
              <span className="relative flex items-center gap-2 text-white">
                <span className="text-lg" aria-hidden="true">🚀</span>
                Get Started
              </span>
            </a>

            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 px-8 py-3 text-sm sm:text-base font-semibold tracking-wide text-white shadow-[0_10px_35px_rgba(108,127,255,0.3)] transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 opacity-90 group-hover:opacity-100" />
              <span className="relative flex items-center gap-2 text-white">
                <span className="text-lg" aria-hidden="true">📞</span>
                Contact Us
              </span>
            </a>
          </nav>
        </div>

        
      </div>
    </div>
  );
};

export default memo(Home);
