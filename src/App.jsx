import { Suspense, lazy, useEffect } from "react";
import Navbar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import FloatingButtons from "./components/FloatingButtons.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

const TrustBadges = lazy(() => import("./components/TrustBadges.jsx"));
const About = lazy(() => import("./components/About.jsx"));
const Services = lazy(() => import("./components/Services.jsx"));
const Products = lazy(() => import("./components/Products.jsx"));
const Feedback = lazy(() => import("./components/Feedback.jsx"));
const Portfolio = lazy(() => import("./components/Portfolio.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));
const FAQ = lazy(() => import("./components/FAQ.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));

export default function App() {
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
            {/* Floating glow orbs — pure CSS, GPU-composited */}
            <div className="bg-orb bg-orb--1" aria-hidden="true" />
            <div className="bg-orb bg-orb--2" aria-hidden="true" />
            <div className="bg-orb bg-orb--3" aria-hidden="true" />

            {/* Rising sparkle particles */}
            <div className="bg-sparkle bg-sparkle--1" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--2" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--3" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--4" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--5" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--6" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--7" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--8" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--9" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--10" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--11" aria-hidden="true" />
            <div className="bg-sparkle bg-sparkle--12" aria-hidden="true" />

            <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-pink-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
                Skip to main content
            </a>
            <Navbar />
            <main>
                <Home />
                <Suspense fallback={<LoadingSpinner />}>
                    <TrustBadges />
                    <About />
                    <Services />
                    <Products />
                    <Portfolio />
                    <Feedback />
                    <FAQ />
                    <Contact />
                    <Footer />
                </Suspense>
            </main>
            <FloatingButtons />
        </div>
    );
}