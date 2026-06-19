import React, { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiPhoneCall, FiMessageCircle } from "react-icons/fi";
import { Link } from "react-scroll";
import { asset } from "../lib/assetPath";

const MENU_ITEMS = [
  { name: "Home", to: "home", helper: "Signature hero + CTA" },
  { name: "About Us", to: "about", helper: "Licensed crew & mission" },
  { name: "Services", to: "services", helper: "Firework services lineup" },
  { name: "Catalogue", to: "products", helper: "Individual shells & effects" },
  { name: "Packages", to: "packages", helper: "Pre-built show templates" },
  { name: "Portfolio", to: "portfolio", helper: "Recent launches & reels" },
  { name: "Contact", to: "contact", helper: "Quotes + dispatch" },
];

const QUICK_ACTIONS = [
  {
    label: "Call",
    helper: "Contact",
    href: "tel:+94777135516",
    Icon: FiPhoneCall,
  },
  {
    label: "WhatsApp ",
    helper: "Message",
    href: "https://wa.me/94777135516",
    Icon: FiMessageCircle,
  },
];

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const sidebarRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const navRef = useRef(null);
  const navBgRef = useRef(null);
  const progressBarRef = useRef(null);

  const toggleNav = () => setNavOpen((prev) => !prev);
  const closeNav = () => setNavOpen(false);
  const updateHash = (target) => {
    if (typeof window === "undefined") return;
    window.history.replaceState(null, "", `#${target}`);
    
    const titles = {
      home: "South Lanka Fireworks - Premium Pyrotechnics Sri Lanka",
      about: "South Lanka Fireworks - About Our Certified Crew & Safety",
      services: "South Lanka Fireworks - Professional Pyrotechnics Services",
      products: "South Lanka Fireworks - Custom Package Builder & Catalogue",
      packages: "South Lanka Fireworks - Signature Show Packages & Pricing",
      portfolio: "South Lanka Fireworks - Featured Shows & Live Launches",
      contact: "South Lanka Fireworks - Get a Free Quote & Book Now",
    };

    const descriptions = {
      home: "South Lanka Fireworks delivers premium pyrotechnic shows for weddings, festivals, and corporate celebrations across Sri Lanka.",
      about: "Learn about South Lanka Fireworks: our 20+ years of industry experience, 100% safety record, and certified crew.",
      services: "Explore our pyrotechnics services: custom fireworks displays, special effects, safety planning, and islandwide delivery.",
      products: "Use our bespoke package builder to customize your fireworks setup or browse our individual specialty shells catalog.",
      packages: "Compare our 6 pre-built fireworks packages designed for weddings, corporate events, and festivals.",
      portfolio: "Watch high-definition clips of our featured launches, New Year countdowns, and landmark shows across Sri Lanka.",
      contact: "Contact South Lanka Fireworks for a free quote. We respond within 2 hours to help you plan your event's display.",
    };
    
    if (titles[target]) {
      document.title = titles[target];
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", titles[target]);
      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.setAttribute("content", titles[target]);
    }
    if (descriptions[target]) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", descriptions[target]);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", descriptions[target]);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute("content", descriptions[target]);
    }
  };

  // Hide/show navbar on scroll + progress bar (ref-based, zero re-renders)
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const shouldShow = currentY <= lastScrollYRef.current || currentY < 80;
        const scrolled = currentY > 50;
        lastScrollYRef.current = currentY;

        // Update nav visibility
        if (navRef.current) {
          navRef.current.style.transform = shouldShow ? 'translateY(0)' : 'translateY(-100px)';
        }

        // Update background opacity
        if (navBgRef.current) {
          navBgRef.current.style.background = scrolled
            ? 'linear-gradient(to right, rgba(18,11,8,0.96), rgba(24,14,10,0.9), rgba(18,11,8,0.96))'
            : 'linear-gradient(to right, rgba(18,11,8,0.84), rgba(24,14,10,0.74), rgba(18,11,8,0.84))';
        }

        // Update progress bar
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (currentY / docHeight) * 100 : 0;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${Math.min(progress, 100)}%`;
        }

        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open — save/restore scroll position
  useEffect(() => {
    if (navOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
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

  return (
    <nav
      ref={navRef}
      style={{ transform: 'translateY(0)', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div
        ref={navBgRef}
        className="absolute inset-0 border-b border-white/10 backdrop-blur-xl transition-[background] duration-500"
        style={{ background: 'linear-gradient(to right, rgba(18,11,8,0.84), rgba(24,14,10,0.74), rgba(18,11,8,0.84))' }}
      />
      {/* Scroll progress bar */}
      <div
        ref={progressBarRef}
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-300 via-rose-500 to-violet-500 transition-[width] duration-150"
        style={{ width: '0%' }}
        role="progressbar"
        aria-label="Page scroll progress"
      />
      <div className="relative max-w-[1200px] mx-auto flex flex-nowrap items-center justify-between gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-10 py-2 text-gray-200">
          {/* Logo */}
          <Link
            to="home"
            smooth
            offset={-80}
            duration={500}
            onClick={() => updateHash("home")}
        className="group flex min-w-0 items-center gap-3 text-xl sm:text-2xl font-bold tracking-wide cursor-pointer"
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/40 to-orange-400/40 blur-lg transition group-hover:blur-xl" />
              <img
                src={asset("/assets/SouthLankaFireworks.webp")}
                alt="South Lanka Fireworks Logo"
                width={48}
                height={48}
                className="relative h-10 w-10 sm:h-12 sm:w-12 object-contain drop-shadow-lg"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-rose-300 bg-clip-text text-transparent font-kaushan leading-tight">
                South Lanka Fireworks
              </span>
              <span className="text-[11px] uppercase tracking-[0.35em] text-gray-400 hidden sm:block">
                Since 2005
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-4 flex-shrink-0" aria-label="Main navigation">
            <ul className="flex gap-5 text-sm font-semibold whitespace-nowrap" role="list">
              {MENU_ITEMS.map(({ name, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    smooth
                    offset={-80}
                    duration={500}
                    onClick={() => updateHash(to)}
                    className="group relative px-2 py-1 tracking-[0.08em] text-white hover:text-white transition"
                  >
                    <span className="relative z-10">{name}</span>
                    <span className="absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-amber-300 via-rose-400 to-violet-400 transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/94777135516?text=Hello%20South%20Lanka%20Fireworks!%20I%20would%20like%20to%20get%20a%20quote%20for%20my%20event."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get a quote via WhatsApp"
              className="group relative ml-2 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-violet-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition-all hover:scale-105 hover:shadow-rose-500/30 whitespace-nowrap"
            >
              <span className="absolute inset-0 shimmer-effect" />
              <span className="relative">Get a Quote</span>
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={toggleNav}
            className="lg:hidden text-gray-200 p-2.5 focus:outline-none rounded-full border border-white/20 bg-white/5 active:bg-white/15 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={navOpen}
            style={{ touchAction: 'manipulation' }}
          >
            <AiOutlineMenu size={24} />
          </button>
        </div>

      {/* Mobile Menu */}
      {navOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={closeNav}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden animate-[fadeIn_0.3s_ease]"
          />

          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className="fixed top-0 left-0 h-screen w-3/4 sm:w-2/5
                       text-white z-50 shadow-2xl flex flex-col backdrop-blur-xl border-r border-white/10
                       animate-[slideInLeft_0.4s_ease]"
            style={{
              background: 'linear-gradient(180deg, rgba(18, 11, 8, 0.98) 0%, rgba(23, 16, 13, 0.96) 50%, rgba(13, 9, 7, 0.98) 100%)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 gap-3">
              <Link
                to="home"
                smooth
                offset={-80}
                duration={500}
                onClick={() => {
                  updateHash("home");
                  closeNav();
                }}
                className="flex items-center gap-2 cursor-pointer min-w-0 flex-1"
              >
                <img
                  src={asset("/assets/SouthLankaFireworks.webp")}
                  alt="South Lanka Fireworks Logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain drop-shadow-md flex-shrink-0"
                  loading="lazy"
                  decoding="async"
                />
                <span
                  className="bg-gradient-to-r from-yellow-300 via-orange-300 to-rose-300
                                 bg-clip-text text-transparent font-bold font-kaushan text-base tracking-wide truncate"
                >
                  South Lanka
                </span>
              </Link>
              <button
                onClick={closeNav}
                aria-label="Close menu"
                className="text-gray-300 hover:text-white p-2 rounded-lg active:bg-white/10 flex-shrink-0"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            <div className="p-6 border-b border-white/5 bg-white/5">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-3">
                Rapid Response
              </p>
              <div className="grid grid-cols-1 gap-3">
                {QUICK_ACTIONS.map(({ label, helper, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 hover:bg-white/10 transition"
                  >
                    <div>
                      <p className="font-semibold">{label}</p>
                      <p className="text-xs text-white/60">{helper}</p>
                    </div>
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-yellow-300/40 to-orange-400/40">
                      <Icon size={18} />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links with staggered CSS animation */}
            <ul className="flex flex-col p-6 space-y-3 overflow-y-auto">
              {MENU_ITEMS.map(({ name, to, helper }, index) => (
                <li
                  key={to}
                  className="animate-[slideInItem_0.35s_ease_forwards]"
                  style={{ opacity: 0, animationDelay: `${index * 0.08}s` }}
                >
                  <Link
                    to={to}
                    onClick={() => {
                      updateHash(to);
                      closeNav();
                    }}
                    smooth
                    offset={-80}
                    duration={500}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/0 px-4 py-4 text-white transition-all duration-300 hover:border-amber-200/30 hover:bg-white/10"
                  >
                    <span className="text-xs font-semibold tracking-[0.4em] text-white/50">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-base font-semibold">{name}</p>
                      {helper && (
                        <p className="text-xs text-white/60">{helper}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

    </nav>
  );
};

export default memo(Navbar);
