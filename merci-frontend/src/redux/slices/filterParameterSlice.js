import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBrandsApi,
  fetchCategoriesApi,
  fetchSizesApi,
} from "../../api/filterParameterApi";

const initialState = {
  categories: [],
  brands: [],
  sizes: [],
  status: "idle",
};

export const fetchCategoryList = createAsyncThunk(
  "products/fetchCategoryList",
  async () => {
    const response = await fetchCategoriesApi();
    console.log(response.data);
    return response.data;
  }
);

export const fetchBrandsName = createAsyncThunk(
  "products/fetchBrandsName",
  async () => {
    const response = await fetchBrandsApi();
    console.log(response.data);
    return response.data;
  }
);

export const fetchSizeList = createAsyncThunk(
  "products/fetchSizeList",
  async () => {
    const response = await fetchSizesApi();
    console.log(response.data);
    return response.data;
  }
);

export const parametersSlice = createSlice({
  name: "filterParameters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryList.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchCategoryList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchBrandsName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsName.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchBrandsName.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSizeList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSizeList.fulfilled, (state, action) => {
        state.status = "idle";
        state.sizes = action.payload;
      })
      .addCase(fetchSizeList.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default parametersSlice.reducer;
