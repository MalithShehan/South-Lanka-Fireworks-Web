import React from "react"; // <- Replace with your fireworks image
import { TypeAnimation } from "react-type-animation";
import { motion } from 'framer-motion'; 
import fireworksImage from "/assets/fireworks-display.jpg"; // <- Replace with your fireworks image
import {
    AiOutlineFacebook,
    AiOutlineInstagram,
    AiOutlineLinkedin,
} from "react-icons/ai";

const Hero = () => {
    return (
        <div className="mt-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Text Section */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center md:text-left"
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
                        className="font-bold text-gray-400 text-lg sm:text-xl md:text-3xl italic mb-4"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-gray-200 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
                    >
                        WELCOME TO <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">
                            South Lanka Fireworks
                        </span>
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1 }}
                        className="text-gray-300 max-w-md mx-auto md:mx-0 text-base sm:text-lg md:text-2xl mb-6"
                    >
                        Crafting unforgettable moments with brilliant pyrotechnic displays
                        for weddings, festivals, corporate events, and more.
                    </motion.p>

                    {/* Contact Us Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        <a
                            href="#contact"
                            className="inline-block bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold py-3 px-6 sm:px-8 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            Contact Us
                        </a>

                        {/* Social Media Icons */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 2 }}
                            className="flex justify-center md:justify-start flex-wrap gap-4 mt-6"
                        >
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:scale-110 transition-transform duration-300"
                            >
                                <AiOutlineFacebook size={40} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-500 hover:scale-110 transition-transform duration-300"
                            >
                                <AiOutlineInstagram size={40} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:scale-110 transition-transform duration-300"
                            >
                                <AiOutlineLinkedin size={40} />
                            </a>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Image Section */}
                <div className="relative flex justify-center items-center">
                    {/* Glow Circle */}
                    <motion.div
                        className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 animate-pulse opacity-70 blur-xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1 }}
                    ></motion.div>

                    {/* Fireworks Image */}
                    <motion.div
                        className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-[350px] md:h-[350px] rounded-full bg-gradient-to-r from-yellow-400 to-red-500 p-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <img
                            src={fireworksImage}
                            alt="Fireworks Display"
                            className="w-full h-full rounded-full object-cover shadow-xl"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
