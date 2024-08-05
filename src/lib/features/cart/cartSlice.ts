import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define the Cart type

interface Cart {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define a type for the slice state
export interface cartState {
  cart: Cart[];
}

// Define the initial state using that type
const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] } as cartState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item: { id: any; }) => item.id === action.payload.id
      );
      if (itemInCart) {
        if (itemInCart.quantity !== undefined) {
          itemInCart.quantity++;
        }
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((item: { id: any; }) => item.id === action.payload.id);
      if (item && item.quantity !== undefined) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((item: { id: any; }) => item.id === action.payload.id);
      if (item && item.quantity !== undefined && item.quantity > 1) {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item: { id: any; }) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;

export default cartSlice.reducer