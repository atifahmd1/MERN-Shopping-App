// src/redux/slices/favoritesSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchFavoritesItemsApi,
  addItemToFavoritesApi,
  removeItemFromFavoritesApi,
  clearFavoritesApi,
} from "../../api/favoritesApi";
import { act } from "react";

const initialState = {
  items: [],
  status: "idle",
};

export const fetchFavoritesItems = createAsyncThunk(
  "favorites/fetchItems",
  async (token) => {
    const response = await fetchFavoritesItemsApi(token);
    console.log("fetchFav: ", response);
    return response.data;
  }
);

export const addItemToFavorites = createAsyncThunk(
  "favorites/addItem",
  async ({ id, token }) => {
    const response = await addItemToFavoritesApi(id, token);
    console.log("add fav: ", response);
    return response.data;
  }
);

export const removeFavoritesItem = createAsyncThunk(
  "favorites/removeItem",
  async ({ id, token }) => {
    const response = await removeItemFromFavoritesApi(id, token);
    console.log("remove fav: ", response);
    return response.data;
  }
);

export const clearFavorites = createAsyncThunk(
  "favorites/clear",
  async (token) => {
    const response = await clearFavoritesApi(token);
    console.log("clear fav: ", response);
    return response.data;
  }
);

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavoritesItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchFavoritesItems.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addItemToFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFavoritesItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearFavorites.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default favoritesSlice.reducer;
