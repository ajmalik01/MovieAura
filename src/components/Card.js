import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { MdImageNotSupported } from "react-icons/md";
import { FaHeart, FaRegHeart, FaPlus, FaCheck } from "react-icons/fa";
import {
  addFavorite,
  removeFavorite,
  addWatchlist,
  removeWatchlist,
} from "../store/favoritesSlice";

const Card = ({ data, trending, index, media_type, small }) => {
  const dispatch = useDispatch();
  const imageURL = useSelector((state) => state.cinefyData.imageURL);
  const { favorites, watchlist } = useSelector((state) => state.userLists);
  const user = useSelector((state) => state.cinefyData.user); // ✅ get user from store

  const mediaType = data.media_type ?? media_type;
  const isFavorite = favorites.some((item) => item.id === data.id);
  const isInWatchlist = watchlist.some((item) => item.id === data.id);

  const [isMobile, setIsMobile] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  // ✅ detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardSize = small
    ? "w-[150px] h-[190px] sm:w-[190px] sm:h-[230px] md:w-[210px] md:h-[260px] lg:w-[230px] lg:h-[300px]"
    : "min-w-[230px] max-w-[230px] h-80";

  // ✅ Toggle overlay on mobile tap/swipe
  const handleTouch = () => {
    if (isMobile) {
      setShowOverlay((prev) => !prev);
    }
  };

  // ✅ Handle Favorites (fixed payload key)
  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!user) {
      alert("Please log in to manage favorites.");
      return;
    }

    if (isFavorite) {
      dispatch(removeFavorite({ userEmail: user.email, id: data.id }));
    } else {
      dispatch(addFavorite({ userEmail: user.email, item: data }));
    }
  };

  // ✅ Handle Watchlist (fixed payload key)
  const handleWatchlist = (e) => {
    e.stopPropagation();
    if (!user) {
      alert("Please log in to manage watchlist.");
      return;
    }

    if (isInWatchlist) {
      dispatch(removeWatchlist({ userEmail: user.email, id: data.id }));
    } else {
      dispatch(addWatchlist({ userEmail: user.email, item: data }));
    }
  };

  return (
    <div
      className={`group relative ${cardSize} rounded-xl overflow-hidden 
      bg-neutral-900 flex flex-col
      transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] 
      hover:scale-[1.05] hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]`}
      onTouchStart={handleTouch}>
      {/* Poster */}
      <Link
        to={`/${mediaType}/${data.id}`}
        className="relative flex-grow overflow-hidden">
        {data?.poster_path ? (
          <img
            src={imageURL + data.poster_path}
            alt={data?.title || "Poster"}
            decoding="async"
            className="w-full h-full object-cover rounded-lg select-none will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-full bg-neutral-800 text-gray-400">
            <MdImageNotSupported className="text-4xl mb-2 opacity-70" />
            <p className="text-sm md:text-base font-medium">No Image Found</p>
          </div>
        )}

        {trending && (
          <div
            className="absolute top-3 left-0 py-1 px-3 bg-black/60 backdrop-blur-2xl 
            rounded-r-full text-white text-xs sm:text-sm shadow-md">
            #{index} Trending
          </div>
        )}
      </Link>

      {/* Bottom Overlay */}
      <div
        className={`absolute bottom-0 w-full p-1 
        bg-gradient-to-t from-black/80 via-black/60 to-transparent
        backdrop-blur-md transition-all duration-500 ease-in-out
        ${
          isMobile
            ? showOverlay
              ? "opacity-100"
              : "opacity-0"
            : "opacity-0 group-hover:opacity-100"
        }`}>
        <h2
          className={`text-ellipsis line-clamp-1 font-semibold text-white tracking-wide 
          ${small ? "text-xs sm:text-sm md:text-base" : "text-lg"}`}>
          {data.title || data?.name}
        </h2>

        <div
          className={`flex justify-between items-center text-neutral-300 
          ${small ? "text-[10px] sm:text-xs md:text-sm" : "text-sm"}`}>
          <p className="opacity-90">
            {data.release_date
              ? moment(data.release_date).format("YYYY")
              : "Unknown"}
          </p>

          {!small && (
            <p className="bg-black/70 px-2 py-0.5 rounded-full text-xs text-white shadow-sm">
              ⭐ {Number(data.vote_average || 0).toFixed(1)}
            </p>
          )}
        </div>

        {/* ❤️ + 🎬 Buttons */}
        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={handleFavorite}
            className="text-white text-lg hover:scale-110 transition"
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
            {isFavorite ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-white/80" />
            )}
          </button>

          <button
            onClick={handleWatchlist}
            className="text-white text-lg hover:scale-110 transition"
            title={
              isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
            }>
            {isInWatchlist ? (
              <FaCheck className="text-green-500" />
            ) : (
              <FaPlus className="text-white/80" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
