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
    { name: "Products & packages", to: "products" },
    { name: "Portfolio", to: "portfolio" },
    { name: "Contact Us", to: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85 backdrop-blur-2xl border-b border-white/10" />
      <div className="absolute inset-x-4 sm:inset-x-8 bottom-0 h-[2px] bg-gradient-to-r from-pink-500 via-amber-300 to-blue-400 opacity-70" />
      <div className="relative max-w-[1200px] mx-auto flex flex-nowrap items-center justify-between gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-10 py-2 text-gray-200">
          {/* Logo */}
          <Link
            to="home"
            smooth
            offset={-80}
            duration={500}
        className="group flex min-w-0 items-center gap-3 text-xl sm:text-2xl font-bold tracking-wide cursor-pointer"
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500/40 to-amber-400/40 blur-lg group-hover:blur-xl transition" />
              <img
                src="/assets/SouthLankaFireworks.png"
                alt="Logo"
                className="relative h-10 w-10 sm:h-12 sm:w-12 object-contain drop-shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 bg-clip-text text-transparent font-kaushan leading-tight">
                South Lanka Fireworks
              </span>
              <span className="text-[11px] uppercase tracking-[0.35em] text-gray-400 hidden sm:block">
                Since 2005
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <ul className="flex gap-5 text-sm font-semibold font-montserrat whitespace-nowrap">
              {menuItems.map(({ name, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    smooth
                    offset={-80}
                    duration={500}
                    className="group relative px-2 py-1 tracking-[0.08em] text-white hover:text-white transition"
                  >
                    <span className="relative z-10">{name}</span>
                    <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-gradient-to-r from-pink-400 to-orange-300 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleNav}
            className="lg:hidden text-gray-200 p-2 focus:outline-none rounded-full border border-white/20 bg-white/5"
            aria-label="Toggle menu"
            aria-expanded={navOpen}
          >
            <AiOutlineMenu size={24} />
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
              className="fixed top-0 left-0 h-screen w-3/4 sm:w-2/5
                         backdrop-blur-xl bg-gradient-to-b from-black/90 via-black/70 to-black/80
                         text-white z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <Link
                  to="home"
                  smooth
                  offset={-80}
                  duration={500}
                  onClick={closeNav}
                  className="flex items-center gap-3 cursor-pointer"
                >
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
                </Link>
                <button
                  onClick={closeNav}
                  aria-label="Close menu"
                  className="text-gray-300 hover:text-white"
                >
                  <AiOutlineClose size={26} />
                </button>
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
                      className="block py-3 px-4 rounded-lg text-white
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
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
