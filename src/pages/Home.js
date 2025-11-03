import React from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const trendingData = useSelector((state) => state.cinefyData.bannerData);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: upcomingData } = useFetch("/movie/upcoming"); // ✅ Added Upcoming
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: popularTvShowData } = useFetch("/tv/popular");
  const { data: OnTheAirData } = useFetch("/tv/on_the_air");

  return (
    <div>
      <BannerHome />

      <HorizontalScrollCard
        data={trendingData}
        heading="Trending"
        trending={true}
      />

      <HorizontalScrollCard
        data={nowPlayingData}
        heading="Now Playing"
        media_type="movie"
      />

      {/* ✅ New Upcoming Section */}
      <HorizontalScrollCard
        data={upcomingData}
        heading="Upcoming Movies"
        media_type="movie"
      />

      <HorizontalScrollCard
        data={topRatedData}
        heading="Top Rated Movies"
        media_type="movie"
      />

      <HorizontalScrollCard
        data={popularTvShowData}
        heading="Popular TV Shows"
        media_type="tv"
      />

      <HorizontalScrollCard
        data={OnTheAirData}
        heading="On The Air"
        media_type="tv"
      />
    </div>
  );
};

export default React.memo(Home);
