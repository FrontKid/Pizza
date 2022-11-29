import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value++
    },
    decrement: (state) => {
      state.value = state.value - 1
    }
  }
})

export const { increment, decrement } = filterSlice.actions
export default filterSlice.reducer