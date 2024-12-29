import React, { useState, useEffect, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/slices/cartSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  addItemToFavorites,
  removeFavoritesItem,
} from "../redux/slices/favoritesSlice";
import { updateProductStock } from "../redux/slices/productsSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const favoriteItems = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);

  const [inStock, setInStock] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    setInStock(product.stock >= product.minimumOrderQuantity);
    setInCart(cartItems.some((item) => item.product._id === product._id));
    setInFavorites(favoriteItems.some((item) => item._id === product._id));
  }, [cartItems, favoriteItems, product._id]);

  const handleAddToCart = () => {
    if (inCart) {
      navigate("/cart");
    } else {
      const quantity = product.minimumOrderQuantity || 1;
      setInCart(true);
      dispatch(addItemToCart({ token, id: product._id, quantity }));
      dispatch(
        updateProductStock({ id: product._id, stock: product.stock - quantity })
      );
    }
  };

  const handleAddToFavorites = (e) => {
    e.stopPropagation();
    if (inFavorites) {
      setInFavorites(false);
      dispatch(removeFavoritesItem({ id: product._id, token }));
    } else {
      console.log("pId: ", product._id);
      setInFavorites(true);
      dispatch(addItemToFavorites({ id: product._id, token }));
    }
  };

  const MRP = useMemo(() => {
    return (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  }, [product.price, product.discountPercentage]);

  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
      <div onClick={() => navigate(`/product/${product._id}`)}>
        <img
          className="w-full h-48 object-cover"
          src={product.thumbnail}
          alt={product.title}
        />
        <button
          onClick={handleAddToFavorites}
          className="absolute top-2 right-2 text-red-500 hover:scale-125 transition duration-300 ease-in-out"
        >
          {inFavorites ? (
            <AiFillHeart size={30} />
          ) : (
            <AiOutlineHeart size={30} />
          )}
        </button>
        <div className="px-4 py-2">
          <div className="font-bold text-xl mb-2">{product.title}</div>
          <p className="text-gray-700 text-base">{product.description}</p>
        </div>
      </div>
      <div className="px-4 pt-2 pb-4 flex justify-between items-center">
        {/* price tag */}
        <div className="flex items-baseline space-x-2 relative">
          <span className="text-black text-xl font-bold">${product.price}</span>
          <div className="absolute top-5 left-[-16px] min-w-max flex items-center space-x-2">
            <span className=" text-gray-500 line-through text-sm">${MRP}</span>
            <span className="text-green-500 text-sm font-bold">
              {product.discountPercentage}% off
            </span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className={`text-white font-bold py-2 px-2 rounded  ${
            inCart
              ? "bg-green-500 hover:bg-green-700"
              : inStock
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-500"
          }`}
          disabled={!inStock}
        >
          {inCart ? "Go to Cart" : inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
