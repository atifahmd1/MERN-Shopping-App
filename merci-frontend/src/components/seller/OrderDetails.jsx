import React from "react";

const OrderDetails = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex justify-center items-center shadow-md hover:shadow-lg transform hover:translate-y-1 active:translate-y-0 transition-all duration-200"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Order #{order.id}</h2>

        <div>
          <p className="mb-2">
            <strong>Customer:</strong> {order.user.name}
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {order.address}
          </p>
          <p className="mb-2">
            <strong>Total:</strong> ${order.total_amount}
          </p>
          <p className="mb-2">
            <strong>Paid:</strong> ${order.paid}
          </p>
          <p className="mb-2">
            <strong>Payment Method:</strong> {order.payment_method}
          </p>
          <p className="mb-2">
            <strong>Status:</strong> {order.status}
          </p>
          {order.rating && (
            <p className="mb-2">
              <strong>Rating:</strong> {order.rating} ★
            </p>
          )}
          {order.feedback && (
            <p className="mb-2">
              <strong>Feedback:</strong> {order.feedback}
            </p>
          )}
          {order.complaint && (
            <p className="text-red-500">
              <strong>Complaint:</strong> {order.complaint}
            </p>
          )}
          {order.delivery_status && (
            <p className="mb-2">
              <strong>Delivery Status:</strong> {order.delivery_status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
