import React, { useEffect } from "react";
import Navbar from "./components/user/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/slices/productsSlice";
import { fetchCartItems } from "./redux/slices/cartSlice";
import CategoryProducts from "./pages/CategoryProducts";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import UserUpdate from "./pages/UserUpdate";
import Cart from "./pages/Cart";
import { Favorites } from "./pages/Favorites";
import { fetchFavoritesItems } from "./redux/slices/favoritesSlice";
import {
  fetchBrandsName,
  fetchCategoryList,
  fetchSizeList,
} from "./redux/slices/filterParameterSlice";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
// import ProductPage from "./pages/ProductPage";
// import AddProduct from "./pages/AddProduct";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchFavoritesItems(token));
    dispatch(fetchCartItems(token));
    dispatch(fetchCategoryList());
    dispatch(fetchBrandsName());
    dispatch(fetchSizeList());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/products/filter/:category"
          element={<CategoryProducts />}
        />
        {/* <Route path="/products/:category" element={<CategoryProducts />} /> */}
        {/* <Route path="/products/add" element={<AddProduct />} /> */}
        {/* <Route path="/products/page" element={<ProductPage />} /> */}
        <Route path="/product/:productId" element={<ProductDetail />} />
        {/* <Route path="/buy/:productId" element={<PrivateRoute />}>
          <Route path="/buy/:productId" element={<Cart />} />
        </Route> */}
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route element={<PrivateRoute />}>
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/user/:userId/update" element={<UserUpdate />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
