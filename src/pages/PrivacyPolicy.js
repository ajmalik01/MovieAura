import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-neutral-950 to-black text-neutral-200 px-6 sm:px-12 py-16 overflow-hidden">
      {/* Header Section */}
      <motion.div
        className="max-w-5xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Privacy <span className="text-orange-500">Policy</span>
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed max-w-3xl mx-auto">
          At <span className="text-orange-500 font-semibold">MovieAura</span>,
          your privacy matters to us. This policy outlines how we handle your
          data while delivering the best movie discovery experience possible.
        </p>
      </motion.div>

      {/* Policy Content */}
      <div className="max-w-4xl mx-auto bg-neutral-900/50 p-8 rounded-2xl shadow-2xl border border-neutral-800 backdrop-blur-sm">
        {[
          {
            title: "1. Information We Collect",
            text: "We collect essential information like your name, email address, and preferences when you interact with MovieAura. Technical details such as browser type and device information help us improve our platform.",
          },
          {
            title: "2. How We Use Your Data",
            text: "Your data helps us tailor content recommendations, enhance user experience, and notify you about exciting new releases — without compromising your privacy.",
          },
          {
            title: "3. Cookies & Tracking",
            text: "MovieAura uses cookies to enhance site performance and personalize your experience. You can disable cookies through your browser settings at any time.",
          },
          {
            title: "4. Data Security",
            text: "We employ encryption and secure storage to safeguard your information. While no digital system is entirely risk-free, we are committed to maintaining top-level security.",
          },
          {
            title: "5. Third-Party Services",
            text: "Our site may include links to third-party platforms. MovieAura does not control their policies and encourages users to review their privacy statements.",
          },
          {
            title: "6. Policy Updates",
            text: "We may update our Privacy Policy occasionally to reflect system improvements or legal changes. The revised version will always be available on this page.",
          },
          {
            title: "7. Contact Us",
            text: (
              <>
                Have questions or concerns? Reach out at{" "}
                <a
                  href="mailto:support@movieaura.com"
                  className="text-orange-500 hover:underline">
                  support@movieaura.com
                </a>
                .
              </>
            ),
          },
        ].map((section, i) => (
          <motion.section
            key={i}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-10">
            <h2 className="text-2xl font-semibold text-orange-500 mb-3">
              {section.title}
            </h2>
            <p className="text-neutral-400 leading-relaxed">{section.text}</p>
          </motion.section>
        ))}
      </div>

      {/* Footer */}
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
    </section>
  );
};

export default React.memo(PrivacyPolicy);
