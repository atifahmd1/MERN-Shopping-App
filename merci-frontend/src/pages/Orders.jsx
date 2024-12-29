import React from "react";
import OrderCard from "../components/OrderCard";

const Orders = () => {
  const orders = [
    {
      id: 1,
      title: "Product 1",
      price: 10,
      thumbnail: "https://via.placeholder.com/150",
      quantity: 2,
      date: "2022-01-01",
    },
    {
      id: 2,
      title: "Product 2",
      price: 20,
      thumbnail: "https://via.placeholder.com/150",
      quantity: 1,
      date: "2022-01-02",
    },
    {
      id: 3,
      title: "Product 3",
      price: 30,
      thumbnail: "https://via.placeholder.com/150",
      quantity: 3,
      date: "2022-01-03",
    },
  ];
  return (
    <div className="flex items-center ">
      <div className="orders-list md:w-1/4 max-sm:w-full min-w-[300px] m-2">
        <h1>Orders</h1>
        {orders.map((order) => (
          <OrderCard key={order.id} product={order} />
        ))}
      </div>
      <div className="order-details max-sm:hidden">
        <h1>Order Details</h1>
      </div>
    </div>
  );
};

export default Orders;
