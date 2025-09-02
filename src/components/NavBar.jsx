import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const sidebarRef = useRef(null);

  const toggleNav = () => setNavOpen((prev) => !prev);
  const closeNav = () => setNavOpen(false);

  // Hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
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

  // Close sidebar on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setNavOpen(false);
      }
    };
    if (navOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navOpen]);

  const menuItems = [
    { name: "Home", to: "home" },
    { name: "About Us", to: "about" },
    { name: "Service", to: "services" },
    { name: "Products", to: "products" },
    { name: "Portfolio", to: "portfolio" },
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
        {/* Logo */}
        <a
          href="home"
          className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold tracking-wide hover:text-indigo-400"
        >
          <img
            src="/assets/SouthLankaFireworks.png"
            alt="Logo"
            className="h-10 w-10 sm:h-14 sm:w-14 object-contain"
          />
          <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 bg-clip-text text-transparent font-kaushan">
            South Lanka Fireworks
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 lg:gap-10 text-base lg:text-lg font-medium font-montserrat">
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
          <AiOutlineMenu size={28} /> {/* Always show the menu icon */}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {navOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              ref={sidebarRef}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.8, 0.25, 1] }}
              className="fixed top-0 left-0 h-screen w-3/4 sm:w-1/2
                         backdrop-blur-xl bg-gradient-to-b from-black/90 via-black/70 to-black/80
                         text-white z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/SouthLankaFireworks.png"
                    alt="Logo"
                    className="h-10 w-10 object-contain drop-shadow-md"
                  />
                  <span
                    className="bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500
                                   bg-clip-text text-transparent font-bold font-kaushan text-lg tracking-wide"
                  >
                    South Lanka Fireworks
                  </span>
                </div>
              </div>

              {/* Links with staggered animation */}
              <ul className="flex flex-col p-6 space-y-3 overflow-y-auto font-montserrat">
                {menuItems.map(({ name, to }, index) => (
                  <motion.li
                    key={to}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      to={to}
                      onClick={closeNav}
                      smooth
                      offset={-80}
                      duration={500}
                      className="block py-3 px-4 rounded-lg
                                 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-red-500
                                 hover:text-black transition-all duration-300
                                 text-lg tracking-wide"
                    >
                      {name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Fonts */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Kaushan+Script&display=swap");

        .font-montserrat {
          font-family: "Montserrat", sans-serif;
        }
        .font-kaushan {
          font-family: "Kaushan Script", cursive;
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
