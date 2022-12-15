import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { TSortFilter } from './filterSlice'

export type TFetchPizza = {
  pageCount: number;
  categoryId: number;
  sort: TSortFilter;
  searchValue: string;
  sortProperty: string;
}

export type TPizzasSlice = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number
}

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

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}



interface IPizzaSliceStates {
  pizzas: TPizzasSlice[];
  status: Status;
}

const initialState: IPizzaSliceStates = {
  pizzas: [],
  status: Status.LOADING, //loading, success, error
}

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<TPizzasSlice[]>) {
      state.pizzas = action.payload
      state.pizzas = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.pizzas = []
    })
  }
})

export const selectorPizzaSlice = (state: RootState) => state.pizzaSlice

export const { setPizzas } = pizzaSlice.actions
export default pizzaSlice.reducer