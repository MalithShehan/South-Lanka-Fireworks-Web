import React from "react";
import { motion } from "framer-motion";
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";

const About = () => {
  return (
    <section className="min-h-[75vh] text-white px-4 py-8 flex justify-center items-center">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6"
        >
          About Us
        </motion.h2>

        {/* First Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-black text-lg leading-relaxed mb-4"
        >
          South Lanka Fireworks has been igniting joy and wonder across Sri Lanka for over a decade.
          We specialize in delivering high-impact, customized fireworks displays that elevate any
          event—be it a wedding, religious celebration, corporate gathering, or national festival.
        </motion.p>

        {/* Second Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-700 text-base sm:text-lg mb-8"
        >
          With a team of licensed pyrotechnicians and a passion for perfection, we combine artistry
          with safety to make your moments unforgettable. Choose from a variety of packages and
          effects to match your vision and budget.
        </motion.p>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-8 text-gray-500 text-4xl"
        >
          <a
            href="https://www.facebook.com/SouthLankaFireworks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-indigo-400 transition-colors duration-300"
          >
            <AiFillFacebook />
          </a>
          <a
            href="https://www.instagram.com/SouthLankaFireworks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-500 transition-colors duration-300"
          >
            <AiFillInstagram />
          </a>
          <a
            href="https://twitter.com/SouthLankaFW"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            <AiFillTwitterCircle />
          </a>
          <a
            href="https://www.linkedin.com/company/southlankafireworks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            <AiFillLinkedin />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
