import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsFilterApi } from "../../api/productApi";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchFilteredProducts = createAsyncThunk(
  "products/filter",
  async (filters) => {
    const response = await fetchProductsFilterApi(filters);
    console.log(response);
    return response.data;
  }
);

export const filterSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchFilteredProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default filterSlice.reducer;
