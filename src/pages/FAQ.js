import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const FAQ = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = React.useState(false);

  const handleBackClick = () => {
    setIsExiting(true);
    setTimeout(() => navigate("/"), 600); // Wait for animation to finish
  };

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          key="faq-page"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="min-h-screen bg-black text-neutral-300 flex flex-col justify-center items-center px-6 py-16">
          {/* Title */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="text-center space-y-4">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
              Frequently Asked{" "}
              <span className="text-orange-500">Questions</span>
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Find answers to common questions about{" "}
              <span className="text-orange-500">MovieAura</span>.
            </p>
          </motion.div>

          {/* FAQ Content */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-3xl mt-12 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-orange-500">
                What is MovieAura?
              </h2>
              <p className="text-neutral-400 mt-2">
                MovieAura is your go-to movie discovery platform, offering
                details, trailers, and trending films from around the world —
                all in one place.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Is MovieAura free to use?
              </h2>
              <p className="text-neutral-400 mt-2">
                Yes! MovieAura is completely free. You can explore movies, TV
                shows, and details without any subscription or login required.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Where does MovieAura get its data?
              </h2>
              <p className="text-neutral-400 mt-2">
                All data is fetched from reliable movie databases and APIs like
                TMDb to ensure accurate and up-to-date information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Can I watch full movies on MovieAura?
              </h2>
              <p className="text-neutral-400 mt-2">
                MovieAura is a movie information and discovery platform — not a
                streaming site. However, you can watch official trailers and
                find links to platforms that stream the movie legally.
              </p>
            </div>
          </motion.div>

          {/* Footer / Back to Home */}
          <motion.div
            className="text-center mt-12 text-neutral-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}>
            <p>Last Updated: October 2025</p>
            <motion.button
              onClick={handleBackClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-xl shadow-md transition-all duration-300">
              Back to Home
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(FAQ);
