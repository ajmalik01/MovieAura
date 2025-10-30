import { configureStore } from "@reduxjs/toolkit";
import cinefyReducer from "./cinefySlice";
export const store = configureStore({
  reducer: {
    cinefyData: cinefyReducer,
  },
});
