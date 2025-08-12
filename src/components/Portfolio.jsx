import React, { useState } from "react";
import { motion } from "framer-motion";

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
    fullVideoUrl: "https://www.facebook.com/share/v/1FMqmjvR4H/?mibextid=wwXIfr",
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

const Portfolio = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="py-16 px-4 text-white" id="portfolio">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-black">Featured Work</h2>
        <p className="text-gray-500 mt-2">
          Showcasing our premium fireworks displays for prestigious events
          across Sri Lanka.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-500/50 transition-shadow"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="h-64 w-full">
              {hoveredId === item.id ? (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-5 text-left ">
              <h3 className="text-xl font-semibold text-black">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{item.description}</p>
              <div className="text-gray-500 text-xs mt-4">
                <p>
                  <strong>Client:</strong> {item.client}
                </p>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
              </div>
              <a
                href={item.fullVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Watch Full Video
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
