import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import searchSlice from "./slices/searchSlice";
import cartSlice from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    filterReducer,
    searchSlice,
    cartSlice,
  },
})