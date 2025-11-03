import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import useFetchDetails from "../hooks/useFetchDetails";

const VideoPlay = ({ data, onClose, media_type }) => {
  const { data: videoData } = useFetchDetails(
    `/${media_type}/${data?.id}/videos`
  );

  const [isLoading, setIsLoading] = useState(true);
  const videoKey = videoData?.results?.[0]?.key;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* ✨ Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

      {/* 🎬 Animated video container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-[95vw] sm:w-[85vw] lg:w-[70vw] aspect-video rounded-xl
                   border border-neutral-700 bg-gradient-to-b from-neutral-900 to-black
                   shadow-[0_0_30px_rgba(255,255,255,0.08)] overflow-hidden">
        {/* ❌ Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-50
                     flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10
                     rounded-full bg-black/60 hover:bg-black/80
                     text-white text-2xl sm:text-3xl hover:text-red-500
                     border border-white/20 backdrop-blur-sm transition-all duration-300">
          <IoMdCloseCircleOutline />
        </button>

        {/* 🎥 Video frame with loading shimmer */}
        {videoKey ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 animate-pulse flex items-center justify-center text-neutral-400">
                Loading trailer...
              </div>
            )}
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="Trailer"
              className="w-full h-full rounded-xl z-10 relative"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
            />
          </>
        ) : (
          <div className="flex justify-center items-center h-full text-neutral-400 text-lg">
            No trailer available
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default React.memo(VideoPlay);
