import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(
    decodeURIComponent(location?.search?.slice(3) || "")
  );

  const [isLoading, setIsLoading] = useState(false); // for first load
  const [isFetchingMore, setIsFetchingMore] = useState(false); // for infinite scroll

  // 🔍 Fetch Data
  const fetchData = async () => {
    if (!query.trim()) return;

    try {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsFetchingMore(true);
      }

      const response = await axios.get(`/search/multi`, {
        params: { query, page },
      });

      setData((prev) =>
        page === 1
          ? response.data.results || []
          : [...prev, ...response.data.results]
      );
    } catch (error) {
      console.log("error", error);
    } finally {
      // Small delay prevents layout flickering
      setTimeout(() => {
        setIsLoading(false);
        setIsFetchingMore(false);
      }, 150);
    }
  };

  // 🧠 Debounced search trigger when typing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        navigate(`/search?q=${encodeURIComponent(query)}`, { replace: true });
      } else {
        setData([]);
      }
    }, 600); // wait 600ms after typing stops

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // 🔄 Fetch new data when query changes
  useEffect(() => {
    if (query.trim()) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [query]);

  // 🌐 Infinite scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 📜 Fetch on page increment (infinite scroll)
  useEffect(() => {
    if (page > 1) fetchData();
  }, [page]);

  // ✨ Autofocus on input
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <div className="container mx-auto px-4">
        {/* 🔍 Search Bar */}
        <div className="sticky top-[72px] z-40 bg-black/70 backdrop-blur-md py-2 px-3 rounded-b-2xl shadow-lg">
          <div className="flex items-center gap-2 bg-neutral-800 rounded-full px-4 py-2 border border-neutral-700 focus-within:ring-2 focus-within:ring-red-500 transition">
            <FaSearch className="text-gray-400 text-lg" />
            <input
              id="mainSearchInput"
              ref={inputRef}
              type="text"
              placeholder="Search for movies, shows..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent flex-1 outline-none text-sm text-gray-200 placeholder-gray-500"
            />
          </div>
        </div>

        {/* 🧠 Header */}
        <div className="text-center mt-10 mb-6">
          <h3 className="capitalize text-2xl font-semibold tracking-wide">
            Search Results
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            Showing results for{" "}
            <span className="text-red-400 font-medium">{query || "—"}</span>
          </p>
        </div>

        {/* 🎬 Results Grid */}
        <div className="min-h-[50vh]">
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
            {data.map((searchData) => (
              <div
                key={searchData.id + "SearchSection"}
                className="
        flex justify-center
        transform transition duration-500
        hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]
      ">
                <Card
                  data={searchData}
                  media_type={searchData.media_type}
                  small
                />
              </div>
            ))}
          </div>
        </div>

        {/* 🔄 Initial Loading Spinner */}
        {isLoading && page === 1 && (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-gray-500 border-t-red-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* ⬇️ Infinite Scroll Loading Spinner */}
        {isFetchingMore && page > 1 && (
          <div className="flex justify-center items-center py-8 opacity-80 transition-opacity duration-300">
            <div className="w-6 h-6 border-2 border-gray-600 border-t-red-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* 🚫 No Results */}
        {!isLoading && data.length === 0 && query.trim() !== "" && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
            <FaSearch className="text-4xl mb-3 opacity-60" />
            <p className="text-lg">No results found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
