import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "How far in advance should I book a fireworks show?",
    answer:
      "We recommend booking at least 2–4 weeks in advance to ensure availability, especially during peak seasons (December, April, and wedding season). However, we can sometimes accommodate last-minute requests — just reach out via WhatsApp!",
  },
  {
    question: "Do you provide fireworks for weddings?",
    answer:
      "Absolutely! Weddings are one of our specialties. We offer everything from elegant sparkler exits and waterfall backdrops to full aerial displays choreographed to your first-dance music. Check our Packages section for wedding-specific options.",
  },
  {
    question: "What areas in Sri Lanka do you cover?",
    answer:
      "We provide nationwide coverage across all districts in Sri Lanka. Our team will travel to your venue anywhere on the island — from Colombo and Galle to Kandy, Jaffna, and everywhere in between. Delivery and setup logistics are included.",
  },
  {
    question: "Is it safe? Do you have proper licensing?",
    answer:
      "Safety is our #1 priority. We hold all required pyrotechnic licenses (Reg. No: SG/5276), our crew is fully trained and certified, and we conduct on-site safety briefings before every show. We maintain a 100% safety record across 1000+ events.",
  },
  {
    question: "Can I customize the fireworks show?",
    answer:
      "Yes! We offer fully customizable shows. You can choose specific colors, effects, duration, and even add your name or logo as a firework display. Use our Custom Package Builder on the Products page to mix and match exactly what you want.",
  },
  {
    question: "What is the price range for a fireworks show?",
    answer:
      "Our packages start from around Rs. 35,000 for small gatherings and go up based on the scale and duration of the show. We have 6 pre-built packages and a custom builder so you can control your budget. Contact us for a free personalized quote!",
  },
  {
    question: "What happens if it rains on the event day?",
    answer:
      "Light rain usually doesn't affect aerial fireworks. For heavy rain or dangerous weather, we work with you to reschedule at no extra charge. Our team monitors weather conditions and communicates proactively. Safety always comes first.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Getting a quote is easy! You can WhatsApp us at +94 77 713 5516, fill out the contact form on our website, or use the custom package builder to generate an instant estimate. We typically respond within 2 hours during business hours.",
  },
];

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="border border-white/10 rounded-2xl bg-[#0c0a1a]/90 shadow-md overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/5 transition"
      aria-expanded={isOpen}
    >
      <span className="text-base font-semibold text-white pr-4">
        {faq.question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0"
      >
        <ChevronDown size={20} className="text-pink-500" />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/10 pt-4">
            {faq.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative py-20 px-4 md:px-10 text-gray-100" id="faq" aria-label="Frequently asked questions">
      

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-pink-500 mb-3">
            Common Questions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about booking a fireworks show with us.
            Can't find what you're looking for? Just{" "}
            <a
              href="https://wa.me/94777135516"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 font-medium hover:underline"
            >
              message us on WhatsApp
            </a>
            .
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#0c0a1a]/90 border border-white/10 rounded-2xl px-4 sm:px-8 py-6 shadow-lg">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-white">Still have questions?</p>
              <p className="text-sm text-gray-400">We're here to help you plan the perfect show.</p>
            </div>
            <a
              href="https://wa.me/94777135516?text=Hello!%20I%20have%20a%20question%20about%20your%20fireworks%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white hover:bg-green-600 transition shadow-lg shadow-green-500/20 whitespace-nowrap"
            >
              Chat With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(FAQ);
