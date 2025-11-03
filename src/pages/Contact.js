import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaPhoneAlt,
  FaFilm,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Floating animation variants for background icons
  const floatingVariant = {
    animate: {
      y: [0, -20, 0],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-neutral-950 to-black text-neutral-200 py-16 px-6 overflow-hidden">
      {/* Animated floating icons in background */}
      <motion.div
        variants={floatingVariant}
        animate="animate"
        className="absolute text-orange-600/20 text-6xl top-20 left-10">
        <FaFilm />
      </motion.div>
      <motion.div
        variants={floatingVariant}
        animate="animate"
        className="absolute text-orange-600/20 text-5xl bottom-24 right-16"
        style={{ animationDelay: "2s" }}>
        <FaStar />
      </motion.div>
      <motion.div
        variants={floatingVariant}
        animate="animate"
        className="absolute text-orange-600/20 text-7xl top-1/3 right-1/3"
        style={{ animationDelay: "4s" }}>
        <FaFilm />
      </motion.div>

      {/* Page Content */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact <span className="text-orange-500">MovieAura</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            We’d love to hear from you! Whether it’s feedback, partnership
            inquiries, or support — our team is here to help.
          </p>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.form
            onSubmit={(e) => e.preventDefault()}
            className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 shadow-lg space-y-6 backdrop-blur-md"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 bg-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 bg-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 bg-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-3 bg-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              required></textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-all duration-300 shadow-md">
              Send Message
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white">Get in Touch</h2>
            <p className="text-neutral-400 leading-relaxed">
              Prefer another way to reach us? No problem! Here’s how you can
              stay connected with the MovieAura team.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <FaEnvelope className="text-orange-500 text-xl" />
                <a
                  href="mailto:support@movieaura.com"
                  className="hover:text-orange-400 transition-colors">
                  support@movieaura.com
                </a>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-3">
                <FaPhoneAlt className="text-orange-500 text-xl" />
                <p className="text-neutral-400">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex justify-center md:justify-start space-x-6 pt-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-orange-500 text-2xl hover:text-orange-400 transition-colors">
                <FaInstagram />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-orange-500 text-2xl hover:text-orange-400 transition-colors">
                <FaTwitter />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-orange-500 text-2xl hover:text-orange-400 transition-colors">
                <FaFacebook />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Closing Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 pt-16">
          <h2 className="text-3xl font-bold text-white">
            Let’s Create Movie Magic Together 🎬
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Your thoughts inspire us to make{" "}
            <span className="text-orange-500 font-semibold">MovieAura</span>{" "}
            better every day. Drop us a message — we’re listening.
          </p>
        </motion.div>

        <motion.div
          className="text-center mt-12 text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}>
          <p>Last Updated: October 2025</p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}>
            <Link
              to="/"
              className="inline-block mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-xl shadow-md transition-all duration-500 ease-in-out">
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
