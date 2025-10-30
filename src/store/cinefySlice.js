import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
  imageURL: "",
};
export const cinefySlice = createSlice({
  name: "cinefy",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageURL: (state, acton) => {
      state.imageURL = acton.payload;
    },
  },
});

export const { setBannerData, setImageURL } = cinefySlice.actions;

export default cinefySlice.reducer;
