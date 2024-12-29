import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItem,
  updateCartItemQuantity,
} from "../redux/slices/cartSlice";
import { updateProductStock } from "../redux/slices/productsSlice";

const CartCard = ({ item }) => {
  const dispatch = useDispatch();

  console.log(item.product);
  const [quantity, setQuantity] = useState(item.quantity);

  const products = useSelector((state) => state.products.products);
  const product = products.find((product) => product._id === item.product._id);

  console.log(product);

  const [stock, setStock] = useState(product.stock);

  const token = localStorage.getItem("token");

  const handleClick = (change) => {
    const newQuantity = quantity + change * product.minimumOrderQuantity;
    const newStock = stock - change * product.minimumOrderQuantity;

    if (newQuantity <= 0) {
      dispatch(removeCartItem(item));
      setStock(newStock);
      dispatch(updateProductStock({ id: product._id, stock: newStock }));
    } else {
      if (newStock < 0) {
        alert("Out of stock");
        return;
      }
      setQuantity(newQuantity);
      setStock(newStock);
      dispatch(
        updateCartItemQuantity({
          token,
          id: item.product._id,
          quantity: newQuantity,
        })
      );
      dispatch(updateProductStock({ id: product._id, stock: newStock }));
    }
  };

  const handleRemoveCartItem = () => {
    dispatch(
      updateProductStock({
        id: product._id,
        stock: product.stock + item.quantity,
      })
    );
    console.log(item.product._id);
    dispatch(removeCartItem({ token, id: item.product._id }));
  };

  return (
    <div className="flex items-center p-4 my-2 border border-gray-300 rounded-lg bg-white shadow-sm">
      <img
        className="w-20 h-20 object-cover rounded-lg mr-4"
        src={product?.thumbnail}
        alt={product?.title}
      />
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold">{product?.title}</p>
          <p className="text-base text-gray-600">@${product?.price}</p>
        </div>
        <div className="flex items-center mb-2">
          <p className="mr-2">Quantity</p>
          <div className="flex items-center">
            <button
              className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-lg"
              onClick={() => handleClick(-1)}
            >
              -
            </button>
            <input
              type="text"
              name="quantity"
              value={quantity}
              className="w-10 text-center border border-gray-300 rounded-md mx-2 text-lg"
              disabled
            />
            <button
              className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-lg"
              onClick={() => handleClick(1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-base text-gray-600">
            ${(product?.price * quantity).toFixed(2)}
          </p>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            onClick={handleRemoveCartItem}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
