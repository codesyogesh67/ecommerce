import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    filteredData: [],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload;
    },
    updateFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
  },
});

export const selectData = (state) => state.product.products;
export const selectFilteredData = (state) => state.product.filteredData;
export const { loadProducts, updateFilteredData } = productSlice.actions;

export default productSlice.reducer;
