import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
  imageURL: "",
  user: null, // ✅ added user state
};

export const cinefySlice = createSlice({
  name: "cinefy",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    },
    // ✅ Add user management reducers
    setUser: (state, action) => {
      state.user = action.payload; // Save logged-in user data
    },
    clearUser: (state) => {
      state.user = null;
    },
    logoutUser: (state) => {
      state.user = null; // Clear user on logout
    },
  },
});

export const { setBannerData, setImageURL, setUser, clearUser, logoutUser } =
  cinefySlice.actions;

export default cinefySlice.reducer;
