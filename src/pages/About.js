import React from "react";
import { motion } from "framer-motion";
import {
  FaFilm,
  FaTv,
  FaStar,
  FaUsers,
  FaCloudDownloadAlt,
} from "react-icons/fa";
import movie from "../assets/movie.jpeg";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-neutral-950 to-black text-neutral-200 py-16 px-6 overflow-hidden">
      {/* Removed background glow */}
      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        {/* Title Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          className="text-center space-y-4">
          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}>
            About <span className="text-orange-500">MovieAura</span>
          </motion.h1>

          <motion.p
            className="text-neutral-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}>
            Dive into the ultimate movie universe — where storytelling meets
            technology. <strong>MovieAura</strong> is built to bring your
            favorite films, series, and stars closer than ever.
          </motion.p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div className="space-y-5">
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            <p className="text-neutral-400 leading-relaxed">
              At{" "}
              <span className="text-orange-500 font-semibold">MovieAura</span>,
              our mission is to make cinema accessible, immersive, and inspiring
              for everyone. Whether you’re a movie buff, a casual watcher, or an
              aspiring filmmaker — we provide a space to explore, discover, and
              experience the magic of storytelling.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              Built with passion for both film and technology, MovieAura merges
              high-quality data, curated visuals, and an intuitive experience to
              help you find what to watch next — faster and smarter.
            </p>
          </motion.div>

          {/* Animated Image */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}>
            <motion.img
              src={movie}
              alt="MovieAura Experience"
              className="rounded-3xl shadow-2xl w-full max-w-md object-cover border border-neutral-800"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px " }}
            />
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center">
          <h2 className="text-3xl font-bold text-white mb-10">
            Why Choose MovieAura?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaFilm className="text-orange-500 text-4xl" />,
                title: "Discover Movies",
                desc: "Explore thousands of films across genres, decades, and cultures — all in one place.",
              },
              {
                icon: <FaTv className="text-orange-500 text-4xl" />,
                title: "Binge-Worthy Series",
                desc: "Stay updated on the latest and trending shows with real-time insights and reviews.",
              },
              {
                icon: <FaStar className="text-orange-500 text-4xl" />,
                title: "Personalized Picks",
                desc: "Get smart recommendations tailored to your taste, powered by modern APIs.",
              },
              {
                icon: <FaUsers className="text-orange-500 text-4xl" />,
                title: "Community Driven",
                desc: "Connect with fellow cinephiles — share ratings, favorites, and movie discussions.",
              },
              {
                icon: (
                  <FaCloudDownloadAlt className="text-orange-500 text-4xl" />
                ),
                title: "Offline Ready",
                desc: "Built with a responsive, fast, and future-proof experience in mind.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.05,
                  rotate: 1,
                  boxShadow: "0 0 30px rgba(255, 100, 0, 0.3)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:border-orange-500 transition duration-300">
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4 + i,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col items-center space-y-4">
                  {item.icon}
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center space-y-4 mt-20">
          <motion.h2
            className="text-3xl font-bold text-white"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}>
            MovieAura — Where Stories Come Alive
          </motion.h2>
          <motion.p
            className="text-neutral-400 max-w-2xl mx-auto"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}>
            More than a streaming platform, MovieAura is a celebration of
            storytelling. From blockbusters to hidden gems — we bring every
            story closer to you.
          </motion.p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}>
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

export default React.memo(About);
