import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { MdImageNotSupported } from "react-icons/md";

const Card = ({ data, trending, index, media_type, small }) => {
  const imageURL = useSelector((state) => state.cinefyData.imageURL);
  const mediaType = data.media_type ?? media_type;

  const cardSize = small
    ? "w-[150px] h-[190px] sm:w-[190px] sm:h-[230px] md:w-[210px] md:h-[260px] lg:w-[230px] lg:h-[300px]"
    : "min-w-[230px] max-w-[230px] h-80";

  return (
    <Link
      to={`/${mediaType}/${data.id}`}
      className={`group relative ${cardSize} rounded-xl overflow-hidden 
        bg-neutral-900 flex flex-col
        transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] 
        hover:scale-[1.05] hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]`}>
      {/* Poster */}
      <div className="relative flex-grow overflow-hidden">
        {data?.poster_path ? (
          <img
            src={imageURL + data.poster_path}
            alt={data?.title || "Poster"}
            loading="lazy"
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
      </div>

      {/* Bottom Overlay */}
      <div
        className="absolute bottom-0 w-full p-2 
          bg-gradient-to-t from-black/80 via-black/60 to-transparent
          opacity-0 group-hover:opacity-100
          backdrop-blur-md
          transition-all duration-500 ease-in-out">
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
      </div>
    </Link>
  );
};

export default React.memo(Card);
