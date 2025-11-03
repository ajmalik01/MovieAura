import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { loadUserLists } from "../store/favoritesSlice";

const MyList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.cinefyData.user);
  const { favorites = [], watchlist = [] } = useSelector(
    (state) => state.userLists
  );

  useEffect(() => {
    if (user === undefined) return; // wait for auth state
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      dispatch(loadUserLists(user.email));
    }
  }, [user, navigate, dispatch]);

  if (!user) return null;

  const handleCardClick = (item) => {
    navigate(`/${item.media_type || "movie"}/${item.id}`);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* PAGE TITLE */}
        <h1 className="text-4xl font-extrabold mb-12 text-center text-red-500 tracking-wide">
          🎞️ My Collection
        </h1>

        {/* FAVORITES SECTION */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-white">❤️ Favorites</h2>
            <div className="h-[1px] bg-white/20 flex-grow ml-4"></div>
          </div>

          {favorites.length === 0 ? (
            <p className="text-gray-400 text-center text-lg">
              You haven’t added any favorites yet.
            </p>
          ) : (
            <div
              className="
                grid
                gap-8
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
                2xl:grid-cols-7
                place-items-center
                auto-rows-max
              ">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="
                    cursor-pointer 
                    transition-transform 
                    duration-300 
                    hover:scale-105 
                    hover:z-10
                    w-full
                    flex 
                    justify-center
                  ">
                  <Card data={item} media_type={item.media_type} small />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* WATCHLIST SECTION */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-white">🎬 Watchlist</h2>
            <div className="h-[1px] bg-white/20 flex-grow ml-4"></div>
          </div>

          {watchlist.length === 0 ? (
            <p className="text-gray-400 text-center text-lg">
              Your watchlist is empty. Add something to watch later!
            </p>
          ) : (
            <div
              className="
                grid
                gap-8
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
                2xl:grid-cols-7
                place-items-center
                auto-rows-max
              ">
              {watchlist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="
                    cursor-pointer 
                    transition-transform 
                    duration-300 
                    hover:scale-105 
                    hover:z-10
                    w-full
                    flex 
                    justify-center
                  ">
                  <Card data={item} media_type={item.media_type} small />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyList;
