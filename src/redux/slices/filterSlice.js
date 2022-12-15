import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  pageCount: 1,
  sort: {
    name: 'популярности',
    sort: 'rating',
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSortType(state, action) {
      state.sort = action.payload
    },
    setPageCount(state, action) {
      state.pageCount = action.payload
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId)
      state.pageCount = Number(action.payload.pageCount)

      state.sort = action.payload.sort
    }
  }
})

export const filterSliceSelector = (state) => state.filterReducer

export const { setCategoryId, setSortType, setPageCount, setFilters } = filterSlice.actions
export default filterSlice.reducer