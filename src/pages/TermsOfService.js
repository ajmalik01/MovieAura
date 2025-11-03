import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-neutral-950 to-black text-neutral-200 py-16 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Title */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          className="text-center space-y-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white">
            Terms of <span className="text-orange-500">Service</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Please read these terms carefully before using{" "}
            <span className="text-orange-500 font-semibold">MovieAura</span>. By
            accessing or using our platform, you agree to be bound by them.
          </p>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-orange-500 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              By accessing or using MovieAura, you agree to comply with these
              Terms of Service and all applicable laws. If you do not agree, you
              should not use the platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-orange-500 mb-3">
              2. Use of the Platform
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              You agree to use MovieAura only for lawful purposes and in a way
              that does not infringe the rights of others or restrict their
              enjoyment of the platform. Misuse, hacking, or scraping data is
              strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-orange-500 mb-3">
              3. Intellectual Property
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              All trademarks, logos, and content on MovieAura are owned by their
              respective owners. You may not copy, reproduce, or distribute any
              part of the site without written permission.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-orange-500 mb-3">
              4. User Accounts
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account information and for all activity that occurs under your
              account. Notify us immediately of any unauthorized access.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-orange-500 mb-3">
              5. Limitation of Liability
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              MovieAura is provided “as is.” We make no warranties of any kind,
              and we are not liable for any damages resulting from your use of
              the platform or inability to access it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-orange-500 mb-3">
              6. Changes to Terms
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              We may update these Terms of Service from time to time. The
              updated version will always be posted on this page with the “Last
              Updated” date shown below.
            </p>
          </div>
        </motion.div>

        {/* Footer Section with Back Button */}
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

export default React.memo(TermsOfService);
