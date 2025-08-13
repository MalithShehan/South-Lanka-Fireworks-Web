import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from "react-icons/ai";

const Home = () => {
  return (
    <div id="home" className="relative h-screen w-full overflow-hidden">
      {/* 🔥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/assets/fireworks-video.mp4"
      >
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Overlay for darkening video so text is readable */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* 🔹 Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-5xl mx-auto h-full px-4">
        
        {/* Type Animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <TypeAnimation
            sequence={[
              "Spectacular Firework Shows",
              1500,
              "Professional Pyrotechnics",
              1500,
              "Lighting Up Your Events",
              1500,
            ]}
            speed={50}
            repeat={Infinity}
            className="font-semibold font-caveat text-gray-300 text-base sm:text-lg md:text-xl lg:text-5xl italic mb-4"
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
          We Bring the Night Sky to Life
        </motion.h1>

        {/* Description */}
        <motion.p className="text-gray-300 text-base sm:text-lg md:text-xl mb-4 max-w-3xl">
          South Lanka Fireworks delivers unforgettable fireworks shows for
          weddings, festivals, and corporate events across Sri Lanka.
        </motion.p>

        {/* Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-4 mb-2">
          <a
            href="#services"
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Get Started
          </a>
          <a
            href="#contact"
            className="border border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

