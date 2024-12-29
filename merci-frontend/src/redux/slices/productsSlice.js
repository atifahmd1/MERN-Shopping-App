import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProductsApi,
  updateProductStockApi,
} from "../../api/productApi";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetchAllProductsApi();
  console.log(response.data);
  return response.data;
});
export const updateProductStock = createAsyncThunk(
  "products/update/stock",
  async ({ id, stock }) => {
    const response = await updateProductStockApi(id, stock);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  //   reducers: {
  //     increment: (state) => {
  //       state.value += 1;
  //     },
  //     decrement: (state) => {
  //       state.value -= 1;
  //     },
  //     incrementByAmount: (state, action) => {
  //       state.value += action.payload;
  //     },
  //   },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        const product = state.products.find(
          (product) => product.id === action.payload.id
        );
        if (product) {
          product.stock = action.payload.stock;
        }
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default productsSlice.reducer;
