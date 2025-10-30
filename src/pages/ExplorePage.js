import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import Card from "../components/Card";

const ExplorePage = () => {
  const { explore } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/discover/${explore}`, {
        params: { page: pageNo },
      });
      setData((prev) =>
        pageNo === 1
          ? response.data.results
          : [...prev, ...response.data.results]
      );
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [explore, pageNo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setData([]);
    setPageNo(1);
    fetchData();
  }, [explore]);

  // Infinite scroll + Scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      // Load more content
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        !loading &&
        pageNo < totalPageNo
      ) {
        setPageNo((prev) => prev + 1);
      }

      // Show scroll-to-top button
      if (window.scrollY > 400) setShowScrollTop(true);
      else setShowScrollTop(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, pageNo, totalPageNo]);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white transition-all duration-500 ease-in-out">
      <div className="container mx-auto px-4">
        <h3 className="capitalize text-center text-3xl lg:text-4xl font-bold mb-8 tracking-wide drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
          Popular <span className="text-red-500">{explore}</span> Shows
        </h3>

        <div
          className="
    grid 
    justify-center 
    gap-3 sm:gap-8 
    px-2 sm:px-8 
    w-full 
    max-w-[1700px] 
    mx-auto 
    transition-all duration-300
    grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
  ">
          {data.map((exploreData) => (
            <div
              key={exploreData.id + "exploreSection"}
              className="
        flex justify-center
        transform transition duration-500
        hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]
      ">
              <Card data={exploreData} media_type={explore} small />
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center my-8">
            <div className="w-10 h-10 border-4 border-gray-400 border-t-red-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="
      fixed 
      bottom-8 right-6          /* desktop position */
      sm:bottom-8 sm:right-6    /* small & up */
      bottom-20 right-4          /* mobile: appear higher */
      bg-red-600 hover:bg-red-700 
      text-white p-3 rounded-full 
      shadow-lg transition-transform 
      transform hover:scale-110 
      z-50
    "
          aria-label="Scroll to top">
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default ExplorePage;
