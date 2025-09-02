import Navbar from "./components/NavBar.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import Services from "./components/Services.jsx";
import Products from "./components/Products.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Contact from "./components/Contact.jsx";

export default function App(){
    return (
        <>
            <Navbar />
            <Home />
            <About />
            <Services />
            <Products />
            <Portfolio />
            <Contact />
            <Footer />
        </>
    )
};