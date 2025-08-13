import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleNav = () => setNavOpen((prev) => !prev);
  const closeNav = () => setNavOpen(false);

  // Hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
  }, [navOpen]);

  const mobileMenuVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.4 },
    },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.3 } },
  };

  const menuItems = [
    { name: "Home", to: "home" },
    { name: "About Us", to: "about" },
    { name: "Service", to: "services" },
    { name: "Products", to: "products" },
    { name: "Portfolio", to: "portfolio" },
    { name: "Blog", to: "blog" },
    { name: "Contact Us", to: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md z-50 shadow-lg"
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-4 sm:px-6 md:px-12 h-20 text-gray-200">
        {/* Logo & Name */}
        <a
          href="#"
          className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold tracking-wide hover:text-indigo-400"
        >
          <img
            src="/assets/SouthLankaFireworks.png"
            alt="Logo"
            className="h-10 w-10 sm:h-14 sm:w-14 object-contain"
          />
          <span
            className="bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 bg-clip-text text-transparent"
            style={{ fontFamily: "Kaushan Script, cursive" }}
          >
            South Lanka Fireworks
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 lg:gap-10 text-base lg:text-lg font-medium">
          {menuItems.map(({ name, to }) => (
            <li key={to} className="hover:text-blue-400 cursor-pointer">
              <Link to={to} smooth offset={-80} duration={500}>
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={toggleNav}
          className="lg:hidden text-gray-200 p-2 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={navOpen}
        >
          {navOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-black/90 text-white lg:hidden z-40 p-6 shadow-lg"
          >
            {/* Close Button */}
            <div className="flex justify-end mb-6">
              <button onClick={closeNav} aria-label="Close menu">
                <AiOutlineClose size={24} className="text-white" />
              </button>
            </div>

            {/* Sidebar Links */}
            <ul className="flex flex-col space-y-6 text-lg font-medium">
              {menuItems.map(({ name, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={closeNav}
                    smooth
                    offset={-80}
                    duration={500}
                    className="hover:text-indigo-400 cursor-pointer"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Section = ({ id, title, bgColor }) => (
  <section
    id={id}
    style={{ height: "100vh", backgroundColor: bgColor }}
    className="flex justify-center items-center"
  >
    <h1 className="text-4xl font-bold text-white">{title}</h1>
  </section>
);

const App = () => {
  return (
    <>
      <Navbar />
      <Section id="home" title="Home Section" bgColor="#1E293B" />
      <Section id="aboutus" title="About Us Section" bgColor="#334155" />
      <Section id="service" title="Service Section" bgColor="#475569" />
      <Section id="products" title="Products Section" bgColor="#64748B" />
      <Section id="portfolio" title="Portfolio Section" bgColor="#94A3B8" />
      <Section id="blog" title="Blog Section" bgColor="#CBD5E1" />
      <Section id="contactus" title="Contact Us Section" bgColor="#F1F5F9" />
    </>
  );
};

export default Navbar;
