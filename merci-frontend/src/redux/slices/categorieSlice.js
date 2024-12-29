import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsByCategoryApi } from "../../api/productApi";

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category) => {
    const response = await fetchProductsByCategoryApi(category);
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "idle",
};

export const categoryProductsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default categoryProductsSlice.reducer;
