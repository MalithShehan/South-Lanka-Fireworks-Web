import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si"; 
import AnimatedCounter from "./AnimatedCounter";
import AnimatedSection from "./AnimatedSection";
import GlowCard from "./GlowCard";

const About = () => {
  const highlights = [
    { label: "Shows Delivered", value: 1000, suffix: "+", detail: "Island-wide", glowColor: "rgba(236, 72, 153, 0.3)" },
    { label: "Years Experience", value: 20, suffix: "+", detail: "Since 2005", glowColor: "rgba(251, 146, 60, 0.3)" },
    { label: "Safety Record", value: 100, suffix: "%", detail: "Certified crew", glowColor: "rgba(59, 130, 246, 0.3)" },
    { label: "Repeat Clients", value: 85, suffix: "%", detail: "Trusted partner", glowColor: "rgba(139, 92, 246, 0.3)" },
  ];

  return (
    <section
      id="about"
      className="relative py-20 px-4 md:px-10 text-gray-100 overflow-hidden"
      aria-label="About South Lanka Fireworks"
    >
      
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
      <div className="space-y-6 lg:col-span-3">
        <AnimatedSection variant="fadeUp" delay={0}>
          <p className="text-xs uppercase tracking-[0.4em] text-pink-500">
            Story of South Lanka Fireworks
          </p>
        </AnimatedSection>
        <AnimatedSection variant="fadeUp" delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
            We craft moments that linger
            <span className="block mt-1 bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              long after the finale
            </span>
          </h2>
        </AnimatedSection>
        <AnimatedSection variant="fadeUp" delay={0.2}>
          <p className="text-lg text-gray-300 leading-relaxed">
            For more than a decade, our licensed pyrotechnicians have orchestrated
            tailored spectacles across Sri Lanka—from coastal weddings and
            religious festivals to national countdowns. Every show blends
            choreography, safety, and storytelling, ensuring the sky mirrors your
            celebration.
          </p>
        </AnimatedSection>
        <AnimatedSection variant="fadeUp" delay={0.3}>
          <p className="text-base text-gray-400">
            We partner with you on creative direction, safety licensing, and
            logistics so your guests experience wonder without compromise.
          </p>
        </AnimatedSection>
        <AnimatedSection variant="fadeUp" delay={0.4}>
          <div className="flex flex-wrap gap-4 text-3xl text-gray-400">
            <a
              href="https://www.facebook.com/share/1CEsjdTcV4/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-500 duration-300 hover:-translate-y-2 hover:scale-110 transition-all"
            >
              <AiFillFacebook />
            </a>
            <a
              href="https://www.tiktok.com/@southlankafireworks?_t=ZS-8ysCsrhOBOx&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-pink-400 duration-300 hover:-translate-y-2 hover:scale-110 transition-all"
            >
              <SiTiktok />
            </a>
            <a
              href="https://www.instagram.com/southlankafireworks"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500 duration-300 hover:-translate-y-2 hover:scale-110 transition-all"
            >
              <AiFillInstagram />
            </a>
          </div>
        </AnimatedSection>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <GlowCard
          glowColor="rgba(236, 72, 153, 0.25)"
          delay={0.2}
          className="bg-[#0c0a1a]/90 border border-white/10 rounded-3xl p-6 shadow-xl"
        >
          <h3 className="text-2xl font-semibold text-white mb-3">
            Why partners choose us?
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Dedicated safety officers, ISO-grade inventory, on-site
            choreography, and end-to-end coordination mean your show runs to the
            minute—rain or shine.
          </p>
        </GlowCard>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {highlights.map((item, index) => (
            <GlowCard
              key={item.label}
              glowColor={item.glowColor}
              delay={0.3 + index * 0.1}
              className="bg-[#0c0a1a]/90 border border-white/10 rounded-2xl p-4 text-center shadow-lg"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-pink-500 mb-2">
                {item.label}
              </p>
              <AnimatedCounter
                end={item.value}
                suffix={item.suffix}
                duration={2.5}
                className="text-2xl font-bold text-white"
              />
              <p className="text-xs text-gray-400 mt-1">{item.detail}</p>
            </GlowCard>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default memo(About);
