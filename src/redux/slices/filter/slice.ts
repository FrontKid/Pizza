//react
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//types
import { IFilterSliceStates, TSortFilter } from './types'



const initialState: IFilterSliceStates = {
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSortType(state, action: PayloadAction<TSortFilter>) {

      state.sort = action.payload
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload
    },
    setFilters(state, action: PayloadAction<IFilterSliceStates>) {

      if (Object.keys(action.payload).length) {
        state.categoryId = Number(action.payload.categoryId)
        state.pageCount = Number(action.payload.pageCount)

        state.sort = action.payload.sort
      } else {
        state.pageCount = 1
        state.categoryId = 0
      }
    }
  }
})


export const { setCategoryId, setSortType, setPageCount, setFilters } = filterSlice.actions
export default filterSlice.reducer