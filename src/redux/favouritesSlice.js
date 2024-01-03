import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
    updateFavourites: (state, action) => {
      const isFavourite = state.findIndex((movie) => movie === action.payload);
      if (isFavourite !== -1) {
        console.log("Found favourite");
        return state.filter((movie) => movie !== action.payload);
      } else {
        console.log("Not found. Adding");
        console.log(action.payload);
        state.push(action.payload);
      }
    },
  },
});

export const { updateFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
