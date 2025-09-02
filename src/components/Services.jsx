import React from "react";
import { motion } from "framer-motion";
import { FaFire, FaStar, FaRocket, FaGlobe } from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaFire className="text-yellow-100" size={40} />,
    title: "Custom Fireworks Displays",
    description:
      "Tailored fireworks shows designed to fit any event, theme, or budget with spectacular effects.",
    link: "/services/custom-displays",
    bgColor: "bg-yellow-300",
    hoverColor: "hover:shadow-yellow-500/70",
  },
  {
    id: 2,
    icon: <FaStar className="text-pink-100" size={40} />,
    title: "Event Special Effects",
    description:
      "Enhance weddings, festivals, and corporate events with synchronized special effects.",
    link: "/services/special-effects",
    bgColor: "bg-pink-300",
    hoverColor: "hover:shadow-pink-500/70",
  },
  {
    id: 3,
    icon: <FaRocket className="text-blue-100" size={40} />,
    title: "Safety Consulting & Licensing",
    description:
      "Professional advice and licensing support ensuring your event meets all safety standards.",
    link: "/services/safety-consulting",
    bgColor: "bg-blue-300",
    hoverColor: "hover:shadow-blue-500/70",
  },
  {
    id: 4,
    icon: <FaGlobe className="text-indigo-100" size={40} />,
    title: "Nationwide Delivery & Setup",
    description:
      "Comprehensive logistics service delivering and setting up fireworks anywhere in Sri Lanka.",
    link: "/services/delivery-setup",
    bgColor: "bg-indigo-300",
    hoverColor: "hover:shadow-indigo-500/70",
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
    <section id="services" className="text-black py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-black mb-4">Our Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the wide range of fireworks and pyrotechnic services we
          offer to light up your special occasions.
        </p>
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
            className={`${service.bgColor} rounded-xl p-6 
              shadow-lg transition duration-300 cursor-pointer ${service.hoverColor}`}
            onClick={() => (window.location.href = service.link)}
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-sm opacity-90">{service.description}</p>
            {/* <span className="mt-4 text-white inline-block underline underline-offset-2">
              Learn More &rarr;
            </span> */}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
