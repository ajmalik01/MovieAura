import { createSlice } from "@reduxjs/toolkit";

const getUserKey = (email, key) => `${email}_${key}`;

const userListsSlice = createSlice({
  name: "userLists",
  initialState: {
    favorites: [],
    watchlist: [],
  },
  reducers: {
    loadUserLists: (state, action) => {
      const email = action.payload;
      if (!email) return;

      const favorites =
        JSON.parse(localStorage.getItem(getUserKey(email, "favorites"))) || [];
      const watchlist =
        JSON.parse(localStorage.getItem(getUserKey(email, "watchlist"))) || [];

      state.favorites = favorites;
      state.watchlist = watchlist;

      localStorage.setItem(
        getUserKey(email, "favorites"),
        JSON.stringify(favorites)
      );
      localStorage.setItem(
        getUserKey(email, "watchlist"),
        JSON.stringify(watchlist)
      );
    },

    addFavorite: (state, action) => {
      const { userEmail, item } = action.payload || {};
      if (!userEmail || !item) return;

      // ✅ ensure media_type is saved correctly
      const finalItem = {
        ...item,
        media_type: item.media_type || "movie",
      };

      const exists = state.favorites.some((f) => f.id === finalItem.id);
      if (!exists) {
        state.favorites.push(finalItem);
        localStorage.setItem(
          getUserKey(userEmail, "favorites"),
          JSON.stringify(state.favorites)
        );
      }
    },

    removeFavorite: (state, action) => {
      const { userEmail, id } = action.payload || {};
      if (!userEmail) return;
      state.favorites = state.favorites.filter((f) => f.id !== id);
      localStorage.setItem(
        getUserKey(userEmail, "favorites"),
        JSON.stringify(state.favorites)
      );
    },

    addWatchlist: (state, action) => {
      const { userEmail, item } = action.payload || {};
      if (!userEmail || !item) return;

      // ✅ ensure media_type is saved correctly
      const finalItem = {
        ...item,
        media_type: item.media_type || "movie",
      };

      const exists = state.watchlist.some((w) => w.id === finalItem.id);
      if (!exists) {
        state.watchlist.push(finalItem);
        localStorage.setItem(
          getUserKey(userEmail, "watchlist"),
          JSON.stringify(state.watchlist)
        );
      }
    },

    removeWatchlist: (state, action) => {
      const { userEmail, id } = action.payload || {};
      if (!userEmail) return;
      state.watchlist = state.watchlist.filter((w) => w.id !== id);
      localStorage.setItem(
        getUserKey(userEmail, "watchlist"),
        JSON.stringify(state.watchlist)
      );
    },

    clearLists: (state) => {
      state.favorites = [];
      state.watchlist = [];
    },
  },
});

export const {
  loadUserLists,
  addFavorite,
  removeFavorite,
  addWatchlist,
  removeWatchlist,
  clearLists,
} = userListsSlice.actions;

export default userListsSlice.reducer;
