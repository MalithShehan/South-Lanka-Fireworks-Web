import React from "react";
import { motion } from "framer-motion";
import { FaFire, FaStar, FaRocket, FaGlobe } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, type: "spring", stiffness: 50 },
  }),
};

const Services = () => {
  return (
    <section
      id="services"
      className="relative text-gray-100 py-24 px-6 md:px-12 overflow-hidden"
      aria-label="Our fireworks services"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 right-12 h-44 w-44 bg-pink-500/15 blur-3xl" />
        <div className="absolute -bottom-10 left-16 h-56 w-56 bg-amber-500/15 blur-[120px]" />
      </div>
      <div className="relative">
      <Helmet>
        <title>South Lanka Fireworks - Services</title>
        <meta
          name="description"
          content="Discover our fireworks services: custom displays, special effects, safety consulting, and nationwide delivery & setup."
        />
        <meta
          name="keywords"
          content="fireworks, pyrotechnics, Sri Lanka, events, displays"
        />
      </Helmet>
      <div className="max-w-5xl mx-auto text-center mb-12">
        <p className="text-xs uppercase tracking-[0.4em] text-pink-500 mb-3">
          Expertise & Craft
        </p>
        <h2 className="text-4xl font-bold text-white mb-3">Our Services</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover the wide range of fireworks and pyrotechnic services we offer
          to light up your special occasions.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-16 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
        <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur">
          ISO-Certified Team
        </span>
        <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur">
          24/7 Support
        </span>
        <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur">
          Nationwide Reach
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="relative group"
          >
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition duration-300 blur-xl`}
            />
            <div className="relative h-full bg-white/5 border border-white/10 rounded-3xl p-7 shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm ${service.iconBg}`}>
                  <service.Icon size={26} className={service.iconColor} />
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  #{String(service.id).padStart(2, "0")}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-300 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                {service.tag}
              </span>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Services;
