import { useState, useRef, useEffect } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

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
          className="bg-gray-800/50 flex items-center justify-center text-gray-500 text-sm"
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
          confirmButtonColor: "#ec4899",
        });
        setFormData({ name: "", email: "", phone: "", eventType: "", message: "" });
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again or contact us via WhatsApp.",
          icon: "error",
          confirmButtonColor: "#ec4899",
        });
      }
    } catch {
      Swal.fire({
        title: "Connection Error",
        text: "Please check your internet and try again, or reach us on WhatsApp.",
        icon: "error",
        confirmButtonColor: "#ec4899",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-6 text-gray-100"
      aria-label="Contact us"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 right-10 h-32 w-32 bg-pink-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-6 h-40 w-40 bg-amber-500/15 blur-3xl" />
      </div>
      <div className="relative">
      <Helmet>
        <title>South Lanka Fireworks - Contact Us</title>
        <meta
          name="description"
          content="Get in touch with South Lanka Fireworks. Contact us for wedding fireworks, festival shows, corporate events, or custom fireworks packages across Sri Lanka."
        />
        <meta
          name="keywords"
          content="Contact South Lanka Fireworks, Wedding Fireworks Sri Lanka, Fireworks for Events, Festival Fireworks Sri Lanka, Corporate Fireworks Sri Lanka"
        />
        <meta name="author" content="South Lanka Fireworks" />
        <meta property="og:title" content="Contact South Lanka Fireworks" />
        <meta
          property="og:description"
          content="Reach out to South Lanka Fireworks for unforgettable firework shows in Sri Lanka. Book for weddings, corporate events, and festivals."
        />
        <meta property="og:image" content="/assets/SouthLankaFireworks.webp" />
        <meta property="og:url" content="https://slfireworks.com/contact" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-5xl mx-auto text-center mb-14">
        <p className="text-xs uppercase tracking-[0.4em] text-pink-500 mb-3">
          Get In Touch
        </p>
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Let's Plan Your Show
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Whether it's a wedding, festival, or corporate event â€” reach out and we'll
          craft the perfect fireworks experience for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Our Location & Details
            </h3>
            <div className="space-y-5 text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-white">Address</p>
                  <p className="text-sm text-gray-400">No 07, Dadalle Cross Road, Dadalle, Galle</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <a href="tel:+94777135516" className="text-sm text-gray-400 hover:text-green-400 transition block">
                    +94 77 713 5516
                  </a>
                  <a href="tel:+94912246572" className="text-sm text-gray-400 hover:text-green-400 transition block">
                    +94 91 224 6572
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-orange-500 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a href="mailto:southlankafireworks@gmail.com" className="text-sm text-gray-400 hover:text-orange-400 transition break-all sm:break-normal">
                    southlankafireworks@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-blue-500 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-white">Business Hours</p>
                  <p className="text-sm text-gray-400">Mon – Sat: 9:00 AM – 6:00 PM</p>
                  <p className="text-sm text-gray-400">Sunday: By Appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Connect */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-3xl shadow-xl">
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white mb-4">
              Quick Connect
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/+94777135516?text=Hello%20South%20Lanka%20Fireworks!%20I%20would%20like%20to%20know%20more%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-400 hover:bg-green-500/20 transition"
              >
                <FaWhatsapp size={18} />
                WhatsApp
              </a>
              <a
                href="https://www.facebook.com/share/1CEsjdTcV4/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition"
              >
                <FaFacebook size={18} />
                Facebook
              </a>
              <a
                href="https://www.tiktok.com/@southlankafireworks?_t=ZS-8ysCsrhOBOx&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-pink-500/30 bg-pink-500/10 px-4 py-3 text-sm font-medium text-pink-400 hover:bg-pink-500/20 transition"
              >
                <FaTiktok size={18} />
                TikTok
              </a>
              <a
                href="https://www.instagram.com/southlankafireworks"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-sm font-medium text-purple-400 hover:bg-purple-500/20 transition"
              >
                <FaInstagram size={18} />
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
          <h3 className="text-2xl font-semibold mb-2 text-white">
            Send Us a Message
          </h3>
          <p className="text-sm text-gray-400 mb-6">We respond within 2 hours during business hours.</p>
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
                  className="w-full border border-white/15 rounded-xl px-4 py-3 bg-white/5 text-gray-100 placeholder:text-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                  className="w-full border border-white/15 rounded-xl px-4 py-3 bg-white/5 text-gray-100 placeholder:text-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                className="w-full border border-white/15 rounded-xl px-4 py-3 bg-white/5 text-gray-100 placeholder:text-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <label htmlFor="contact-eventType" className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1 block">Event Type</label>
              <select
                id="contact-eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full border border-white/15 rounded-xl px-4 py-3 bg-[#1a1730] text-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                className="w-full border border-white/15 rounded-xl px-4 py-3 resize-none bg-white/5 text-gray-100 placeholder:text-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-pink-500 to-amber-400 text-white py-3 rounded-xl hover:opacity-95 transition font-semibold shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
            <p className="text-xs text-gray-400 text-center">
              Or reach us instantly via{" "}
              <a
                href="https://wa.me/94777135516"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 font-medium hover:underline"
              >
                WhatsApp
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-6xl mx-auto mt-14 rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur">
        <LazyIframe
          title="South Lanka Fireworks Location - Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.57941086033475!2d80.1869036120917!3d6.0508440296205155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1750019cb271d%3A0x6c811e7c258a3a73!2sSouth%20Lanka%20Fireworks!5e1!3m2!1sen!2slk!4v1754989535052!5m2!1sen!2slk"
          width="100%"
          height={380}
          style={{ border: 0 }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Google Maps showing South Lanka Fireworks location in Galle, Sri Lanka"
        />
      </div>
      </div>
    </section>
  );
};

export default Contact;
