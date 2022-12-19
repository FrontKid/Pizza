//react
import { createAsyncThunk } from "@reduxjs/toolkit"

//axios
import axios from "axios"

//types
import { TFetchPizza, TPizzasSlice } from "./types"

export const fetchPizzas = createAsyncThunk<TPizzasSlice[], TFetchPizza>(
  'pizzas/fetchPizzas',
  async ({ pageCount, categoryId, searchValue, sort }) => {

    const order = sort.sort.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sort.replace('-', '')
    const { data } =
      await axios.get<TPizzasSlice[]>(`https://637a06387419b414df9821a1.mockapi.io/items?page=${pageCount}&limit=4&${categoryId
        ? `category=${categoryId}`
        : ''}&sortBy=${sortBy}&order=${order}&${searchValue
          ? `search=${searchValue}`
          : ''}`)

    return data
  }
)