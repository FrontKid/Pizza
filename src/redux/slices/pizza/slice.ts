//react
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//async
import { fetchPizzas } from './asyncActions'

//types
import { IPizzaSliceStates, Status, TPizzasSlice } from './types'

const initialState: IPizzaSliceStates = {
  pizzas: [],
  status: Status.LOADING,
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
      console.log('1');

    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload
      state.status = Status.SUCCESS
      console.log('2');

    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      console.log('3');
      console.log(action);

      if (action.payload) {
        state.status = Status.ERROR
        state.pizzas = []
      }
    })
  }
})


export const { setPizzas } = pizzaSlice.actions
export default pizzaSlice.reducer