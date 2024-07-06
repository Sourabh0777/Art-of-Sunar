import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
interface cartState {
  value: number
}

// Define the initial state using that type
const initialState: cartState = {
  value: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

export const { updateCart } = cartSlice.actions

export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer