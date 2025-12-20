import { Suspense, lazy } from "react";
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