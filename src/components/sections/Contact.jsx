import { useState, useRef, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";
import AnimatedSection from "../ui/AnimatedSection";
import GlowCard from "../ui/GlowCard";

const LazyIframe = ({ src, title, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {isVisible ? (
        <iframe src={src} title={title} {...props} />
      ) : (
        <div
          style={{ width: props.width, height: props.height }}
          className="flex items-center justify-center bg-[#17100d]/70 text-sm text-stone-500"
          aria-label="Map loading..."
        >
          <MapPin size={24} className="animate-pulse" />
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const { default: Swal } = await import("sweetalert2");

    const payload = new FormData();
    payload.append("access_key", "f414ed45-f1d0-4522-a132-2604d0dd27ec");
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(payload)),
      }).then((r) => r.json());

      if (res.success) {
        Swal.fire({
          title: "Message Sent!",
          text: "Thank you for reaching out. We'll get back to you within 2 hours!",
          icon: "success",
          confirmButtonColor: "#f97316",
        });
        setFormData({ name: "", email: "", phone: "", eventType: "", message: "" });
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again or contact us via WhatsApp.",
          icon: "error",
          confirmButtonColor: "#f97316",
        });
      }
    } catch {
      Swal.fire({
        title: "Connection Error",
        text: "Please check your internet and try again, or reach us on WhatsApp.",
        icon: "error",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 text-gray-100"
      aria-label="Contact us"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 right-10 h-32 w-32 bg-orange-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-6 h-40 w-40 bg-amber-500/15 blur-3xl" />
      </div>
      <div className="relative">

      <AnimatedSection variant="fadeUp" className="max-w-5xl mx-auto text-center mb-14">
        <p className="text-xs uppercase tracking-[0.4em] text-amber-200 mb-3">
          Get In Touch
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Let's Plan <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-violet-300 bg-clip-text text-transparent">Your Show</span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Whether it is a wedding, festival, or corporate event, share your date,
          location, and event vision. We will help you choose the right display.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <GlowCard glowColor="rgba(249, 115, 22, 0.15)" className="rounded-3xl border border-amber-200/10 bg-white/[0.03] backdrop-blur-md p-5 shadow-xl shadow-black/20 sm:p-8">
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Our Location & Details
            </h3>
            <div className="space-y-5 text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 flex-shrink-0 text-rose-300" size={20} />
                <div>
                  <p className="font-medium text-white">Address</p>
                  <p className="text-sm text-gray-400">No 07, Dadalle Cross Road, Dadalle, Galle</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 flex-shrink-0 text-cyan-300" size={20} />
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <a href="tel:+94777135516" className="block text-sm text-gray-400 transition hover:text-orange-200">
                    +94 77 713 5516
                  </a>
                  <a href="tel:+94912246572" className="block text-sm text-gray-400 transition hover:text-orange-200">
                    +94 91 224 6572
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-violet-400 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a href="mailto:southlankafireworks@gmail.com" className="text-sm text-gray-400 hover:text-orange-400 transition break-all sm:break-normal">
                    southlankafireworks@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 flex-shrink-0 text-emerald-300" size={20} />
                <div>
                  <p className="font-medium text-white">Business Hours</p>
                  <p className="text-sm text-gray-400">Open 24/7</p>
                  <p className="text-sm text-gray-400">Quotes and support any time, every day</p>
                </div>
              </div>
            </div>
          </GlowCard>

          {/* Quick Connect */}
          <GlowCard glowColor="rgba(245, 158, 11, 0.15)" className="rounded-3xl border border-amber-200/10 bg-white/[0.03] backdrop-blur-md p-6 shadow-xl shadow-black/20">
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white mb-4">
              Quick Connect
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: "https://wa.me/+94777135516?text=Hello%20South%20Lanka%20Fireworks!%20I%20would%20like%20to%20know%20more%20about%20your%20products.", icon: <FaWhatsapp size={18} />, label: "WhatsApp", classes: "border-green-400/25 bg-green-500/12 text-green-200 hover:bg-green-500/20" },
                { href: "https://www.facebook.com/share/1CEsjdTcV4/?mibextid=wwXIfr", icon: <FaFacebook size={18} />, label: "Facebook", classes: "border-blue-400/25 bg-blue-500/12 text-blue-200 hover:bg-blue-500/20" },
                { href: "https://www.tiktok.com/@southlankafireworks?_t=ZS-8ysCsrhOBOx&_r=1", icon: <FaTiktok size={18} />, label: "TikTok", classes: "border-rose-400/25 bg-rose-500/12 text-rose-200 hover:bg-rose-500/20" },
                { href: "https://www.instagram.com/southlankafireworks", icon: <FaInstagram size={18} />, label: "Instagram", classes: "border-fuchsia-400/25 bg-fuchsia-500/12 text-fuchsia-200 hover:bg-fuchsia-500/20" },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center gap-2 rounded-xl border px-3 sm:px-4 py-3 text-sm font-medium transition ${social.classes}`}
                >
                  {social.icon}
                  {social.label}
                </motion.a>
              ))}
            </div>
          </GlowCard>
        </div>

        {/* Contact Form */}
        <GlowCard glowColor="rgba(249, 115, 22, 0.12)" className="rounded-3xl border border-amber-200/10 bg-white/[0.03] backdrop-blur-md p-5 shadow-xl shadow-black/20 sm:p-8">
          <h3 className="text-2xl font-semibold mb-2 text-white">
            Send Us a Message
          </h3>
          <p className="text-sm text-gray-400 mb-6">We respond within 2 hours, 24/7.</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1 block">Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-gray-100 placeholder:text-gray-500 shadow-inner transition-all duration-300 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-500/25"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1 block">Phone</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="07X XXX XXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-gray-100 placeholder:text-gray-500 shadow-inner transition-all duration-300 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-500/25"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-email" className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1 block">Email *</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-gray-100 placeholder:text-gray-500 shadow-inner transition-all duration-300 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-500/25"
              />
            </div>
            <div>
              <label htmlFor="contact-eventType" className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1 block">Event Type</label>
              <select
                id="contact-eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/15 bg-[#1d130f] px-4 py-3 text-gray-100 shadow-inner transition-all duration-300 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-500/25"
              >
                <option value="">Select event type...</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Festival">Festival / Religious</option>
                <option value="Corporate">Corporate Event</option>
                <option value="National">National Celebration</option>
                <option value="School">School / College Event</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1 block">Message *</label>
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                placeholder="Tell us about your event – date, location, and any special requirements..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-gray-100 placeholder:text-gray-500 shadow-inner transition-all duration-300 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-500/25"
              />
            </div>
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-300 via-rose-400 to-violet-400 py-3 font-semibold text-[#1a110d] shadow-lg shadow-rose-500/20 transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="absolute inset-0 shimmer-effect" />
              <span className="relative">{submitting ? "Sending..." : "Send Message"}</span>
            </motion.button>
            <p className="text-xs text-gray-400 text-center">
              Or reach us instantly via{" "}
              <a
                href="https://wa.me/94777135516"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-green-400 hover:text-green-300 hover:underline transition-colors"
              >
                WhatsApp
              </a>
            </p>
          </form>
        </GlowCard>
      </div>

      {/* Map Section */}
      <div className="max-w-6xl mx-auto mt-14 overflow-hidden rounded-3xl border border-amber-200/10 shadow-2xl shadow-black/20">
        <LazyIframe
          title="South Lanka Fireworks Location - Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.57941086033475!2d80.1869036120917!3d6.0508440296205155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1750019cb271d%3A0x6c811e7c258a3a73!2sSouth%20Lanka%20Fireworks!5e1!3m2!1sen!2slk!4v1754989535052!5m2!1sen!2slk"
          width="100%"
          height={380}
          style={{ border: 0 }}
          className="w-full h-[250px] sm:h-[320px] md:h-[380px]"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Google Maps showing South Lanka Fireworks location in Galle, Sri Lanka"
        />
      </div>
      </div>
    </section>
  );
};

export default memo(Contact);
