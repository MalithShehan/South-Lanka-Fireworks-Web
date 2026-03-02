import { memo } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { asset } from "../lib/assetPath";
import {
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import { MapPin, Phone, Mail, Clock, Shield, Award, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const FOOTER_LINKS = [
  { label: "Home", to: "home" },
  { label: "About Us", to: "about" },
  { label: "Services", to: "services" },
  { label: "Products", to: "products" },
  { label: "Portfolio", to: "portfolio" },
  { label: "Contact", to: "contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1CEsjdTcV4/?mibextid=wwXIfr",
    Icon: AiFillFacebook,
    hoverColor: "hover:text-blue-500",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@southlankafireworks?_t=ZS-8ysCsrhOBOx&_r=1",
    Icon: SiTiktok,
    hoverColor: "hover:text-pink-500",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/southlankafireworks",
    Icon: AiFillInstagram,
    hoverColor: "hover:text-pink-400",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/94777135516",
    Icon: FaWhatsapp,
    hoverColor: "hover:text-green-500",
  },
];

const TRUST_BADGES = [
  { Icon: Shield, label: "100% Safety Record" },
  { Icon: Award, label: "Licensed & Certified" },
  { Icon: Sparkles, label: "1000+ Shows Delivered" },
];

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-300" role="contentinfo">
      {/* Trust Badges Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TRUST_BADGES.map(({ Icon, label }, i) => (
              <AnimatedSection key={label} variant="scaleUp" delay={i * 0.1} className="flex items-center justify-center gap-3 text-sm">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500/20 to-amber-400/20 flex items-center justify-center"
                >
                  <Icon size={18} className="text-amber-400" />
                </motion.div>
                <span className="text-gray-400 font-medium">{label}</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={asset("/assets/SouthLankaFireworks.webp")}
                alt="South Lanka Fireworks Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 bg-clip-text text-transparent font-kaushan">
                  South Lanka Fireworks
                </h3>
                <p className="text-xs text-gray-500 uppercase tracking-[0.3em]">Since 2005</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Sri Lanka's premier fireworks company delivering unforgettable pyrotechnic experiences for weddings, festivals, and corporate events nationwide.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon, hoverColor }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 transition duration-300 ${hoverColor} hover:border-white/20 hover:bg-white/10`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    smooth
                    offset={-80}
                    duration={500}
                    className="text-sm text-gray-400 hover:text-pink-400 cursor-pointer transition duration-200 flex items-center gap-2"
                  >
                    <span className="h-1 w-1 rounded-full bg-pink-500/50" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white mb-5">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-pink-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">No 07, Dadalle Cross Road, Dadalle, Galle, Sri Lanka</span>
              </li>
              <li>
                <a href="tel:+94777135516" className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition">
                  <Phone size={16} className="text-green-400 flex-shrink-0" />
                  +94 77 713 5516
                </a>
              </li>
              <li>
                <a href="tel:+94912246572" className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition">
                  <Phone size={16} className="text-green-400 flex-shrink-0" />
                  +94 91 224 6572
                </a>
              </li>
              <li>
                <a href="mailto:southlankafireworks@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition break-all sm:break-normal">
                  <Mail size={16} className="text-orange-400 flex-shrink-0" />
                  southlankafireworks@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white mb-5">
              Business Hours
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Mon – Sat</p>
                  <p>9:00 AM – 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">Sunday</p>
                  <p>By Appointment</p>
                </div>
              </li>
            </ul>
            <div className="mt-6">
              <motion.a
                href="https://wa.me/94777135516?text=Hello%20South%20Lanka%20Fireworks!%20I%20would%20like%20to%20get%20a%20quote."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-green-600 hover:bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition shadow-lg shadow-green-600/20"
              >
                <FaWhatsapp size={16} />
                Get a Free Quote
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} South Lanka Fireworks. All rights reserved. | Reg. No: SG/5276
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs text-gray-500 hover:text-pink-400 transition flex items-center gap-1"
            aria-label="Back to top"
          >
            Back to Top ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
