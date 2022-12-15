import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async ({ pageCount, categoryId, searchValue, sort }) => {
    const order = sort.sort.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sort.replace('-', '')
    const { data } =
      await axios.get(`https://637a06387419b414df9821a1.mockapi.io/items?page=${pageCount}&limit=4&${categoryId
        ? `category=${categoryId}`
        : ''}&sortBy=${sortBy}&order=${order}&${searchValue
          ? `search=${searchValue}`
          : ''}`)

    return data
  }
)

const initialState = {
  pizzas: [],
  status: 'loading',//loading, success, error
}

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload
      state.pizzas = []
    }
  },
  extraReducers: {
    [fetchPizzas.pending](state) {
      state.status = 'loading'
    },

    [fetchPizzas.fulfilled](state, action) {
      state.pizzas = action.payload
      state.status = 'success'
    },
    [fetchPizzas.rejected](state) {
      state.status = 'error'
      state.pizzas = []
    },
  }
})

export const selectorPizzaSlice = (state) => state.pizzaSlice

export const { setPizzas } = pizzaSlice.actions
export default pizzaSlice.reducer