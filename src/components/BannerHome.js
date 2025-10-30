import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import VideoPlay from "./VideoPlay";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.cinefyData.bannerData);
  const imageURL = useSelector((state) => state.cinefyData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleNext = () => {
    setCurrentImage((prev) => (prev < bannerData.length - 1 ? prev + 1 : 0));
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : bannerData.length - 1));
  };

  const handlePlayNow = (item) => {
    setSelectedItem(item);
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    if (!bannerData.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev < bannerData.length - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage, bannerData.length]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden relative">
        {bannerData.map((data, index) => (
          <div
            key={data.id + "bannerHome" + index}
            className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}>
            {/* 🖼️ Image */}
            <div className="w-full h-full relative">
              <img
                src={imageURL + data.backdrop_path}
                alt={data.title || "Banner"}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out select-none"
              />
            </div>

            {/* 🌌 Overlay gradient */}
            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* ⬅️➡️ Navigation */}
            <div
              className="absolute top-0 w-full h-full flex items-center justify-between px-4
                opacity-0 lg:group-hover:opacity-100 lg:focus-within:opacity-100
                transition-opacity duration-500 ease-in-out
                pointer-events-none lg:group-hover:pointer-events-auto lg:focus-within:pointer-events-auto">
              <button
                onClick={handlePrevious}
                className="hidden lg:flex bg-white p-2 rounded-full text-xl z-10 text-black shadow-md
                  hover:scale-110 active:scale-95 transition-all duration-200">
                <FaAngleLeft />
              </button>

              <button
                onClick={handleNext}
                className="hidden lg:flex bg-white p-2 rounded-full text-xl z-10 text-black shadow-md
                  hover:scale-110 active:scale-95 transition-all duration-200">
                <FaAngleRight />
              </button>
            </div>

            {/* ✨ Text Content */}
            <div className="container mx-auto">
              <div className="absolute bottom-10 left-6 lg:left-10 max-w-md text-white">
                <h2 className="font-bold text-2xl lg:text-5xl drop-shadow-2xl leading-tight">
                  {data?.title || data?.name}
                </h2>

                <p className="text-gray-200 text-sm lg:text-base line-clamp-3 mt-2 drop-shadow-lg">
                  {data.overview}
                </p>

                <div className="flex items-center gap-3 mt-3 text-gray-300">
                  <p>⭐ Rating: {Number(data.vote_average).toFixed(1)}+</p>
                  <span>|</span>
                  <p>👁️ Views: {Number(data.popularity).toFixed(0)}</p>
                </div>

                {/* 🎬 Play Now Button */}
                <button
                  onClick={() => handlePlayNow(data)}
                  className="relative bg-gradient-to-r from-orange-500 to-red-700 
                    text-white font-semibold px-6 py-2 rounded-lg mt-5 
                    shadow-lg overflow-hidden 
                    transition-all duration-500 ease-out 
                    hover:scale-110 hover:shadow-[0_0_25px_rgba(255,100,80,0.6)]">
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-lg">▶</span>
                    <span>Play Now</span>
                  </span>

                  <span className="absolute inset-0 bg-gradient-to-l from-red-700 to-orange-500 opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out"></span>

                  <span className="absolute top-0 left-[-150%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_2.5s_linear_infinite]"></span>

                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-400/20 via-red-500/30 to-red-600/20 blur-md animate-pulse opacity-50"></span>
                </button>

                <style>
                  {`
                    @keyframes shine {
                      0% { transform: translateX(-100%); }
                      100% { transform: translateX(100%); }
                    }
                  `}
                </style>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🎥 Video overlay when "Play Now" clicked */}
      {showTrailer && selectedItem && (
        <VideoPlay
          data={selectedItem}
          media_type={selectedItem.media_type || "movie"} // default fallback
          onClose={handleCloseTrailer}
        />
      )}
    </section>
  );
};

export default React.memo(BannerHome);
