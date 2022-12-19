//react
import { createSlice } from '@reduxjs/toolkit'

//types
import { searchSliceStates } from './types'



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


export const { setSearchValue } = searchSlice.actions
export default searchSlice.reducer