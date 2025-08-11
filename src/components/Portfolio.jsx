import React, { useState } from "react";
import { motion } from "framer-motion";

const portfolioItems = [
  {
    id: 1,
    title: "Port City Colombo 31st Night Fireworks Show",
    description:
      "A grand fireworks spectacle at Port City to welcome the New Year. Thousands gathered to witness a synchronized pyrotechnic show lighting up the skyline.",
    image: "/assets/PortCity.jpg", // Replace with your actual image path
    video: "/assets/PortCityVideo.mp4", // Replace with your actual video path
    client: "Port City Colombo",
    date: "31st December 2024",
  },
  {
    id: 2,
    title: "St. Aloysius College Galle First Flag Fireworks Show",
    description:
      "A breathtaking fireworks display held at St. Aloysius College Galle to mark the historic first flag-raising ceremony. A memorable evening filled with color and celebration.",
    image: "/assets/StAloysius.jpg", // Update this path to your correct image
    video: "/assets/StAloysiusVideo.mp4", // Update this path to your correct video
    client: "St. Aloysius College Galle",
    date: "14th July 2025", // You can update this to the actual event date
  },
  {
    id: 3,
    title: "Holy Cross College Kalutara First Flag Fireworks Show",
    description:
      "A vibrant fireworks display organized to commemorate the first flag-raising ceremony at Holy Cross College Kalutara. The night sky lit up in celebration, leaving a lasting impression on the attendees.",
    image: "/assets/HolyCross.jpg", // Update to your actual image path
    video: "/assets/HolyCrossVideo.mp4", // Update to your actual video path
    client: "Holy Cross College Kalutara",
    date: "22nd July 2025", // Replace with the actual date if needed
  },
];

const Portfolio = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="py-16 px-4 text-white" id="portfolio">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-yellow-400">Featured Work</h2>
        <p className="text-gray-300 mt-2">
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
              <h3 className="text-xl font-semibold text-yellow-300">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm mt-2">{item.description}</p>
              <div className="text-gray-400 text-xs mt-4">
                <p>
                  <strong>Client:</strong> {item.client}
                </p>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
