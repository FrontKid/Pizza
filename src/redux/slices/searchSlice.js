import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
}

export const searchSlice = createSlice({
  name: 'search state',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      console.log(action.payload);

      state.searchValue = action.payload
    }
  }
})

export const { setSearchValue } = searchSlice.actions
export default searchSlice.reducer