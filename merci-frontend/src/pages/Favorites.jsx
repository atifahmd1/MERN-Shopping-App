import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { clearFavorites } from "../redux/slices/favoritesSlice";
import { useNavigate } from "react-router-dom";

export const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.favorites.items);
  console.log("products: ", products);
  const token = localStorage.getItem("token");

  return (
    <div className="container my-12 mx-auto">
      <div className="flex justify-between items-center px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Favorites</h1>
        <button
          onClick={() => dispatch(clearFavorites(token))}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Favorites
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4 py-10 mt-16">
        {!(products.length === 0) ? (
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })
        ) : (
          <p>
            No Favorites{" "}
            <span
              onClick={() => navigate("/")}
              className="text-xl text-green-500 underline cursor-pointer"
            >
              Go to Home
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
