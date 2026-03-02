import { Suspense, lazy, useEffect, useRef, useState } from "react";
import Navbar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import FloatingButtons from "./components/FloatingButtons.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

const FireworksCanvas = lazy(() => import("./components/FireworksCanvas.jsx"));
const TrustBadges = lazy(() => import("./components/TrustBadges.jsx"));
const About = lazy(() => import("./components/About.jsx"));
const Services = lazy(() => import("./components/Services.jsx"));
const Products = lazy(() => import("./components/Products.jsx"));
const Feedback = lazy(() => import("./components/Feedback.jsx"));
const Portfolio = lazy(() => import("./components/Portfolio.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));
const FAQ = lazy(() => import("./components/FAQ.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));

/**
 * Renders children only when close to the viewport (800px lead).
 * Keeps the placeholder height so layout doesn't shift.
 */
function DeferredSection({ children, minHeight = 200 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
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

    // Delay decorative canvas until after first paint
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

            const element = document.getElementById(hash);
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
            const maxAttempts = 10;

            const tryScroll = () => {
                attempts += 1;
                const done = scrollToHashTarget();
                if (!done && attempts < maxAttempts) {
                    retryTimeout = window.setTimeout(tryScroll, 150);
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
        <div className="animated-bg">
            {/* Interactive fireworks canvas background — deferred until idle */}
            {showCanvas && (
                <Suspense fallback={null}>
                    <FireworksCanvas />
                </Suspense>
            )}

            {/* Floating glow orbs — pure CSS, GPU-composited */}
            <div className="bg-orb bg-orb--1" aria-hidden="true" />
            <div className="bg-orb bg-orb--2" aria-hidden="true" />
            <div className="bg-orb bg-orb--3" aria-hidden="true" />

            {/* Rising sparkle particles — reduced to 6 for GPU savings */}
            <div className="bg-sparkle bg-sparkle--1" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--2" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--3" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--4" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--5" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--6" aria-hidden="true" />

            <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-pink-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
                Skip to main content
            </a>
            <Navbar />
            <main>
                <Home />
                <DeferredSection minHeight={200}>
                    <TrustBadges />
                </DeferredSection>
                <DeferredSection minHeight={400}>
                    <About />
                </DeferredSection>
                <DeferredSection minHeight={400}>
                    <Services />
                </DeferredSection>
                <DeferredSection minHeight={600}>
                    <Products />
                </DeferredSection>
                <DeferredSection minHeight={400}>
                    <Portfolio />
                </DeferredSection>
                <DeferredSection minHeight={400}>
                    <Feedback />
                </DeferredSection>
                <DeferredSection minHeight={300}>
                    <FAQ />
                </DeferredSection>
                <DeferredSection minHeight={400}>
                    <Contact />
                </DeferredSection>
                <DeferredSection minHeight={300}>
                    <Footer />
                </DeferredSection>
            </main>
            <FloatingButtons />
        </div>
    );
}