//react
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

//slices
import filterReducer from "./slices/filter/slice";
import searchSlice from "./slices/search/slice";
import cartSlice from "./slices/cart/slice";
import pizzaSlice from "./slices/pizza/slice";

export const store = configureStore({
  reducer: {
    filterReducer,
    searchSlice,
    cartSlice,
    pizzaSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch