import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../store/cinefySlice";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.cinefyData.user);

  const fileInputRef = useRef(null);

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  const showNotification = (message, type = "success") => {
    setShowToast({ show: true, message, type });
    setTimeout(
      () => setShowToast({ show: false, message: "", type: "" }),
      2500
    );
  };

  const handleProfileUpdate = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email
        ? { ...u, name: formData.name, avatar: formData.avatar }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedUser = {
      ...user,
      name: formData.name,
      avatar: formData.avatar,
    };

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    dispatch(setUser(updatedUser));

    showNotification("Profile updated successfully!");
    setEditing(false);
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      showNotification("Passwords do not match!", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.email === user.email);

    if (users[userIndex].password !== formData.oldPassword) {
      showNotification("Incorrect old password!", "error");
      return;
    }

    users[userIndex].password = formData.newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    showNotification("Password changed successfully!");
    setChangingPassword(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("loggedInUser");
      dispatch(setUser(null));
      navigate("/");
      showNotification("Logged out successfully!");
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.filter((u) => u.email !== user.email);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.removeItem("loggedInUser");
      dispatch(setUser(null));
      showNotification("Account deleted successfully!", "error");
      setTimeout(() => navigate("/signup"), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* ✅ Toast */}
      {showToast.show && (
        <div
          className={`fixed top-6 right-6 px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-semibold transition-all ${
            showToast.type === "success"
              ? "bg-teal-500 text-white"
              : "bg-red-500 text-white"
          }`}>
          {showToast.message}
        </div>
      )}

      {/* ✅ Card */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl w-full max-w-md text-center shadow-2xl shadow-teal-500/10">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6 relative">
          <div
            className="bg-gradient-to-tr from-teal-600 to-blue-600 w-24 h-24 flex items-center justify-center rounded-full text-4xl font-bold mb-4 shadow-lg overflow-hidden cursor-pointer relative"
            onClick={() => fileInputRef.current.click()}>
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              user?.name?.[0]?.toUpperCase() || "U"
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>
          <h1 className="text-3xl font-semibold">{formData.name}</h1>
          <p className="text-gray-400">{user.email}</p>
        </div>

        {/* ✅ Edit / Change Password */}
        {editing ? (
          <div className="space-y-3 mt-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={handleProfileUpdate}
              className="w-full bg-teal-600 hover:bg-teal-700 py-2 rounded-lg font-medium transition">
              Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="w-full bg-gray-700 hover:bg-gray-800 py-2 rounded-lg font-medium transition">
              Cancel
            </button>
          </div>
        ) : changingPassword ? (
          <div className="space-y-3 mt-4">
            <input
              type="password"
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={(e) =>
                setFormData({ ...formData, oldPassword: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handlePasswordChange}
              className="w-full bg-teal-600 hover:bg-teal-700 py-2 rounded-lg font-medium transition">
              Update Password
            </button>
            <button
              onClick={() => setChangingPassword(false)}
              className="w-full bg-gray-700 hover:bg-gray-800 py-2 rounded-lg font-medium transition">
              Cancel
            </button>
          </div>
        ) : (
          <div className="space-y-4 mt-8">
            <button
              onClick={() => setEditing(true)}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:opacity-90 py-2 rounded-lg font-medium transition shadow-md">
              Edit Profile
            </button>

            <button
              onClick={() => setChangingPassword(true)}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:opacity-90 py-2 rounded-lg font-medium transition shadow-md">
              Change Password
            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-gray-800 hover:bg-gray-900 py-2 rounded-lg font-medium transition">
              Logout
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-full bg-gradient-to-r from-red-600 to-pink-700 hover:opacity-90 py-2 rounded-lg font-medium transition shadow-md">
              Delete Account
            </button>

            <Link
              to="/"
              className="block w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg transition text-gray-300">
              ← Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
