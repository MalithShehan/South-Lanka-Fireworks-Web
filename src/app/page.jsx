"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/NavBar";
import Home from "@/components/Home";
import FloatingButtons from "@/components/FloatingButtons";
import LoadingSpinner from "@/components/LoadingSpinner";

// Deferred sections — loaded only when near viewport (ssr:false = client-only, safe for browser APIs)
const FireworksCanvas = dynamic(() => import("@/components/FireworksCanvas"), { ssr: false, loading: () => null });
const TrustBadges   = dynamic(() => import("@/components/TrustBadges"),   { ssr: false, loading: () => <LoadingSpinner /> });
const About         = dynamic(() => import("@/components/About"),          { ssr: false, loading: () => <LoadingSpinner /> });
const Services      = dynamic(() => import("@/components/Services"),       { ssr: false, loading: () => <LoadingSpinner /> });
const Products      = dynamic(() => import("@/components/Products"),       { ssr: false, loading: () => <LoadingSpinner /> });
const Portfolio     = dynamic(() => import("@/components/Portfolio"),      { ssr: false, loading: () => <LoadingSpinner /> });
const Feedback      = dynamic(() => import("@/components/Feedback"),       { ssr: false, loading: () => <LoadingSpinner /> });
const FAQ           = dynamic(() => import("@/components/FAQ"),            { ssr: false, loading: () => <LoadingSpinner /> });
const Contact       = dynamic(() => import("@/components/Contact"),        { ssr: false, loading: () => <LoadingSpinner /> });
const Footer        = dynamic(() => import("@/components/Footer"),         { ssr: false, loading: () => <LoadingSpinner /> });

/**
 * DeferredSection: renders children only when near viewport.
 * Keeps placeholder height to prevent layout shifts.
 */
function DeferredSection({ children, minHeight = 200, anchorId }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return Boolean(window.location.hash) &&
      window.location.hash?.slice(1) === anchorId;
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
  }, [anchorId, visible]);

  useEffect(() => {
    if (!visible || typeof window === "undefined") return;
    if (!anchorId || window.location.hash?.slice(1) !== anchorId) return;
    const timeoutId = window.setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const yOffset = -80;
      const yPosition = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(yPosition, 0), behavior: "auto" });
    }, 120);
    return () => window.clearTimeout(timeoutId);
  }, [anchorId, visible]);

  return (
    <div ref={ref} data-section-anchor={anchorId} style={{ minHeight: visible ? "auto" : minHeight }}>
      {visible ? children : null}
    </div>
  );
}

export default function HomePage() {
  const [showCanvas, setShowCanvas] = useState(false);

  // Skip fireworks canvas on mobile — too heavy for smooth scrolling
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || ("ontouchstart" in window && window.innerWidth < 1024);
    if (isMobile) return;
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000));
    const id = idle(() => setShowCanvas(true), { timeout: 3000 });
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  // Handle hash-based navigation on load
  useEffect(() => {
    if (typeof window === "undefined") return;
    let retryTimeout = null;
    const scrollToHashTarget = () => {
      const hash = window.location.hash?.slice(1);
      if (!hash) return true;
      const element =
        document.getElementById(hash) ||
        document.querySelector(`[data-section-anchor="${hash}"]`);
      if (!element) return false;
      const yOffset = -80;
      const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(yPosition, 0), behavior: "smooth" });
      return true;
    };
    const attemptScrollWithRetry = () => {
      window.clearTimeout(retryTimeout);
      let attempts = 0;
      const tryScroll = () => {
        attempts += 1;
        const done = scrollToHashTarget();
        if (!done && attempts < 10) retryTimeout = window.setTimeout(tryScroll, 150);
      };
      tryScroll();
    };
    if (window.location.hash) attemptScrollWithRetry();
    window.addEventListener("hashchange", attemptScrollWithRetry);
    return () => {
      window.removeEventListener("hashchange", attemptScrollWithRetry);
      window.clearTimeout(retryTimeout);
    };
  }, []);

  return (
    <div className="animated-bg" style={{ touchAction: "pan-y", overscrollBehavior: "none" }}>
      {showCanvas && <FireworksCanvas />}

      {/* Floating glow orbs */}
      <div className="bg-orb bg-orb--1" aria-hidden="true" />
      <div className="bg-orb bg-orb--2" aria-hidden="true" />
      <div className="bg-orb bg-orb--3" aria-hidden="true" />
      <div className="bg-orb bg-orb--4" aria-hidden="true" />

      {/* Rising sparkle particles */}
      <div className="bg-sparkle bg-sparkle--1" aria-hidden="true" />
      <div className="bg-sparkle bg-sparkle--2" aria-hidden="true" />
      <div className="bg-sparkle bg-sparkle--3" aria-hidden="true" />
      <div className="bg-sparkle bg-sparkle--4" aria-hidden="true" />
      <div className="bg-sparkle bg-sparkle--5" aria-hidden="true" />
      <div className="bg-sparkle bg-sparkle--6" aria-hidden="true" />
      <div className="bg-sparkle bg-sparkle--7" aria-hidden="true" />
      <div className="bg-sparkle bg-sparkle--8" aria-hidden="true" />

      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-amber-500 focus:text-[#1a110d] focus:px-4 focus:py-2 focus:rounded-lg"
      >
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
        <DeferredSection minHeight={600} anchorId="products">
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
