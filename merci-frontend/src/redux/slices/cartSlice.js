import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCartItemsApi,
  addItemToCartApi,
  removeItemFromCartApi,
  updateItemQuantityInCartApi,
  clearCartApi,
} from "../../api/cartApi";

const initialState = {
  items: [],
  status: "idle",
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchItems",
  async (token) => {
    const response = await fetchCartItemsApi(token);
    return response.data;
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ token, id, quantity }) => {
    const response = await addItemToCartApi(token, id, quantity);
    return response.data;
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async ({ token, id }) => {
    const response = await removeItemFromCartApi(token, id);
    return response.data;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateItem/quantity",
  async ({ token, id, quantity }) => {
    const response = await updateItemQuantityInCartApi(token, id, quantity);
    return response.data;
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async (token) => {
  const response = await clearCartApi(token);
  console.log("clear cart: ", response);
  return response.data;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload.cart;
      })
      .addCase(clearCart.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default cartSlice.reducer;
