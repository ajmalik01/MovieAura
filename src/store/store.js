import { configureStore } from "@reduxjs/toolkit";
import cinefyReducer from "./cinefySlice";
import favoritesReducer from "./favoritesSlice";
export const store = configureStore({
  reducer: {
    cinefyData: cinefyReducer,
    userLists: favoritesReducer,
  },
});
