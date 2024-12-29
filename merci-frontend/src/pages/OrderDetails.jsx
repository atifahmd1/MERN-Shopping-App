import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch order details from the backend
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleInvoiceDownload = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/orders/invoice/${orderId}`,
        {
          responseType: "arraybuffer", // Important to set the response type to blob
        }
      );

      console.log("response:", response);

      // Create a link element to download the PDF
      var url = window.URL || window.webkitURL;
      url = url.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      console.log(url);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${orderId}.pdf`); // File name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading the invoice:", error);
      alert("Failed to download the invoice.");
    }
  };

  const handleCancelOrder = () => {
    // Logic to cancel the order
    axios
      .put(`/api/orders/${orderId}/cancel`)
      .then((response) => {
        alert("Order canceled successfully");
        // You might want to redirect or update the UI after cancellation
      })
      .catch((error) => {
        console.error("Error canceling order:", error);
      });
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <div className="order-info">
        <img
          src={orderDetails.product?.thumbnail}
          alt={orderDetails.product?.title}
          className="product-thumbnail"
          onClick={() => handleProductClick(orderDetails.product?.id)}
        />
        <div className="order-meta">
          <h3>{orderDetails.product?.title}</h3>
          <p>Order ID: {orderDetails?.orderId}</p>
          <p>
            Order Date: {new Date(orderDetails?.orderDate).toLocaleDateString()}
          </p>
          <p>Price: ${orderDetails?.orderPrice}</p>
          <p>Address: {orderDetails?.orderAddress}</p>
          <p>Tracking Information: {orderDetails?.trackingInfo}</p>
        </div>
      </div>
      <button onClick={() => handleInvoiceDownload(orderId)}>
        Download Invoice
      </button>
      <button onClick={handleCancelOrder} className="cancel-order-btn">
        Cancel Order
      </button>
    </div>
  );
};

export default OrderDetails;
