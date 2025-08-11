import Navbar from "./components/NavBar.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";
import BackgroundSlider from "./components/BackgroundSlider.jsx";
import FeedbackForm from "./components/FeedBackPage.jsx";
import HeroSection from "./components/HeroSection.jsx";
import Services from "./components/Services.jsx";
import Products from "./components/Products.jsx";
import Portfolio from "./components/Portfolio.jsx";

export default function App(){
    return (
        <>
            <Navbar />
            <BackgroundSlider />
            {/* <HeroSection /> */}
            <About />
            <Services />
            <Products />
            <Portfolio />
            <FeedbackForm />
            <Footer />
        </>
    )
};