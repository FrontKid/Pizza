import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

interface searchSliceStates {
  searchValue: string
}

const initialState: searchSliceStates = {
  searchValue: '',
}

export const searchSlice = createSlice({
  name: 'search state',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload
    }
  }
})

export const selectorSerachSlice = (state: RootState) => state.searchSlice

export const { setSearchValue } = searchSlice.actions
export default searchSlice.reducer