import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL, setUser } from "./store/cinefySlice";
import { useEffect, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.baseURL = "https://api.themoviedb.org/3";
    axios.defaults.params = { api_key: process.env.REACT_APP_TMDB_KEY };

    const fetchTrendingData = async () => {
      try {
        const response = await axios.get("/trending/all/week");
        dispatch(setBannerData(response.data.results));
      } catch (error) {
        console.error("Error fetching trending data:", error);
      }
    };

    const fetchConfiguration = async () => {
      try {
        const response = await axios.get("/configuration");
        dispatch(
          setImageURL(response.data.images.secure_base_url + "original")
        );
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      dispatch(setUser(loggedInUser));
    }

    fetchTrendingData();
    fetchConfiguration();

    // ⏳ Show loading screen for 3 seconds
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-red-600"></span>
          <h1 className="text-2xl font-bold tracking-wide">
            Loading <span className="text-red-500">Movie Aura</span>...
          </h1>
        </div>
        <p className="text-gray-400 text-sm animate-pulse">
          Fetching your cinematic experience 🎬
        </p>
      </div>
    );
  }

  return (
    <main className="pb-14 lg:pb-0">
      <ScrollToTop />
      <Header />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
