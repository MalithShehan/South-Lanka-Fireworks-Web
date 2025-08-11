import React, { useState } from "react";
import md5 from "blueimp-md5";
import { motion } from "framer-motion";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      ...formData,
      rating,
      timestamp: new Date().toLocaleString(),
    };

    setFeedbackList([newFeedback, ...feedbackList]);

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setRating(0);
  };

  // Generate Gravatar URL from email
  const getGravatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=64&d=identicon`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 py-16 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Feedback Form */}
        <motion.div
          className="bg-white/5 backdrop-blur-md p-8 sm:p-12 rounded-2xl shadow-2xl w-full border border-white/10 mb-12"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-6"
            style={{ fontFamily: "'Merienda', cursive" }}
          >
            💬 Share Your Feedback
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                required
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-400"
              ></textarea>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm mb-2">Your Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={(hoverRating || rating) >= star ? "#FBBF24" : "none"}
                    viewBox="0 0 24 24"
                    stroke="#FBBF24"
                    strokeWidth={2}
                    className="w-8 h-8 cursor-pointer transition-transform hover:scale-110"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.27 3.914a1 1 0 00.95.69h4.116c.969 0 1.371 1.24.588 1.81l-3.33 2.42a1 1 0 00-.364 1.118l1.27 3.914c.3.921-.755 1.688-1.54 1.118l-3.33-2.42a1 1 0 00-1.176 0l-3.33 2.42c-.784.57-1.838-.197-1.539-1.118l1.27-3.914a1 1 0 00-.364-1.118l-3.33-2.42c-.783-.57-.38-1.81.588-1.81h4.116a1 1 0 00.951-.69l1.27-3.914z"
                    />
                  </svg>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-yellow-400 mt-2">
                  You rated {rating} star{rating > 1 ? "s" : ""}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white font-semibold rounded-xl shadow-md"
            >
              Submit Feedback
            </motion.button>
          </form>
        </motion.div>

        {/* Display Feedback */}
        {feedbackList.length > 0 && (
          <motion.div
            className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">📝 Recent Feedback</h3>
            <ul className="space-y-4">
              {feedbackList.map((feedback, index) => (
                <li
                  key={index}
                  className="border border-white/10 p-4 rounded-lg bg-white/10 flex items-start space-x-4"
                >
                  {/* Profile Picture */}
                  <img
                    src={getGravatarUrl(feedback.email)}
                    alt={`${feedback.name} profile`}
                    className="w-12 h-12 rounded-full border-2 border-yellow-400"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-semibold block">{feedback.name}</span>
                        <span className="text-xs text-white/60 block">{feedback.email}</span>
                      </div>
                      <span className="text-xs text-white/60">{feedback.timestamp}</span>
                    </div>
                    <p className="text-sm text-white/90">{feedback.message}</p>
                    <div className="flex mt-2">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#FBBF24"
                          viewBox="0 0 24 24"
                          stroke="#FBBF24"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.27 3.914a1 1 0 00.95.69h4.116c.969 0 1.371 1.24.588 1.81l-3.33 2.42a1 1 0 00-.364 1.118l1.27 3.914c.3.921-.755 1.688-1.54 1.118l-3.33-2.42a1 1 0 00-1.176 0l-3.33 2.42c-.784.57-1.838-.197-1.539-1.118l1.27-3.914a1 1 0 00-.364-1.118l-3.33-2.42c-.783-.57-.38-1.81.588-1.81h4.116a1 1 0 00.951-.69l1.27-3.914z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
