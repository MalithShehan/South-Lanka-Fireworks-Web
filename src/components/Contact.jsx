import { useState } from "react";
import emailjs from "emailjs-com";

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
        "YOUR_SERVICE_ID",     // replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID",    // replace with your EmailJS template ID
        formData,
        "YOUR_USER_ID"         // replace with your EmailJS user ID (public key)
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          setSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
          setError(null);
        },
        (error) => {
          console.error("Email error:", error.text);
          setError("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <section id="contact" className="py-16 px-4  text-gray-800">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg mb-8">
          Reach out to South Lanka Fireworks for orders, inquiries, and custom packages!
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="flex flex-col justify-center px-4">
          <h3 className="text-2xl font-semibold mb-4">Our Location</h3>
          <p className="mb-2">South Lanka Fireworks Company</p>
          <p className="mb-2">No 45, Fireworks Lane</p>
          <p className="mb-2">Colombo, Sri Lanka</p>
          <p className="mb-2">Phone: +94 77 123 4567</p>
          <p>Email: info@southlankafireworks.lk</p>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
          {submitted && (
            <p className="mb-4 text-green-600 font-semibold">
              Thank you for your message! We will get back to you soon.
            </p>
          )}
          {error && (
            <p className="mb-4 text-red-600 font-semibold">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map below all */}
      <div className="max-w-6xl mx-auto mt-12 rounded-lg overflow-hidden shadow-lg h-80">
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