import { useState } from "react";
import emailjs from "emailjs-com";
import { MapPin, Phone, Mail } from "lucide-react";

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
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formData,
        "YOUR_USER_ID"
      )
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

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-black mb-4">
          📩 Contact Us
        </h2>
        <p className="text-lg text-gray-600">
          We'd love to hear from you — whether it’s for orders, inquiries, or custom fireworks packages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="bg-white/50 p-8 rounded-2xl shadow-lg flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-6 text-gray-600">Our Location & Details</h3>
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
              <Mail className="text-orange-500" />
              <p>southlankafireworks@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/50 p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">Send Us a Message</h3>
          {submitted && (
            <p className="mb-4 text-green-600 font-semibold">
              ✅ Thank you! We will get back to you soon.
            </p>
          )}
          {error && (
            <p className="mb-4 text-red-600 font-semibold">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-3 rounded-lg hover:bg-blue-500 transition font-semibold shadow-md"
            >
              🚀 Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-6xl mx-auto mt-12 rounded-2xl overflow-hidden shadow-lg h-80">
        <iframe
          title="South Lanka Fireworks Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.57941086033475!2d80.1869036120917!3d6.0508440296205155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1750019cb271d%3A0x6c811e7c258a3a73!2sSouth%20Lanka%20Fireworks!5e1!3m2!1sen!2slk!4v1754989535052!5m2!1sen!2slk"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};

export default Contact;
