import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaFacebookF,
  FaGithub,
} from "react-icons/fa";
import logo from "../assets/logo_6.png";

const Footer = () => {
  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "FAQ", path: "/faq" },
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/ajmalik0128",
      color: "#1877F2",
    },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/__aj__malik/",
      color: "#E4405F",
    },
    {
      icon: <FaTwitter />,
      href: "https://x.com/AbdulMa86863044",
      color: "#1DA1F2",
    },
    {
      icon: <FaYoutube />,
      href: "https://www.youtube.com/@ajmalik0128",
      color: "#FF0000",
    },
    {
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/in/abdul-malik-4ba5b0185/",
      color: "#0A66C2",
    },
    {
      icon: <FaGithub />,
      href: "https://github.com/ajmalik01",
      color: "#ffffff",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] text-gray-300 py-12 px-4 border-t border-orange-500/20 relative overflow-hidden">
      {/* Side cinematic light glows */}
      <motion.div
        className="absolute top-0 left-0 w-[25%] h-full bg-gradient-to-r from-orange-500/10 via-transparent to-transparent blur-[100px]"
        animate={{ opacity: [0.2, 0.4, 0.2], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-0 w-[25%] h-full bg-gradient-to-l from-orange-500/10 via-transparent to-transparent blur-[100px]"
        animate={{ opacity: [0.2, 0.4, 0.2], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glowing background */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}>
        <motion.div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[90%] h-[100%] bg-gradient-to-t from-orange-500/20 via-orange-400/10 to-transparent blur-[100px] rounded-full"
          animate={{ opacity: [0.3, 0.6, 0.3], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-[60%] h-[80%] bg-gradient-to-bl from-red-500/20 via-orange-500/10 to-transparent blur-[120px] rounded-full"
          animate={{ opacity: [0.2, 0.5, 0.2], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-[40%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(255,160,60,0.25),transparent_70%)] blur-[80px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Film grain effect */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-[0.03]"></div>

      {/* Main Footer Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">
        {/* Brand / Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex flex-col items-center space-y-3">
          <motion.img
            src={logo}
            alt="MovieAura Logo"
            className="w-25 h-24 object-contain drop-shadow-[0_0_10px_rgba(255,100,0,0.4)]"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            Experience the aura of cinema — where every frame tells a story.
            Discover, stream, and celebrate the world of movies.
          </p>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          {navLinks.map((item, index) => (
            <motion.div
              whileHover={{
                scale: 1.1,
                color: "#ff6a00",
                textShadow: "0 0 8px #ff6a00",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              key={index}>
              <Link
                to={item.path}
                className="hover:text-orange-400 transition-colors duration-300">
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex justify-center gap-6 text-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}>
          {socialLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.3,
                rotate: 5,
                textShadow: `0 0 15px ${link.color}`,
              }}
              transition={{ type: "spring", stiffness: 250 }}
              className="transition-all duration-300"
              style={{ color: link.color }}>
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          className="text-center text-sm text-neutral-500 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}>
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-orange-400 font-semibold">MovieAura</span> —{" "}
            Crafted with ❤️ by{" "}
            <span className="text-white font-medium text-bold">AJ</span>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default React.memo(Footer);
