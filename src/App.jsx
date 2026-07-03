import { Suspense, lazy, useEffect, useRef, useState } from "react";
import Navbar from "./components/layout/NavBar.jsx";
import Home from "./components/sections/Home.jsx";
import FloatingButtons from "./components/layout/FloatingButtons.jsx";
import LoadingSpinner from "./components/ui/LoadingSpinner.jsx";

const FireworksCanvas = lazy(() => import("./components/ui/FireworksCanvas.jsx"));
const TrustBadges = lazy(() => import("./components/sections/TrustBadges.jsx"));
const About = lazy(() => import("./components/sections/About.jsx"));
const Services = lazy(() => import("./components/sections/Services.jsx"));
const Products = lazy(() => import("./components/sections/Products.jsx"));
const Feedback = lazy(() => import("./components/sections/Feedback.jsx"));
const Portfolio = lazy(() => import("./components/sections/Portfolio.jsx"));
const Contact = lazy(() => import("./components/sections/Contact.jsx"));
const FAQ = lazy(() => import("./components/sections/FAQ.jsx"));
const Footer = lazy(() => import("./components/layout/Footer.jsx"));

/**
 * Renders children only when close to the viewport (800px lead).
 * Keeps the placeholder height so layout doesn't shift.
 */
function DeferredSection({ children, minHeight = 200, anchorId, subAnchorIds = [] }) {
  const ref = useRef(null);

  // Become visible immediately if the current hash matches this section or any of its sub-anchors
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    const hash = window.location.hash?.slice(1);
    if (!hash) return false;
    return hash === anchorId || subAnchorIds.includes(hash);
  });

  useEffect(() => {
    if (visible) return;

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [anchorId, subAnchorIds, visible]);

  // After becoming visible, scroll to whichever anchor is in the hash
  useEffect(() => {
    if (!visible || typeof window === "undefined") return;
    const hash = window.location.hash?.slice(1);
    if (!hash) return;
    // Only handle if this section owns the hash (primary or sub-anchor)
    const ownsHash = hash === anchorId || subAnchorIds.includes(hash);
    if (!ownsHash) return;

    const timeoutId = window.setTimeout(() => {
      // Try the exact element first (sub-anchor), fall back to the section container
      const target =
        document.getElementById(hash) ||
        (hash === anchorId ? ref.current : null);
      if (!target) return;

      const yOffset = -80;
      const yPosition = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: Math.max(yPosition, 0),
        behavior: "smooth",
      });
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, [anchorId, subAnchorIds, visible]);

  return (
    <div
      ref={ref}
      data-section-anchor={anchorId}
      style={{ minHeight: visible ? 'auto' : minHeight }}
    >
      {visible ? (
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
      ) : null}
    </div>
  );
}

export default function App() {
    const [showCanvas, setShowCanvas] = useState(false);

    // Delay decorative canvas until after first paint for performance
    useEffect(() => {
        const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000));
        const id = idle(() => setShowCanvas(true), { timeout: 3000 });
        return () => {
            if (window.cancelIdleCallback) window.cancelIdleCallback(id);
            else clearTimeout(id);
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return undefined;

        let retryTimeout = null;

        const scrollToHashTarget = () => {
            const hash = window.location.hash?.slice(1);
            if (!hash) return true;

            // Try direct ID match first, then data-section-anchor attribute
            const element =
                document.getElementById(hash) ||
                document.querySelector(`[data-section-anchor="${hash}"]`);

            if (!element) return false;

            const yOffset = -80;
            const yPosition =
                element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({
                top: Math.max(yPosition, 0),
                behavior: "smooth",
            });

            return true;
        };

        const attemptScrollWithRetry = () => {
            window.clearTimeout(retryTimeout);

            let attempts = 0;
            const maxAttempts = 20;

            const tryScroll = () => {
                attempts += 1;
                const done = scrollToHashTarget();
                if (!done && attempts < maxAttempts) {
                    retryTimeout = window.setTimeout(tryScroll, 200);
                }
            };

            tryScroll();
        };

        if (window.location.hash) {
            attemptScrollWithRetry();
        }

        window.addEventListener("hashchange", attemptScrollWithRetry);

        return () => {
            window.removeEventListener("hashchange", attemptScrollWithRetry);
            window.clearTimeout(retryTimeout);
        };
    }, []);

    return (
        <div className="animated-bg" style={{ touchAction: 'pan-y', overscrollBehavior: 'none' }}>
            {/* Interactive fireworks canvas background — deferred until idle */}
            {showCanvas && (
                <Suspense fallback={null}>
                    <FireworksCanvas />
                </Suspense>
            )}

            {/* Floating glow orbs — multi-color, GPU-composited */}
            <div className="bg-orb bg-orb--1" aria-hidden="true" />
            <div className="bg-orb bg-orb--2" aria-hidden="true" />
            <div className="bg-orb bg-orb--3" aria-hidden="true" />
            <div className="bg-orb bg-orb--4" aria-hidden="true" />

            {/* Rising sparkle particles — colorful */}
            <div className="bg-sparkle bg-sparkle--1" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--2" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--3" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--4" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--5" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--6" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--7" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--8" aria-hidden="true" />

            <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-amber-500 focus:text-[#1a110d] focus:px-4 focus:py-2 focus:rounded-lg">
                Skip to main content
            </a>
            <Navbar />
            <main>
                <Home />
                <DeferredSection minHeight={200} anchorId="trust-badges">
                    <TrustBadges />
                </DeferredSection>
                <DeferredSection minHeight={400} anchorId="about">
                    <About />
                </DeferredSection>
                <DeferredSection minHeight={400} anchorId="services">
                    <Services />
                </DeferredSection>
                <DeferredSection minHeight={600} anchorId="products" subAnchorIds={["packages", "custom-package"]}>
                    <Products />
                </DeferredSection>
                <DeferredSection minHeight={400} anchorId="portfolio">
                    <Portfolio />
                </DeferredSection>
                <DeferredSection minHeight={400} anchorId="feedback">
                    <Feedback />
                </DeferredSection>
                <DeferredSection minHeight={300} anchorId="faq">
                    <FAQ />
                </DeferredSection>
                <DeferredSection minHeight={400} anchorId="contact">
                    <Contact />
                </DeferredSection>
                <DeferredSection minHeight={300} anchorId="footer">
                    <Footer />
                </DeferredSection>
            </main>
            <FloatingButtons />
        </div>
    );
}