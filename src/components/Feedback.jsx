"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";
import AnimatedCounter from "./AnimatedCounter";
import GlowCard from "./GlowCard";

const defaultTestimonials = [
  {
    name: "Dilani & Nuwan",
    event: "Wedding Showcase",
    quote:
      "Every burst matched the music perfectly. Our guests still talk about the finale!",
    rating: 5,
  },
  {
    name: "Colombo Port City",
    event: "New Year Countdown",
    quote:
      "Flawless logistics for a massive crowd. Safety briefing and timing were on point.",
    rating: 5,
  },
  {
    name: "St. Aloysius College",
    event: "Flag Ceremony",
    quote:
      "A respectful, vibrant display that elevated our celebration to a national highlight.",
    rating: 4,
  },
];

const statHighlights = [
  { label: "Average Rating", value: 4.9, suffix: "/5", decimals: 1, helper: "Across weddings, launches, and festivals", color: "text-amber-300", glowColor: "rgba(251, 191, 36, 0.18)" },
  { label: "Happy Clients", value: 250, suffix: "+", decimals: 0, helper: "Trusted for milestone events", color: "text-rose-300", glowColor: "rgba(244, 63, 94, 0.18)" },
  { label: "Repeat Clients", value: 85, suffix: "%", decimals: 0, helper: "Customers who book again", color: "text-violet-300", glowColor: "rgba(139, 92, 246, 0.18)" },
];

