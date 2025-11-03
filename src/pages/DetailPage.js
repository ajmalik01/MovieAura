import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { motion } from "framer-motion";
import {
  FaArrowCircleRight,
  FaArrowCircleLeft,
  FaPlay,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import Divider from "../components/Divider";
import useFetch from "../hooks/useFetch";
import useFetchDetails from "../hooks/useFetchDetails";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import VideoPlay from "../components/VideoPlay";

// ✅ Fixed import
import {
  addFavorite,
  removeFavorite,
  addWatchlist,
  removeWatchlist,
} from "../store/favoritesSlice";

const DetailPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const imageURL = useSelector((state) => state.cinefyData.imageURL);
  const { favorites, watchlist } = useSelector((state) => state.userLists);
  const userEmail = useSelector((state) => state.cinefyData.user?.email);

  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recommendationData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, SetPlayVideoId] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); // ✅ new
  const castScrollRef = useRef(null);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params.id]);

  const handlePlayVideo = (data) => {
    SetPlayVideoId(data);
    setPlayVideo(true);
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-900">
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-800 animate-pulse"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }

  const duration = data?.runtime
    ? (Number(data.runtime) / 60).toFixed(1).split(".")
    : [0, 0];

  const writer = castData?.crew
    ?.filter(
      (el) =>
        el?.job &&
        ["writer", "screenplay", "story", "author"].some((word) =>
          el.job.toLowerCase().includes(word)
        )
    )
    ?.map((el) => el.name)
    .join(", ");

  const isFavorite = favorites.some((item) => item.id === data.id);
  const isInWatchlist = watchlist.some((item) => item.id === data.id);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const toggleFavorite = () => {
    if (!userEmail) return alert("Please log in to manage favorites.");
    if (isFavorite) {
      dispatch(removeFavorite({ userEmail, id: data.id }));
      showToast("Removed from Favorites ❤️");
    } else {
      dispatch(addFavorite({ userEmail, item: data }));
      showToast("Added to Favorites ❤️");
    }
  };

  const toggleWatchlist = () => {
    if (!userEmail) return alert("Please log in to manage watchlist.");
    if (isInWatchlist) {
      dispatch(removeWatchlist({ userEmail, id: data.id }));
      showToast("Removed from Watchlist 📋");
    } else {
      dispatch(addWatchlist({ userEmail, item: data }));
      showToast("Added to Watchlist 📋");
    }
  };

  const scrollLeft = () => {
    castScrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    castScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <motion.div
      key={params.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-white bg-neutral-950 relative">
      {/* ✅ Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white px-6 py-3 rounded-full shadow-lg z-50 text-sm sm:text-base">
          {toastMessage}
        </motion.div>
      )}

      {/* Banner */}
      <div className="relative w-full h-[450px] overflow-hidden">
        <motion.img
          src={imageURL + data?.backdrop_path}
          alt={data?.title}
          className="h-full w-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/80 to-transparent" />
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
        <motion.div
          className="w-fit mx-auto -mt-20 lg:-mt-40 relative flex flex-col items-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}>
          <img
            src={imageURL + data?.poster_path}
            alt={data?.title}
            className="w-56 h-80 sm:w-60 sm:h-84 lg:w-72 lg:h-[420px] object-cover rounded-2xl shadow-2xl"
            loading="lazy"
            decoding="async"
          />

          {/* Play Now */}
          <motion.button
            onClick={() => handlePlayVideo(data)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative mt-6 bg-gradient-to-r from-orange-500 to-red-700 text-white font-semibold uppercase text-sm sm:text-base lg:text-lg tracking-wide px-6 py-3 rounded-full shadow-[0_0_20px_rgba(255,100,50,0.4)] overflow-hidden flex items-center gap-2 justify-center transition-all duration-500 ease-out hover:shadow-[0_0_35px_rgba(255,100,80,0.7)]">
            <FaPlay className="text-lg sm:text-xl" />
            <span>Play Now</span>
          </motion.button>

          {/* Favorites & Watchlist Buttons */}
          <div className="flex gap-4 mt-5">
            <button
              onClick={toggleFavorite}
              className="flex items-center gap-2 bg-neutral-800 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-all">
              {isFavorite ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
              {isFavorite ? "Favorited" : "Add to Favorites"}
            </button>

            <button
              onClick={toggleWatchlist}
              className="flex items-center gap-2 bg-neutral-800 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition-all">
              {isInWatchlist ? (
                <FaBookmark className="text-yellow-400" />
              ) : (
                <FaRegBookmark />
              )}
              {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
            </button>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}>
          <h2 className="text-3xl lg:text-5xl font-bold mb-2">
            {data.title || data.name}
          </h2>
          <p className="text-neutral-400 italic mb-3">{data.tagline}</p>

          <div className="flex flex-wrap items-center gap-3 text-neutral-300 text-sm mb-2">
            <span>⭐ {Number(data.vote_average).toFixed(1)} / 10</span>
            <span>• {data.vote_count} votes</span>
            <span>
              • {duration[0]}h {duration[1]}m
            </span>
          </div>

          <Divider />

          <div className="text-neutral-300 mb-4 leading-relaxed">
            <h3 className="text-xl font-semibold text-white mb-2">Overview</h3>
            {isMobile ? (
              <>
                <motion.p
                  animate={{ height: showMore ? "auto" : 80 }}
                  className="overflow-hidden transition-all duration-500">
                  {data.overview}
                </motion.p>
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-blue-400 mt-2 font-medium">
                  {showMore ? "Read less" : "Read more"}
                </button>
              </>
            ) : (
              <p>{data.overview}</p>
            )}
          </div>

          <Divider />

          <div className="flex flex-wrap gap-3 text-neutral-300 text-sm">
            <p>
              Status: <span className="text-white">{data.status}</span>
            </p>
            <span>|</span>
            <p>Release: {moment(data.release_date).format("MMMM Do YYYY")}</p>
            <span>|</span>
            <p>Revenue: ₹ {data.revenue?.toLocaleString()}</p>
          </div>

          <Divider />

          <div className="text-neutral-300 space-y-2">
            <p>
              <span className="text-white">Director:</span>{" "}
              {castData?.crew[0]?.name || "N/A"}
            </p>
            <p>
              <span className="text-white">Writer:</span> {writer || "N/A"}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Cast Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative container mx-auto px-4 mb-10">
        <h2 className="font-bold text-2xl mb-4">Cast</h2>

        {hovered && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white bg-neutral-900/70 p-2 rounded-full hover:scale-110 transition-all">
            <FaArrowCircleLeft size={28} />
          </button>
        )}

        <div
          ref={castScrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar">
          {castData?.cast
            ?.filter((el) => el.profile_path)
            .slice(0, 20)
            .map((cast, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="w-24 flex-shrink-0 text-center">
                <img
                  src={imageURL + cast.profile_path}
                  alt={cast.name}
                  className="w-24 h-24 rounded-full object-cover border border-neutral-700 shadow-md"
                />
                <p className="text-sm mt-2">{cast.name}</p>
              </motion.div>
            ))}
        </div>

        {hovered && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white bg-neutral-900/70 p-2 rounded-full hover:scale-110 transition-all">
            <FaArrowCircleRight size={28} />
          </button>
        )}
      </motion.div>

      {/* Similar & Recommended */}
      <div className="space-y-10">
        <HorizontalScrollCard
          data={similarData}
          heading={`Similar ${params?.explore}`}
          media_type={params?.explore}
        />
        <HorizontalScrollCard
          data={recommendationData}
          heading={`Recommended ${params?.explore}`}
          media_type={params?.explore}
        />
      </div>

      {/* Video Player */}
      {playVideo && (
        <VideoPlay
          data={playVideoId}
          onClose={() => setPlayVideo(false)}
          media_type={params?.explore}
        />
      )}
    </motion.div>
  );
};

export default React.memo(DetailPage);
