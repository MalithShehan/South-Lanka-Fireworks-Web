import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

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
  { label: "Average Rating", value: "4.9/5", helper: "Based on 250+ events" },
  { label: "Response Time", value: "< 2 hrs", helper: "Dedicated concierge" },
  { label: "Repeat Clients", value: "85%", helper: "Across Sri Lanka" },
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

  useEffect(() => {
    const feedbackRef = collection(db, "feedbackEntries");
    const q = query(feedbackRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
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

    return () => unsubscribe();
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
      await addDoc(collection(db, "feedbackEntries"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        quote: formData.message.trim(),
        rating: Number(formData.rating),
        event: "Client Submission",
        createdAt: serverTimestamp(),
      });
      setFormData({ name: "", email: "", message: "", rating: "5" });
    } catch (_error) {
      setFeedbackError("We couldn't save that feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const combinedTestimonials = [...entries, ...defaultTestimonials];

  return (
    <section
      id="feedback"
      className="relative py-20 px-4 md:px-10 text-gray-100"
    >
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="uppercase text-xs tracking-[0.35em] text-pink-500">
            Customer Voices
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What Sri Lanka Says About Us
          </h2>
          <p className="text-sm md:text-base text-gray-400 mt-3 max-w-2xl mx-auto">
            Real feedback from couples, corporate teams, and festival committees who trusted South Lanka Fireworks with their milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {statHighlights.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-lg"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-pink-500">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-2">{stat.helper}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Share Your Experience
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              We read every message. Your note helps event planners see what it is like to work with us.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-pink-500">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 text-gray-100 placeholder:text-gray-500 px-4 py-3 shadow-inner focus:ring-2 focus:ring-pink-400 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-pink-500">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 text-gray-100 placeholder:text-gray-500 px-4 py-3 shadow-inner focus:ring-2 focus:ring-pink-400 focus:outline-none"
                  placeholder="you@email.com"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="rounded-xl border border-white/15 bg-white/5 text-gray-100 placeholder:text-gray-500 px-4 py-3 shadow-inner focus:ring-2 focus:ring-pink-400 focus:outline-none"
                  placeholder="Tell us what stood out."
                />
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-pink-500">
                    Rating
                  </label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 text-gray-100 px-3 py-3 shadow-inner focus:ring-2 focus:ring-pink-400 focus:outline-none"
                  >
                    {[5, 4, 3, 2, 1].map((value) => (
                      <option key={value} value={value}>
                        {value} Stars
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 py-3 text-center font-semibold text-white shadow-lg shadow-pink-500/40 hover:scale-[1.01] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Submit Feedback"}
              </button>
              {feedbackError && (
                <p className="text-sm text-red-300 text-center">{feedbackError}</p>
              )}
            </form>
          </motion.div>

          <div className="space-y-6">
            {combinedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-xl"
              >
                <FaQuoteLeft className="text-pink-500 text-2xl mb-3" />
                <p className="text-gray-300 leading-relaxed">{testimonial.quote}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-pink-500">
                      {testimonial.event}
                    </p>
                  </div>
                  <div className="flex gap-1 text-yellow-300">
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <FaStar key={starIndex} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
