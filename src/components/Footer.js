import React from "react";
import logo from "../assets/logo_6.png";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-neutral-900/80 to-black/90 text-neutral-300 backdrop-blur-md border-t border-neutral-800 mt-10">
      {/* Glow Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

      <div className="relative container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Section — Logo + Tagline */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Cinefy Logo"
              className="w-15 h-14 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            />
            <span className="sr-only">Cinefy</span>
          </Link>
          <p className="text-sm text-neutral-400 max-w-xs text-center md:text-left">
            Your gateway to endless cinematic experiences. Stream your world,
            one movie at a time.
          </p>
        </div>

        {/* Center Section — Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link
            to="/about"
            className="hover:text-white transition-colors duration-300">
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-white transition-colors duration-300">
            Contact
          </Link>
          <Link
            to="/privacy"
            className="hover:text-white transition-colors duration-300">
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="hover:text-white transition-colors duration-300">
            Terms of Service
          </Link>
          <Link
            to="/faq"
            className="hover:text-white transition-colors duration-300">
            FAQ
          </Link>
        </div>

        {/* Right Section — Social Media */}
        <div className="flex items-center justify-center gap-5 text-xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition duration-300">
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition duration-300">
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition duration-300">
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition duration-300">
            <FaYoutube />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300">
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-800 opacity-70"></div>

      {/* Bottom Section */}
      <div className="text-center py-4 text-sm text-neutral-500">
        <p>
          © {year} <span className="text-white font-semibold">Cinefy</span> —
          All rights reserved. Designed & Built by{" "}
          <span className="text-orange-500 font-medium">AJ</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
