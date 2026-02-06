import { Suspense, lazy, useEffect } from "react";
import Navbar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";

const About = lazy(() => import("./components/About.jsx"));
const Services = lazy(() => import("./components/Services.jsx"));
const Products = lazy(() => import("./components/Products.jsx"));
const Feedback = lazy(() => import("./components/Feedback.jsx"));
const Portfolio = lazy(() => import("./components/Portfolio.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));
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
        <>
            <Navbar />
            <Home />
            <Suspense fallback={<div className="text-center text-white py-10">Loading experience…</div>}>
                <About />
                <Services />
                <Products />
                <Portfolio />
                <Contact />
                <Footer />
            </Suspense>
        </>
    );
}