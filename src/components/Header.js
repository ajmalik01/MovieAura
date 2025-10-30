import React, { useEffect, useState } from "react";
import logo_1 from "../assets/logo_6.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import user_3 from "../assets/user_3.png";
import { GoSearch } from "react-icons/go";
import { navigation } from "../contants/navigation";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join("");
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [navigate, searchInput]);

  const handleSearchClick = () => {
    if (window.innerWidth >= 1024) {
      // For large screens — navigate to search page
      navigate("/search");
      // Delay to ensure page loads, then focus input
      setTimeout(() => {
        const searchBox = document.querySelector("#mainSearchInput");
        if (searchBox) searchBox.focus();
      }, 400);
    }
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
        <div className="ml-auto flex items-center gap-5">
          {/* Search Button */}
          <button
            className="hidden md:block text-2xl text-white"
            onClick={handleSearchClick}>
            <GoSearch />
          </button>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-90 transition-all">
            <img
              src={user_3}
              className="w-full h-full object-cover"
              alt="user"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
