import { memo } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { asset } from "../../lib/assetPath";
import {
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import { MapPin, Phone, Mail, Clock, Shield, Award, Sparkles } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

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
    hoverColor: "hover:text-blue-400",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@southlankafireworks?_t=ZS-8ysCsrhOBOx&_r=1",
    Icon: SiTiktok,
    hoverColor: "hover:text-rose-400",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/southlankafireworks",
    Icon: AiFillInstagram,
    hoverColor: "hover:text-fuchsia-400",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/94777135516",
    Icon: FaWhatsapp,
    hoverColor: "hover:text-green-400",
  },
];

const TRUST_BADGES = [
  { Icon: Shield, label: "100% Safety Record", color: "text-emerald-400" },
  { Icon: Award, label: "Licensed & Certified", color: "text-blue-400" },
  { Icon: Sparkles, label: "1000+ Shows Delivered", color: "text-amber-400" },
];

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[linear-gradient(180deg,#17100d_0%,#120b08_58%,#0d0907_100%)] text-gray-300" role="contentinfo">
      {/* Trust Badges Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TRUST_BADGES.map(({ Icon, label, color }, i) => (
              <AnimatedSection key={label} variant="scaleUp" delay={i * 0.1} className="flex items-center justify-center gap-3 text-sm">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5"
                >
                  <Icon size={18} className={color} />
                </motion.div>
                <span className="font-medium text-stone-300">{label}</span>
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
                <h3 className="font-kaushan text-lg font-bold text-transparent bg-gradient-to-r from-amber-200 via-orange-300 to-red-400 bg-clip-text">
                  South Lanka Fireworks
                </h3>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Since 2005</p>
              </div>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-stone-300">
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
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-400 transition duration-300 ${hoverColor} hover:border-white/20 hover:bg-white/10`}
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
                    className="flex cursor-pointer items-center gap-2 text-sm text-stone-300 transition duration-200 hover:text-amber-200"
                  >
                    <span className="h-1 w-1 rounded-full bg-amber-300/60" />
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
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-amber-300" />
                <span className="text-stone-300">No 07, Dadalle Cross Road, Dadalle, Galle, Sri Lanka</span>
              </li>
              <li>
                <a href="tel:+94777135516" className="flex items-center gap-3 text-stone-300 transition hover:text-amber-200">
                  <Phone size={16} className="flex-shrink-0 text-amber-300" />
                  +94 77 713 5516
                </a>
              </li>
              <li>
                <a href="tel:+94912246572" className="flex items-center gap-3 text-stone-300 transition hover:text-amber-200">
                  <Phone size={16} className="flex-shrink-0 text-amber-300" />
                  +94 91 224 6572
                </a>
              </li>
              <li>
                <a href="mailto:southlankafireworks@gmail.com" className="flex items-center gap-3 break-all text-stone-300 transition hover:text-amber-200 sm:break-normal">
                  <Mail size={16} className="flex-shrink-0 text-orange-300" />
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
            <ul className="space-y-3 text-sm text-stone-300">
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-amber-400 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Open 24/7</p>
                  <p>Phone, WhatsApp, and quote support every day</p>
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
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-rose-400 to-violet-400 px-5 py-2.5 text-sm font-semibold text-[#1a110d] shadow-lg transition hover:scale-105"
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
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} South Lanka Fireworks. All rights reserved. | Reg. No: SG/5276
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 text-xs text-stone-500 transition hover:text-amber-200"
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
