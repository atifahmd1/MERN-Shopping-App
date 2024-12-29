import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderCard = ({ product }) => {
  console.log(product);
  const handleClick = () => {};

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
          <p className="text-base text-gray-600">{product?.quantity}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-base text-gray-600">${product?.price}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
