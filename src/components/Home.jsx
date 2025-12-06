import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Helmet } from "react-helmet-async";
import BackgroundVideo from "/assets/fireworks-video.mp4";

const Home = () => {

  

  return (
    <div id="home" className="relative min-h-screen w-full overflow-hidden">
      <Helmet>
        <title>South Lanka Fireworks - Home</title>
        <meta
          name="description"
          content="South Lanka Fireworks delivers unforgettable fireworks shows for weddings, festivals, and corporate events across Sri Lanka."
        />
        <meta
          name="keywords"
          content="Fireworks, Pyrotechnics, Firework Shows, Event Fireworks, Wedding Fireworks, Festival Fireworks, Corporate Event Fireworks, Sri Lanka Fireworks"
        />
        <meta property="og:image" content="/assets/SouthLankaFireworks.webp" />
        <link rel="icon" href="/assets/SouthLankaFireworks.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={BackgroundVideo}
      >
        Your browser does not support the video tag.
      </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 z-10"></div>


      {/* Hero content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center min-h-screen px-4 font-poppins">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 font-Kaushan"
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
            className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 text-transparent bg-clip-text drop-shadow-[0_0_12px_rgba(255,169,64,0.45)]"
          />
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-xl font-Kaushan bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 animate-gradient"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          We Bring the Night Sky to Life
        </motion.h1>

        <motion.p
          className="text-gray-200 max-w-2xl text-lg sm:text-xl mb-8 font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          South Lanka Fireworks delivers unforgettable fireworks shows for
          weddings, festivals, and corporate events across Sri Lanka.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex gap-4 flex-wrap justify-center mt-6">
            <a
              href="#services"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/25 px-8 py-3 text-sm sm:text-base font-semibold tracking-wide text-white shadow-[0_10px_35px_rgba(255,179,71,0.35)] transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 opacity-90 group-hover:opacity-100" />
              <span className="relative flex items-center gap-2 text-white">
                <span className="text-lg">🚀</span>
                Get Started
              </span>
            </a>

            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 px-8 py-3 text-sm sm:text-base font-semibold tracking-wide text-white shadow-[0_10px_35px_rgba(108,127,255,0.3)] transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 opacity-90 group-hover:opacity-100" />
              <span className="relative flex items-center gap-2 text-white">
                <span className="text-lg ">📞</span>
                Contact Us
              </span>
            </a>
          </div>
        </motion.div>

        
      </div>
    </div>
  );
};

export default Home;
