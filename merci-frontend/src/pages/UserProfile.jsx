import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const UserProfile = () => {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const user = authState?.user;
  if (id !== user?._id) {
    return (
      <p className="text-red-500 text-center text-xl font-bold my-16">
        Unauthorized
      </p>
    );
  }
  const recentOrders = user?.orders?.slice(0, 3);
  const addresses = user?.address?.slice(0, 3);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Basic Details</h3>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <Link
          to="update"
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Edit Details
        </Link>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Recent Orders</h3>
        <ul>
          {recentOrders ? (
            recentOrders.map((order) => (
              <li
                key={order.id}
                className="mb-2 p-2 border border-gray-300 rounded"
              >
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </p>
              </li>
            ))
          ) : (
            <p>No recent orders found.</p>
          )}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Addresses</h3>
        <ul>
          {addresses ? (
            addresses.map((address, index) => (
              <li
                key={index}
                className="mb-2 p-2 border border-gray-300 rounded"
              >
                <p>
                  {address.street}, {address.city}, {address.state},{" "}
                  {address.zip}, {address.country}
                </p>
              </li>
            ))
          ) : (
            <p>No addresses found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
