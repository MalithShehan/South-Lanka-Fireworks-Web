import { useState } from "react";
import emailjs from "emailjs-com";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_USER_ID")
      .then(
        () => {
          setSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
          setError(null);
        },
        () => {
          setError("❌ Failed to send message. Please try again later.");
        }
      );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "f414ed45-f1d0-4522-a132-2604d0dd27ec");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Sent!",
        text: "Your message has been sent successfully!",
        icon: "success",
      });
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-6 bg-gradient-to-b  via-pink-50/40 to-gray-50 text-gray-900"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 right-10 h-32 w-32 bg-pink-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-6 h-40 w-40 bg-amber-200/30 blur-3xl" />
      </div>
      <div className="relative">
      <Helmet>
        <title>South Lanka Fireworks</title>
        <meta
          name="description"
          content="Get in touch with South Lanka Fireworks. Contact us for wedding fireworks, festival shows, corporate events, or custom fireworks packages across Sri Lanka."
        />
        <meta
          name="keywords"
          content="Contact South Lanka Fireworks, Wedding Fireworks Sri Lanka, Fireworks for Events, Festival Fireworks Sri Lanka, Corporate Fireworks Sri Lanka"
        />
        <meta name="author" content="South Lanka Fireworks" />

        {/* Open Graph */}
        <meta property="og:title" content="Contact South Lanka Fireworks" />
        <meta
          property="og:description"
          content="Reach out to South Lanka Fireworks for unforgettable firework shows in Sri Lanka. Book for weddings, corporate events, and festivals."
        />
        <meta property="og:image" content="/assets/SouthLankaFireworks.png" />
        <meta property="og:url" content="https://slfireworks.com/contact" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-extrabold text-black mb-4">
          📩 Contact Us
        </h2>
        <p className="text-lg text-gray-600">
          We'd love to hear from you — whether it’s for orders, inquiries, or
          custom fireworks packages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="bg-white/70 border border-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-6 text-gray-600">
            Our Location & Details
          </h3>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <MapPin className="text-red-500" />
              <p>No 07, Dadalle Cross Road, Dadalle, Galle</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-green-500" />
              <p>+94 77 713 5516</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-orange-500 w-5 h-5 flex-shrink-0" />
              <p className="break-all sm:break-normal">
                southlankafireworks@gmail.com
              </p>
            </div>
            {/* WhatsApp Link */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/+94777135516?text=Hello%20South%20Lanka%20Fireworks!%20I%20would%20like%20to%20know%20more%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-green-600 hover:text-green-700 transition-colors"
              >
                <FaWhatsapp size={26} className="text-green-500" />
                <span className="break-all sm:break-normal ">
                  +94 77 713 5516
                </span>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-gray-500">Follow us on:</p>
              <a
                href="https://www.facebook.com/share/1CEsjdTcV4/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100"
              >
                Facebook
              </a>
              <a
                href="https://www.tiktok.com/@southlankafireworks?_t=ZS-8ysCsrhOBOx&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-sm rounded-full bg-pink-50 text-pink-600 font-semibold hover:bg-pink-100"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/70 border border-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">
            Send Us a Message
          </h3>
          {submitted && (
            <p className="mb-4 text-green-600 font-semibold">
              ✅ Thank you! We will get back to you soon.
            </p>
          )}
          {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-900 placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-900 placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 resize-none bg-white text-gray-900 placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-amber-400 text-white py-3 rounded-xl hover:opacity-95 transition font-semibold shadow-lg"
            >
              🚀 Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-6xl mx-auto mt-14 rounded-3xl overflow-hidden shadow-2xl border border-white/70 backdrop-blur">
        <iframe
          title="South Lanka Fireworks Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.57941086033475!2d80.1869036120917!3d6.0508440296205155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1750019cb271d%3A0x6c811e7c258a3a73!2sSouth%20Lanka%20Fireworks!5e1!3m2!1sen!2slk!4v1754989535052!5m2!1sen!2slk"
          width="100%"
          height="380"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      </div>
    </section>
  );
};

export default Contact;
