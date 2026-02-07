import React from "react";
import { motion } from "framer-motion";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si"; 
import { Helmet } from "react-helmet-async";

const About = () => {
  const highlights = [
    { label: "Shows Delivered", value: "1000+", detail: "Island-wide" },
    { label: "Years Experience", value: "20+", detail: "Since 2005" },
    { label: "Safety Record", value: "100%", detail: "Certified crew" },
    { label: "Repeat Clients", value: "85%", detail: "Trusted partner" },
  ];

  return (
    <section
      id="about"
      className="relative py-20 px-4 md:px-10 text-gray-100 overflow-hidden"
      aria-label="About South Lanka Fireworks"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 h-48 w-48 bg-pink-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 bg-amber-500/15 blur-[140px]" />
      </div>
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
      <Helmet>
        <title>About Us - South Lanka Fireworks</title>
        <meta
          name="description"
          content="Learn about South Lanka Fireworks, Sri Lanka’s trusted fireworks experts with over a decade of experience creating unforgettable wedding, festival, and corporate firework displays."
        />
        <meta
          name="keywords"
          content="About South Lanka Fireworks, Sri Lanka Fireworks Company, Wedding Fireworks Sri Lanka, Festival Fireworks Sri Lanka, Corporate Fireworks Events"
        />
        <meta name="author" content="South Lanka Fireworks" />

        {/* Open Graph (for social media sharing) */}
        <meta property="og:title" content="About South Lanka Fireworks" />
        <meta
          property="og:description"
          content="Discover the story of South Lanka Fireworks and how we bring magic to weddings, festivals, and corporate events in Sri Lanka."
        />
        <meta property="og:image" content="/assets/SouthLankaFireworks.webp" />
        <meta property="og:url" content="https://slfireworks.com/about" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="space-y-6 lg:col-span-3">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.4em] text-pink-500"
        >
          Story of South Lanka Fireworks
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl font-semibold text-white"
        >
          We craft moments that linger long after the finale
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-300 leading-relaxed"
        >
          For more than a decade, our licensed pyrotechnicians have orchestrated
          tailored spectacles across Sri Lanka—from coastal weddings and
          religious festivals to national countdowns. Every show blends
          choreography, safety, and storytelling, ensuring the sky mirrors your
          celebration.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base text-gray-400"
        >
          We partner with you on creative direction, safety licensing, and
          logistics so your guests experience wonder without compromise.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 text-3xl text-gray-400"
        >
          <a
            href="https://www.facebook.com/share/1CEsjdTcV4/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-500 duration-300 hover:-translate-y-1"
          >
            <AiFillFacebook />
          </a>
          <a
            href="https://www.tiktok.com/@southlankafireworks?_t=ZS-8ysCsrhOBOx&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="hover:text-pink-400 duration-300 hover:-translate-y-1"
          >
            <SiTiktok />
          </a>
          <a
            href="https://www.instagram.com/southlankafireworks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-500 duration-300 hover:-translate-y-1"
          >
            <AiFillInstagram />
          </a>
        </motion.div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur"
        >
          <h3 className="text-2xl font-semibold text-white mb-3">
            Why partners choose us?
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Dedicated safety officers, ISO-grade inventory, on-site
            choreography, and end-to-end coordination mean your show runs to the
            minute—rain or shine.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {highlights.map((item) => (
            <div
              key={item.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center shadow-lg backdrop-blur"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-pink-500 mb-2">
                {item.label}
              </p>
              <p className="text-2xl font-bold text-white">{item.value}</p>
              <p className="text-xs text-gray-400 mt-1">{item.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default About;
