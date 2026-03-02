import React, { memo } from "react";
import { motion } from "framer-motion";
import { FaFire, FaStar, FaRocket, FaGlobe } from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";
import GlowCard from "./GlowCard";

const services = [
  {
    id: 1,
    title: "Custom Fireworks Displays",
    description:
      "Tailored fireworks shows designed to fit any event, theme, or budget with spectacular effects.",
    link: "/services/custom-displays",
    tag: "Signature Shows",
    Icon: FaFire,
    gradient: "from-amber-200/70 via-transparent to-rose-100/60",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    id: 2,
    title: "Event Special Effects",
    description:
      "Enhance weddings, festivals, and corporate events with synchronized special effects.",
    link: "/services/special-effects",
    tag: "Atmosphere FX",
    Icon: FaStar,
    gradient: "from-pink-200/70 via-transparent to-amber-100/50",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    id: 3,
    title: "Safety Consulting & Licensing",
    description:
      "Professional advice and licensing support ensuring your event meets all safety standards.",
    link: "/services/safety-consulting",
    tag: "Trusted Guidance",
    Icon: FaRocket,
    gradient: "from-blue-200/70 via-transparent to-cyan-100/50",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: 4,
    title: "Nationwide Delivery & Setup",
    description:
      "Comprehensive logistics service delivering and setting up fireworks anywhere in Sri Lanka.",
    link: "/services/delivery-setup",
    tag: "End-to-End",
    Icon: FaGlobe,
    gradient: "from-indigo-200/70 via-transparent to-slate-100/60",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
];

const glowColors = [
  "rgba(251, 146, 60, 0.3)",
  "rgba(236, 72, 153, 0.3)",
  "rgba(59, 130, 246, 0.3)",
  "rgba(99, 102, 241, 0.3)",
];

const Services = () => {
  return (
    <section
      id="services"
      className="relative text-gray-100 py-16 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden"
      aria-label="Our fireworks services"
    >
      
      <div className="relative">
      <AnimatedSection variant="fadeUp" className="max-w-5xl mx-auto text-center mb-12">
        <p className="text-xs uppercase tracking-[0.4em] text-pink-500 mb-3">
          Expertise & Craft
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Our Services</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover the wide range of fireworks and pyrotechnic services we offer
          to light up your special occasions.
        </p>
      </AnimatedSection>

      <AnimatedSection variant="scaleUp" delay={0.2} className="flex flex-wrap items-center justify-center gap-3 mb-8 md:mb-16 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
        <span className="px-4 py-2 rounded-full border border-white/10 bg-[#0c0a1a]/90 hover:border-pink-500/30 transition-colors duration-300">
          ISO-Certified Team
        </span>
        <span className="px-4 py-2 rounded-full border border-white/10 bg-[#0c0a1a]/90 hover:border-pink-500/30 transition-colors duration-300">
          24/7 Support
        </span>
        <span className="px-4 py-2 rounded-full border border-white/10 bg-[#0c0a1a]/90 hover:border-pink-500/30 transition-colors duration-300">
          Nationwide Reach
        </span>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <GlowCard
            key={service.id}
            glowColor={glowColors[index] || glowColors[0]}
            delay={index * 0.15}
            className="relative group"
          >
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition duration-500 blur-xl`}
            />
            <div className="relative h-full bg-[#0c0a1a]/90 border border-white/10 rounded-3xl p-7 shadow-lg transition duration-300 group-hover:shadow-2xl">
              <div className="mb-5 flex items-center justify-between">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm ${service.iconBg}`}
                >
                  <service.Icon size={26} className={service.iconColor} />
                </motion.div>
                <span className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  #{String(service.id).padStart(2, "0")}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-300 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-pulse" />
                {service.tag}
              </span>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-pink-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn more</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>

      {/* CTA Section */}
      <AnimatedSection variant="fadeUp" delay={0.4} className="max-w-3xl mx-auto mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-500/10 via-amber-500/10 to-blue-500/10 border border-white/10 rounded-3xl p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-white mb-3">
            Ready to light up your next event?
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Contact us for a free consultation and custom quote tailored to your celebration.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 hover:scale-105 hover:shadow-pink-500/40 transition-all"
          >
            Get a Free Quote
          </a>
        </div>
      </AnimatedSection>
      </div>
    </section>
  );
};

export default memo(Services);