const Feedback = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: "5",
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    let unsubscribe = () => {};
    let cancelled = false;
    (async () => {
      try {
        const { collection, query, orderBy, onSnapshot } = await import("firebase/firestore");
        const { getDb } = await import("@/lib/firebase");
        const db = await getDb();
        if (cancelled) return;
        const feedbackRef = collection(db, "feedbackEntries");
        const q = query(feedbackRef, orderBy("createdAt", "desc"));
        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const docs = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                name: data.name,
                event: data.event || "Client Feedback",
                quote: data.quote,
                rating: data.rating || 5,
              };
            });
            setEntries(docs);
          },
          () => {
            setFeedbackError("Unable to load live feedback right now.");
          }
        );
      } catch {
        setFeedbackError("Unable to load live feedback right now.");
      }
    })();

    return () => { cancelled = true; unsubscribe(); };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitting(true);
    setFeedbackError("");
    try {
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const { getDb } = await import("@/lib/firebase");
      const db = await getDb();
      await addDoc(collection(db, "feedbackEntries"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        quote: formData.message.trim(),
        rating: Number(formData.rating),
        event: "Client Submission",
        createdAt: serverTimestamp(),
      });
      setFormData({ name: "", email: "", message: "", rating: "5" });
    } catch {
      setFeedbackError("We couldn't save that feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const combinedTestimonials = useMemo(
    () => [...entries, ...defaultTestimonials],
    [entries]
  );

  // Auto-rotate testimonials carousel
  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % Math.max(1, combinedTestimonials.length));
  }, [combinedTestimonials.length]);

  useEffect(() => {
    autoPlayRef.current = setInterval(nextTestimonial, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, [nextTestimonial]);

  const goToTestimonial = (index) => {
    setActiveTestimonial(index);
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(nextTestimonial, 5000);
  };

  return (
    <section
      id="feedback"
      className="relative px-4 py-20 text-gray-100 md:px-10"
      aria-label="Client testimonials and feedback"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-8 top-10 h-48 w-48 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <AnimatedSection variant="fadeUp" className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200">
            Customer Voices
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What Sri Lanka Says About Us
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-stone-300 md:text-base">
            Real feedback from couples, corporate teams, and festival committees who trusted South Lanka Fireworks with their milestones.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {statHighlights.map((stat, i) => (
            <GlowCard
              key={stat.label}
              glowColor="rgba(251, 146, 60, 0.18)"
              delay={i * 0.1}
              className="rounded-[1.75rem] border border-white/10 bg-[#17100d]/82 p-5 text-center shadow-lg backdrop-blur-sm"
            >
              <p className={`text-sm uppercase tracking-[0.35em] ${stat.color}`}>
                {stat.label}
              </p>
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                duration={2}
                className="text-3xl font-bold text-white mt-2 block"
              />
              <p className="mt-2 text-xs text-stone-400">{stat.helper}</p>
            </GlowCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] border border-white/10 bg-[#17100d]/86 p-6 shadow-2xl backdrop-blur-sm"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Share Your Experience
            </h3>
            <p className="mb-6 text-sm text-stone-300">
              We read every message. Your note helps event planners see what it is like to work with us.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="feedback-name" className="text-xs uppercase tracking-[0.3em] text-amber-200">
                  Name
                </label>
                <input
                  id="feedback-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-gray-100 placeholder:text-gray-500 shadow-inner transition-all duration-300 focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="feedback-email" className="text-xs uppercase tracking-[0.3em] text-amber-200">
                  Email
                </label>
                <input
                  id="feedback-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-gray-100 placeholder:text-gray-500 shadow-inner transition-all duration-300 focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  placeholder="you@email.com"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                <div>
                  <label htmlFor="feedback-message" className="sr-only">Your feedback message</label>
                  <textarea
                    id="feedback-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-gray-100 placeholder:text-gray-500 shadow-inner transition-all duration-300 focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    placeholder="Tell us what stood out."
                  />
                </div>
                <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-amber-200">
                    Rating
                  </label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, rating: String(star) }))}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform duration-200 hover:scale-125 focus:outline-none"
                        aria-label={`Rate ${star} stars`}
                      >
                        <FaStar
                          size={24}
                          className={`transition-colors duration-200 ${
                            star <= (hoverRating || Number(formData.rating))
                              ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-violet-500 py-3 text-center font-semibold text-white shadow-lg shadow-rose-500/25 transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 shimmer-effect" />
                <span className="relative">{submitting ? "Sending…" : "Submit Feedback"}</span>
              </motion.button>
              {feedbackError && (
                <p className="text-sm text-red-300 text-center">{feedbackError}</p>
              )}
            </form>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {combinedTestimonials.length > 0 && (
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#17100d]/86 p-6 shadow-xl backdrop-blur-sm"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-bl from-rose-400/10 via-violet-400/8 to-transparent" aria-hidden="true" />
                  <FaQuoteLeft className="mb-4 text-3xl text-amber-200 opacity-60" />
                  <p className="text-lg italic leading-relaxed text-stone-200">
                    "{combinedTestimonials[activeTestimonial]?.quote}"
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white text-lg">
                        {combinedTestimonials[activeTestimonial]?.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
                        {combinedTestimonials[activeTestimonial]?.event}
                      </p>
                    </div>
                    <div className="flex gap-1 text-yellow-300">
                      {Array.from({ length: combinedTestimonials[activeTestimonial]?.rating || 5 }).map((_, starIndex) => (
                        <FaStar key={starIndex} className="drop-shadow-[0_0_4px_rgba(250,204,21,0.4)]" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Carousel dots */}
            {combinedTestimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {combinedTestimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToTestimonial(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeTestimonial
                        ? "h-2.5 w-8 bg-gradient-to-r from-amber-400 to-orange-500"
                        : "h-2.5 w-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                    style={{ minWidth: 18, minHeight: 18 }}
                  />
                ))}
              </div>
            )}

            {/* Mini testimonial grid preview */}
            <div className="grid grid-cols-1 gap-3 mt-4 max-h-[300px] overflow-y-auto no-scrollbar">
              {combinedTestimonials.slice(0, 4).map((testimonial, index) => (
                <motion.button
                  key={`mini-${testimonial.name}-${index}`}
                  onClick={() => goToTestimonial(index)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={`text-left rounded-xl border p-3 transition-all duration-300 ${
                    index === activeTestimonial
                      ? "border-amber-200/30 bg-amber-300/10"
                      : "border-white/10 bg-[#17100d]/70 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                    <div className="flex gap-0.5 text-yellow-300">
                      {Array.from({ length: testimonial.rating }).map((_, si) => (
                        <FaStar key={si} size={10} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-stone-400">{testimonial.quote}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Feedback);

