import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import favReducer from "./slices/favoritesSlice";
import categoryProductsReducer from "./slices/categorieSlice";
import filterReducer from "./slices/filtersSlice";
import filterParameterReducer from "./slices/filterParameterSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    favorites: favReducer,
    categoryProducts: categoryProductsReducer,
    filteredProducts: filterReducer,
    filterParameter: filterParameterReducer,
  },
});

export default store;
