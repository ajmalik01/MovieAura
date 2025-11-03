import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../store/cinefySlice";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaListUl,
  FaUserCog,
  FaSignOutAlt,
  FaTwitter,
  FaGoogle,
  FaFacebookF,
} from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.cinefyData.user);

  // ✅ Step 3.2 — Check for existing logged-in user (persistent auth)
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      dispatch(setUser(loggedInUser));
    }
  }, [dispatch]);

  // ✅ Login logic using localStorage users
  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      dispatch(setUser(foundUser));
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      navigate("/");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white px-4">
      {/* 🌈 Animated background */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-[length:400%_400%]"></div>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* ✅ If user logged in → Show Dashboard */}
      {user ? (
        <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
              {user.avatar || user.name[0].toUpperCase()}
            </div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-400 mb-6">{user.email}</p>

            <div className="space-y-3 w-full">
              <button
                onClick={() => navigate("/watchlist")}
                className="w-full bg-neutral-800 hover:bg-neutral-700 py-2 rounded-lg flex items-center justify-center gap-2">
                <FaListUl /> Watchlist
              </button>
              <button
                onClick={() => navigate("/favorites")}
                className="w-full bg-neutral-800 hover:bg-neutral-700 py-2 rounded-lg flex items-center justify-center gap-2">
                <FaHeart /> Favorites
              </button>
              <button className="w-full bg-neutral-800 hover:bg-neutral-700 py-2 rounded-lg flex items-center justify-center gap-2">
                <FaUserCog /> Account Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg flex items-center justify-center gap-2 transition">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        // ✅ If not logged in → Show login form
        <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
          <p className="text-center text-gray-300 mb-6">
            Login to continue to{" "}
            <span className="text-red-400 font-semibold">MovieAura</span>
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition">
              Login
            </button>
          </form>

          <div className="my-6 flex items-center justify-center w-full">
            <div className="flex-grow h-px bg-gray-500"></div>
            <span className="mx-3 text-gray-400 text-sm whitespace-nowrap">
              or continue with
            </span>
            <div className="flex-grow h-px bg-gray-500"></div>
          </div>

          {/* Social logins (placeholders for now) */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => alert("Google login coming soon")}
              className="bg-white text-black p-4 rounded-full hover:scale-110 transition">
              <FaGoogle size={20} />
            </button>
            <button
              onClick={() => alert("Facebook login coming soon")}
              className="bg-blue-600 p-4 rounded-full hover:scale-110 transition">
              <FaFacebookF size={20} />
            </button>
            <button className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 transition">
              <FaTwitter className="text-2xl text-sky-400" />
            </button>
          </div>

          <p className="text-center text-sm mt-6 text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-red-400 cursor-pointer hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      )}

      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            animation: gradient 10s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
