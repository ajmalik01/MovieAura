import Card from "../components/Card";
import React, { useRef } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handlePrevious = () => {
    containerRef.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
        {heading}
      </h2>

      <div className="relative group">
        {/* Scrollable Cards */}
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-5 overflow-hidden overflow-x-scroll scroll-smooth transition-all scrollbar-none">
          {data.map((data, index) => (
            <Card
              key={data.id + heading + index}
              data={data}
              index={index + 1}
              trending={trending}
              media_type={media_type}
            />
          ))}
        </div>

        {/* Navigation Buttons  */}
        <div className="absolute top-0 left-0 w-full h-full hidden lg:flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-20 pointer-events-none">
          <button
            onClick={handlePrevious}
            className="bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md transform transition-all duration-300 ease-in-out -translate-x-3 group-hover:translate-x-0 pointer-events-auto">
            <FaAngleLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            className="bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md transform transition-all duration-300 ease-in-out translate-x-3 group-hover:translate-x-0 pointer-events-auto">
            <FaAngleRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
