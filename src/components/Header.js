import React, { useEffect, useState, useRef } from "react";
import logo_1 from "../assets/logo_6.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import user_3 from "../assets/user_3.png";
import { GoSearch } from "react-icons/go";
import { navigation } from "../contants/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/cinefySlice";
import { FaListUl, FaHeart, FaUserCog, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join("");
  const [searchInput, setSearchInput] = useState(removeSpace);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.cinefyData.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [navigate, searchInput]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    if (window.innerWidth >= 1024) {
      navigate("/search");
      setTimeout(() => {
        const searchBox = document.querySelector("#mainSearchInput");
        if (searchBox) searchBox.focus();
      }, 400);
    }
  };

  const handleLogout = () => {
    // <-- MODIFICATION: clear localStorage session as well
    localStorage.removeItem("loggedInUser");
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        {/* Logo */}
        <Link to={"/"}>
          <img src={logo_1} alt="Logo" width={120} />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav, index) => (
            <NavLink
              key={index}
              to={nav.href}
              className={({ isActive }) =>
                `px-2 hover:text-neutral-100 ${isActive && "text-neutral-100"}`
              }>
              {nav.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-5 relative" ref={menuRef}>
          {/* Search Button */}
          <button
            className="hidden md:block text-2xl text-white"
            onClick={handleSearchClick}>
            <GoSearch />
          </button>

          {/* User Avatar */}
          {user ? (
            <div className="relative">
              <div
                className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center cursor-pointer active:scale-90 font-semibold"
                onClick={() => setMenuOpen(!menuOpen)}>
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Dropdown menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg py-3 z-50">
                  {/* ✅ User Info */}
                  {user ? (
                    <div className="px-4 pb-2 border-b border-neutral-700 mb-2">
                      <p className="text-white font-semibold truncate">
                        {user.name || "User"}
                      </p>
                      <p className="text-neutral-400 text-sm truncate">
                        {user.email || "example@email.com"}
                      </p>
                    </div>
                  ) : (
                    <div className="px-4 pb-2 border-b border-neutral-700 mb-2">
                      <p className="text-neutral-400 text-sm">Not logged in</p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      navigate("/my-list");
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-neutral-800 flex items-center gap-2">
                    <FaHeart /> My List
                  </button>
                  <hr className="border-neutral-700 my-2" />

                  <button
                    onClick={() => {
                      navigate("/account");
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-neutral-800 flex items-center gap-2">
                    <FaUserCog /> Account Settings
                  </button>

                  <hr className="border-neutral-700 my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-400 hover:bg-neutral-800 flex items-center gap-2">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={() => navigate("/login")}
              className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-90 transition-all">
              <img
                src={user_3}
                className="w-full h-full object-cover"
                alt="user"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
