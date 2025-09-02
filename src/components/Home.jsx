import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  return (
    <div id="home" className="relative min-h-screen w-full overflow-hidden">
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

      {/* ✨ Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/30 z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_70%)] z-10"></div>

      {/* 🎇 Floating Particles */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-yellow-400 to-red-400 opacity-80 blur-sm"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, Math.random() * -150],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 5 + 3,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* 🔹 Hero Content */}
      <div className="relative z-20 flex flex-col items-center font-kaushan justify-center text-center max-w-6xl mx-auto min-h-screen px-4 sm:px-6 lg:px-12">
        {/* ✨ Type Animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-4 sm:mb-6"
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
            className=" text-black/80 text-lg sm:text-2xl md:text-3xl lg:text-4xl"
            style={{
              textShadow:
                "0 0 12px rgba(255, 215, 0, 0.9), 0 0 28px rgba(255, 50, 50, 0.7)",
            }}
          />
        </motion.div>

        {/* 🌟 Main Heading */}
        <motion.h1
          className="font-kaushan text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            textShadow: `
              0 2px 14px rgba(0,0,0,0.8),
              0 0 30px rgba(255,215,0,0.9),   /* yellow glow */
              0 0 45px rgba(255,0,0,0.7),     /* red glow */
              0 0 60px rgba(0,150,255,0.8)    /* blue glow */
            `,
          }}
        >
          We Bring the{" "}
          <span className="bg-clip-text text-yellow-500 bg-gradient-to-r bg-yellow-300 animate-gradient">
            Night Sky
          </span>{" "}
          to Life
        </motion.h1>

        {/* 💬 Description */}
        <motion.p
          className="text-gray-100  text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl font-light leading-relaxed font-poppins"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          South Lanka Fireworks delivers unforgettable fireworks shows for
          weddings, festivals, and corporate events across Sri Lanka.
        </motion.p>

        {/* 🔘 Buttons */}
        {/* 🔘 Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 w-full sm:w-auto font-poppins"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.a
            href="#services"
            className="relative px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg 
      text-white backdrop-blur-lg bg-white/10 border border-white/20 
      shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300 
      overflow-hidden group text-center"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-white">Get Started</span>
            <div
              className="absolute inset-0 bg-gradient-to-br from-yellow-400 
      opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
            ></div>
          </motion.a>

          <motion.a
            href="#contact"
            className="relative px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg 
      text-white backdrop-blur-lg bg-white/10 border border-white/20 
      shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300 
      overflow-hidden group text-center"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-white">Contact Us</span>
            <div
              className="absolute inset-0 bg-gradient-to-bl from-blue-400 
      opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
            ></div>
          </motion.a>
        </motion.div>
      </div>

      {/* 🎨 Fonts + Custom Animations */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;700;800&family=Poppins:wght@300;400;500;600&family=Dancing+Script:wght@600;700&display=swap");

        .font-playfair {
          font-family: "Playfair Display", serif;
        }
        .font-poppins {
          font-family: "Poppins", sans-serif;
        }
        .font-dancing {
          font-family: "Dancing Script", cursive;
        }
        .font-great {
          font-family: "Great Vibes", cursive;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
