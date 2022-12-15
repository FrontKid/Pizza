import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store';

export type TCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string,
  size: number,
  count: number,
}

interface ICartSliceStates {
  totalPrice: number;
  items: TCartItem[]
}

const initialState: ICartSliceStates = {
  totalPrice: 0,
  items: [],
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

      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0)
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
    }
  }
})

export const selectCart = (state: RootState) => state.cartSlice
export const selectCartItemById = (id: string) =>
  (state: RootState) => state.cartSlice.items.find((obj) => obj.id === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions
export default cartSlice.reducer



