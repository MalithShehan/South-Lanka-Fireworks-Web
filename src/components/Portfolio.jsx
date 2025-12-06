import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaExternalLinkAlt } from "react-icons/fa";

const portfolioItems = [
  {
    id: 1,
    title: "Port City Colombo 31st Night Fireworks Show",
    description:
      "A grand fireworks spectacle at Port City to welcome the New Year. Thousands gathered to witness a synchronized pyrotechnic show lighting up the skyline.",
    image: "/assets/PortCity.jpg",
    video: "/assets/PortCityVideo.mp4",
    client: "Port City Colombo",
    date: "31st December 2024",
    fullVideoUrl: "https://vt.tiktok.com/ZSS7SjwEe/",
  },
  {
    id: 2,
    title: "St. Aloysius College Galle First Flag Fireworks Show",
    description:
      "A breathtaking fireworks display held at St. Aloysius College Galle to mark the historic first flag-raising ceremony. A memorable evening filled with color and celebration.",
    image: "/assets/StAloysius.jpg",
    video: "/assets/StAloysiusVideo.mp4",
    client: "St. Aloysius College Galle",
    date: "02th May 2025",
    fullVideoUrl:
      "https://www.facebook.com/share/v/1FMqmjvR4H/?mibextid=wwXIfr",
  },
  {
    id: 3,
    title: "Mahinda College Galle First Flag Fireworks Show",
    description:
      "A vibrant fireworks display organized to commemorate the first flag-raising ceremony at Mahinda College Galle. The night sky lit up in celebration, leaving a lasting impression on the attendees.",
    image: "/assets/MahindaCollege.jpg",
    video: "/assets/MahindaCollegeVideo.mp4",
    client: "Mahinda College Galle",
    date: "17th Mar 2025",
    fullVideoUrl: "https://vt.tiktok.com/ZSS7S3B3H/",
  },
];

const highlightStats = [
  {
    label: "Shows Delivered",
    value: "1000+",
    helper: "Across Sri Lanka",
  },
  {
    label: "Peak Audience",
    value: "10K+",
    helper: "Per flagship event",
  },
  {
    label: "Safety Record",
    value: "100%",
    helper: "Certified crew",
  },
];

const Portfolio = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      className="py-20 px-4 md:px-10 bg-gradient-to-b    to-gray-50 text-gray-900"
      id="portfolio"
    >
      <div className="max-w-6xl mx-auto text-center mb-16">
        <p className="uppercase tracking-[0.3em] text-pink-500 text-xs mb-4">
          Signature Displays
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Featured Firework Experiences
        </h2>
        <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
          From waterfront countdowns to proud heritage celebrations, every
          production blends choreography, safety, and storytelling to frame
          unforgettable finales.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
        {highlightStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/60 border border-white/70 rounded-2xl px-4 py-3 shadow-lg backdrop-blur-md text-center sm:text-left"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.helper}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="group bg-white/55 border border-white/70 rounded-3xl overflow-hidden shadow-xl hover:shadow-pink-200 transition-all backdrop-blur-lg"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative h-64 w-full overflow-hidden">
              {hoveredId === item.id ? (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-xs uppercase tracking-[0.3em]">
                <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">
                  <FaPlay size={12} />
                </div>
                <span>Live Preview</span>
              </div>
            </div>

            <div className="p-6 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-center sm:text-left">
                <span className="text-[11px] uppercase tracking-[0.4em] text-pink-500">
                  {item.client}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-center sm:self-auto">
                  {item.date}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-5 flex flex-wrap justify-center sm:justify-start gap-3">
                <a
                  href={item.fullVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-pink-500 text-white hover:bg-pink-600 transition"
                >
                  <FaPlay size={14} /> Watch Full Video
                </a>
                <button
                  type="button"
                  onClick={() => setHoveredId(item.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border border-gray-200 text-gray-600 hover:text-gray-900"
                >
                  <FaExternalLinkAlt size={12} /> Replay Preview
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
