import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ_COLORS = [
  "border-l-amber-400",
  "border-l-rose-400",
  "border-l-violet-400",
  "border-l-cyan-400",
  "border-l-emerald-400",
  "border-l-blue-400",
  "border-l-orange-400",
  "border-l-fuchsia-400",
];

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
      "Getting a quote is easy! You can WhatsApp us at +94 77 713 5516, fill out the contact form on our website, or use the custom package builder to generate an instant estimate. We typically respond within 2 hours, and our team is available 24/7.",
  },
];

const FAQItem = ({ faq, isOpen, onToggle, colorClass }) => (
  <div className={`overflow-hidden rounded-[1.6rem] border border-white/10 border-l-[3px] ${colorClass} bg-[#0d0818]/60 shadow-md backdrop-blur-sm`}>
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/5"
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
        <ChevronDown size={20} className="text-amber-200" />
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
          <div className="border-t border-white/10 px-6 pb-5 pt-4 text-sm leading-relaxed text-stone-300">
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
    <section className="relative px-4 py-20 text-gray-100 md:px-10" id="faq" aria-label="Frequently asked questions">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-20 h-44 w-44 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-10 right-16 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl" />
      </div>
      

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-amber-200">
            Common Questions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-stone-300">
            Everything you need to know about booking a fireworks show with us.
            Can't find what you're looking for? Just{" "}
            <a
              href="https://wa.me/94777135516"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-200 hover:underline"
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
              colorClass={FAQ_COLORS[index % FAQ_COLORS.length]}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-4 rounded-[1.8rem] border border-white/10 bg-[#17100d]/60 px-4 py-6 shadow-lg backdrop-blur-sm sm:flex-row sm:px-8">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-white">Still have questions?</p>
              <p className="text-sm text-stone-300">We're here to help you plan the perfect show.</p>
            </div>
            <a
              href="https://wa.me/94777135516?text=Hello!%20I%20have%20a%20question%20about%20your%20fireworks%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex whitespace-nowrap rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:scale-[1.02]"
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
