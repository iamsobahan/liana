import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './product-service';
import { IProduct } from '@/types/product';

interface IState {
  products: IProduct[];
  totalCount: number;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | unknown;
  errorMessage: string | unknown;
}
const initialState: IState = {
  products: [],
  totalCount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  errorMessage: '',
};

// Get user products
export const getProducts = createAsyncThunk(
  'product/getAllProducts',
  async (filter: { [key: string]: number }, thunkAPI) => {
    try {
      return await productService.getAllProducts(filter);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.data.rows;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
