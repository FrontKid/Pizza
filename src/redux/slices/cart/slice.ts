//react
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//utils
import { getCartFromLocalStorage } from '../../../utils/getCartFromLocalStorage';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';



//types
import { ICartSliceStates, TCartItem } from './types'


const { items, totalPrice } = getCartFromLocalStorage()
const initialState: ICartSliceStates = {
  items,
  totalPrice: totalPrice,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem && findItem.count > 1) {
        --findItem.count
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalPrice = 0
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },

  }
})



export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions
export default cartSlice.reducer
