import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./favouritesSlice.js";

export default configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
});
