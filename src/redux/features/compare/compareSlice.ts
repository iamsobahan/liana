import { ICompareItem } from '@/types/compare';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface CompareState {
  data: ICompareItem[];
}

const initialCart =
  typeof window !== 'undefined' ? localStorage.getItem('compare') : null;
const initialState: CompareState = {
  data: initialCart ? JSON.parse(initialCart) : [],
};

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    // Add to cart
    addToCompare: (state, action: PayloadAction<ICompareItem>) => {
      const newItem = action.payload;
      const existingItem = state.data.find(
        (item) => item.product_id === newItem.product_id
      );

      if (existingItem) {
        state.data = state.data;
      } else {
        state.data = [...state.data, newItem];
        toast.success('Item added to your compare list!');
      }
      localStorage.setItem('compare', JSON.stringify(state.data));
    },

    // Remove cart item
    removeFromCompare: (state, action: PayloadAction<ICompareItem>) => {
      state.data = state.data.filter(
        (i) => i.product_id !== action.payload.product_id
      );
      localStorage.setItem('compare', JSON.stringify(state.data));
    },

    // clear cart
    clearCompare: (state) => {
      state.data = [];
      localStorage.removeItem('compare');
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  compareSlice.actions;
export default compareSlice.reducer;
