import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/cinefySlice";
import { useNavigate, Link } from "react-router-dom";
import {
  FaGoogle,
  FaFacebookF,
  FaTwitter,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.cinefyData.user);

  // ✅ Redirect if already logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      dispatch(setUser(loggedInUser));
      navigate("/"); // redirect to home if already logged in
    }
  }, [dispatch, navigate]);

  // ✅ Handle signup
  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    if (users.find((u) => u.email === email)) {
      setError("Email already registered. Please log in instead.");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      avatar: name[0].toUpperCase(),
    };

    // Save new user
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please log in.");
    navigate("/login"); // ✅ Navigate directly after alert
  };

  const handleSocialSignup = (provider) => {
    alert(`Sign up with ${provider} (coming soon)`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white px-4">
      {/* 🌈 Animated gradient background */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-[length:400%_400%] pointer-events-none"></div>
      <div className="absolute inset-0 bg-black bg-opacity-70 pointer-events-none"></div>

      {/* 🧊 Frosted Signup Card */}
      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl w-full max-w-md shadow-2xl z-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
        <p className="text-center text-gray-300 mb-6">
          Sign up to continue to{" "}
          <span className="text-red-400 font-semibold">MovieAura</span>
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-2.5 cursor-pointer text-gray-300 hover:text-white">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition">
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="px-3 text-neutral-300 text-sm">or sign up with</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* 🌐 Social Sign-Up */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleSocialSignup("Google")}
            className="bg-white text-black p-4 rounded-full hover:scale-110 transition">
            <FaGoogle size={20} />
          </button>
          <button
            onClick={() => handleSocialSignup("Facebook")}
            className="bg-blue-600 p-4 rounded-full hover:scale-110 transition">
            <FaFacebookF size={20} />
          </button>
          <button
            onClick={() => handleSocialSignup("Twitter")}
            className="p-4 rounded-full bg-neutral-800 hover:bg-neutral-700 transition">
            <FaTwitter className="text-2xl text-sky-400" />
          </button>
        </div>

        <p className="text-center text-sm mt-6 text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-400 cursor-pointer hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* ✨ Background Animation Keyframes */}
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

export default Signup;
