import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen((prev) => !prev);
  const closeNav = () => setNavOpen(false);

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
    { name: "About Us", to: "aboutus" },
    { name: "Service", to: "service" },
    { name: "Products", to: "products" },
    { name: "Portfolio", to: "portfolio" },
    { name: "Blog", to: "blog" },
    { name: "Contact Us", to: "contactus" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-transparent bg-opacity-80 backdrop-blur-lg z-50 shadow-lg"
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-6 md:px-12 h-20 text-gray-200">
        {/* Logo & Name */}
        <a
          href="#"
          className="flex items-center gap-3 text-2xl font-bold tracking-wide hover:text-indigo-400"
        >
          <img
            src="/assets/South Lanka Fireworks.png"
            alt="Logo"
            className="h-14 w-14 object-contain"
          />
          <span
            className="bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 bg-clip-text text-transparent"
            style={{ fontFamily: "Kaushan Script, cursive" }}
          >
            South Lanka Fireworks
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-lg font-medium">
          {menuItems.map(({ name, to }) => (
            <li key={to} className="hover:text-indigo-400 cursor-pointer">
              <Link to={to} smooth offset={50} duration={500}>
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={toggleNav}
          className="md:hidden text-gray-200 focus:outline-none"
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
            className="fixed top-0 left-0 h-full w-50 bg-transparent text-white md:hidden z-40 p-6 shadow-lg"
          >
            {/* Close Button */}
            <div className="flex justify-end mb-6">
              <button onClick={closeNav} aria-label="Close menu">
                <AiOutlineClose size={24} className="text-white" />
              </button>
            </div>

            {/* Sidebar Links */}
            <ul className="flex flex-col space-y-6 text-base font-medium">
              {menuItems.map(({ name, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={closeNav}
                    smooth
                    offset={50}
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

export default Navbar;
