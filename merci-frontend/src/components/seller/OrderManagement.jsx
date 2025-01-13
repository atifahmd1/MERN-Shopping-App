import React, { useState, useEffect } from "react";
import OrderDetails from "./OrderDetails";
import { FaShoppingCart } from "react-icons/fa";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    // Fetch data from the public folder
    fetch("/orders.json")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error loading orders:", err));
  }, []);

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filtered and paginated orders
  const filteredOrders = orders.filter(
    (order) =>
      (filter === "All" || order.status === filter) &&
      (order.id.includes(searchQuery) ||
        order.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     <h1 className="flex items-center text-3xl font-bold text-gray-800 mb-6">
  <FaShoppingCart size={24} className="mr-2" />
  Order Management
</h1>

      

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <select
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg mb-2 md:mb-0"
        >
          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Order #{order.id}
              </h2>
              <p className="text-sm text-gray-500">
                <strong>Customer:</strong> {order.user.name}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Total:</strong> ${order.total_amount}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="mt-2">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-blue-500 underline"
                >
                  View Details
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {[...Array(Math.ceil(filteredOrders.length / ordersPerPage)).keys()].map(
          (num) => (
            <button
              key={num}
              onClick={() => paginate(num + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === num + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-600 hover:text-white`}
            >
              {num + 1}
            </button>
          )
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrderManagement;
