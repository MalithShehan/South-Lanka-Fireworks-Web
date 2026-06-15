"use client";

import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import { asset } from "@/lib/assetPath";

const portfolioItems = [
  {
    id: 1,
    title: "Port City Colombo 31st Night Fireworks Show",
    description:
      "A grand fireworks spectacle at Port City to welcome the New Year. Thousands gathered to witness a synchronized pyrotechnic show lighting up the skyline.",
    image: asset("/assets/PortCity.webp"),
    video: asset("/assets/PortCityVideo2025.mp4"),
    client: "Port City Colombo",
    date: "31st December 2025",
    fullVideoUrl: "https://www.tiktok.com/@southlankafireworks/video/7590400823612509448?is_from_webapp=1&sender_device=pc&web_id=7597102042049644050",
  },
  {
    id: 2,
    title: "St. Aloysius College Galle First Flag Fireworks Show",
    description:
      "A breathtaking fireworks display held at St. Aloysius College Galle to mark the historic first flag-raising ceremony. A memorable evening filled with color and celebration.",
    image: asset("/assets/StAloysius.webp"),
    video: asset("/assets/StAloysiusVideo.mp4"),
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
    image: asset("/assets/MahindaCollege.webp"),
    video: asset("/assets/MahindaCollegeVideo.mp4"),
    client: "Mahinda College Galle",
    date: "17th Mar 2025",
    fullVideoUrl: "https://vt.tiktok.com/ZSS7S3B3H/",
  },
  {
    id: 4,
    title: "The Food Harbour Grand Opening Fireworks Show",
    description:
      "A spectacular fireworks display to celebrate the grand opening of The Food Harbour. The event featured a dazzling array of pyrotechnics that captivated the audience and marked the beginning of a new culinary destination.",
    image: asset("/assets/FoodHarbour.webp"),
    video: asset("/assets/FoodHarbourVideo.mp4"),
    client: "The Food Harbour",
    date: "17th Jan 2026",
    fullVideoUrl: "https://www.tiktok.com/@southlankafireworks/video/7596250070283013396?is_from_webapp=1&sender_device=pc&web_id=7597102042049644050",
  }
];

const highlightStats = [
  {
    label: "Shows Delivered",
    value: "1000+",
    helper: "Across Sri Lanka",
    color: "text-orange-300",
    border: "border-orange-400/15",
  },
  {
    label: "Peak Audience",
    value: "10K+",
    helper: "Per flagship event",
    color: "text-cyan-300",
    border: "border-cyan-400/15",
  },
  {
    label: "Safety Record",
    value: "100%",
    helper: "Certified crew",
    color: "text-emerald-300",
    border: "border-emerald-400/15",
  },
];

const INITIAL_VISIBLE_ITEMS = 3;

const Portfolio = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(hover: none)").matches);
    }
  }, []);

  const displayedItems = isExpanded
    ? portfolioItems
    : portfolioItems.slice(0, INITIAL_VISIBLE_ITEMS);
  const hasHiddenItems = portfolioItems.length > INITIAL_VISIBLE_ITEMS;

  return (
    <section
      className="py-16 sm:py-20 px-4 md:px-10 text-gray-100"
      id="portfolio"
      aria-label="Portfolio of featured firework shows"
    >
      <div className="max-w-6xl mx-auto text-center mb-16">
        <p className="uppercase tracking-[0.3em] text-amber-200 text-xs mb-4">
          Signature Displays
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Featured Firework Experiences
        </h2>
        <p className="text-gray-400 mt-3 max-w-3xl mx-auto">
          From waterfront countdowns to proud heritage celebrations, every
          production blends choreography, safety, and storytelling to frame
          unforgettable finales.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-14">
        {highlightStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl border ${stat.border} bg-[#0d0818]/88 px-4 py-3 text-center shadow-lg shadow-black/20 sm:text-left`}
          >
            <p className={`text-sm ${stat.color}`}>{stat.label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{stat.value}</p>
            <p className="mt-1 text-xs text-stone-500">{stat.helper}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 max-w-7xl mx-auto">
        {displayedItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="group overflow-hidden rounded-3xl border border-amber-200/10 bg-[#17100d]/88 shadow-xl shadow-black/20 transition-all hover:border-amber-200/20 hover:shadow-[0_24px_60px_rgba(249,115,22,0.16)]"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative h-64 w-full overflow-hidden">
              {hoveredId === item.id && !isTouchDevice ? (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={256}
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
                <span className="text-[11px] uppercase tracking-[0.4em] text-amber-200">
                  {item.client}
                </span>
                <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full self-center sm:self-auto">
                  {item.date}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white mt-3">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-5 flex flex-wrap justify-center sm:justify-start gap-3">
                <a
                  href={item.fullVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-semibold text-[#1a110d] shadow-lg shadow-orange-500/20 transition hover:from-amber-300 hover:to-orange-400"
                >
                  <FaPlay size={14} /> Watch Full Video
                </a>
                <button
                  type="button"
                  onClick={() => setHoveredId(item.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-200/15 px-4 py-2 text-sm font-semibold text-stone-300 transition hover:border-amber-200/25 hover:bg-white/5 hover:text-white"
                >
                  <FaExternalLinkAlt size={12} /> Replay Preview
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {hasHiddenItems && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-3 rounded-full border border-amber-200/20 px-6 py-3 font-semibold text-amber-100 transition hover:bg-amber-300/10"
          >
            {isExpanded ? "Show Fewer Shows" : "See More Shows"}
            <FaExternalLinkAlt size={13} />
          </button>
        </div>
      )}
    </section>
  );
};

export default memo(Portfolio);

