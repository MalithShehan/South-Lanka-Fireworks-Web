import Navbar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import BackgroundSlider from "./components/BackgroundSlider.jsx";

export default function App(){
    return (
        <>
            <Navbar />
            <BackgroundSlider />
            <Hero />
            <Footer />
        </>
    )
}