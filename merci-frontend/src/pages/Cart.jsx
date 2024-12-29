import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartCard from "../components/CartCard";
import { clearCart, removeCartItem } from "../redux/slices/cartSlice";
import { updateProductStock } from "../redux/slices/productsSlice";
import { useNavigate } from "react-router-dom";
import { checkoutApi, verifyPaymentApi } from "../api/cartApi";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.products);

  console.log(cartItems);
  const token = localStorage.getItem("token");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    cartItems.forEach((item) => {
      const product = products.find((p) => p._id === item.product._id);
      const newStock = product.stock + item.quantity;
      dispatch(updateProductStock({ id: product._id, stock: newStock }));
      // dispatch(removeCartItem({ token, id: item.product._id }));
    });
    dispatch(clearCart(token));
  };

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error(`Failed to load script ${src}`));
      document.body.appendChild(script);
    });
  };

  // const handleCheckout = async () => {
  //   try {
  //     const response = await checkoutApi(token, subtotal);
  //     if (!response.data) {
  //       alert("Error in getting order details");
  //       return;
  //     }
  //     console.log(response);

  //     const order = response.data?.order;

  //     const options = {
  //       key: "rzp_test_N3Exm12wTgrctB",
  //       name: "Merci",
  //       description: "Test Transaction",
  //       order_id: order?.id,
  //       amount: order?.amount,
  //       currency: order?.currency,
  //       handler: function (res) {
  //         console.log("Payment successful", res);
  //         const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
  //           res;
  //         verifyPaymentApi(
  //           razorpay_order_id,
  //           razorpay_payment_id,
  //           razorpay_signature
  //         )
  //           .then((res) => {
  //             console.log("Verification response:", res.data);
  //             alert("Payment verified successfully");

  //           })
  //           .catch((err) => {
  //             console.error("Verification error:", err);
  //           });
  //       },
  //       prefill: {
  //         name: "John Doe",
  //         email: "john.doe@example.com",
  //         contact: "9999999999",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };

  //     if (window.Razorpay) {
  //       const paymentObject = new window.Razorpay(options);

  //       paymentObject.on("payment.failed", function (response) {
  //         console.error("Payment failed", response.error);
  //       });

  //       paymentObject.open();
  //     } else {
  //       alert("Razorpay SDK is not loaded.");
  //     }
  //   } catch (error) {
  //     alert("Error during checkout: " + error.message);
  //   }
  // };

  const handleCheckout = async () => {
    try {
      const orderData = {
        products: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        total_amount: subtotal,
        address: "123 Main St, City, Country", // Replace with actual user address
        payment_method: "Razorpay", // Or whichever method the user selects
      };

      // Create order in the backend
      const createOrderResponse = await checkoutApi(token, orderData);

      if (!createOrderResponse.data) {
        alert("Error in creating order");
        return;
      }

      const order = createOrderResponse.data?.order;

      const options = {
        key: "rzp_test_N3Exm12wTgrctB", // Replace with your Razorpay Key ID
        name: "Merci",
        description: "Test Transaction",
        order_id: order.razorpay_order_id, // Pass the Razorpay order ID from backend
        amount: order.total_amount * 100, // Razorpay expects amount in paisa
        currency: "INR",
        handler: async function (res) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            res;

          try {
            // Verify payment and update the order in the backend
            const verifyResponse = await verifyPaymentApi(
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature
            );
            console.log("verif:", verifyResponse);

            if (verifyResponse.data?.success) {
              alert("Payment verified and order placed successfully");
              navigate("/orders");
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Error in payment verification");
          }
        },
        prefill: {
          name: "John Doe", // Replace with actual user details
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert("Error during checkout: " + error.message);
    }
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js")
      .then(() => {
        console.log("Razorpay script loaded successfully");
      })
      .catch((error) => {
        console.error("Razorpay script failed to load", error);
        alert(
          "Failed to load Razorpay SDK. Please check your network connection."
        );
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold m-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="flex justify-center item-center ">
          <div>
            <p className="text-center text-4xl text-gray-500">
              Your cart is empty.
            </p>
            <button
              onClick={() => navigate("/")}
              className="btn btn-primary mx-24"
            >
              Go & Shop
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col space-y-4 w-2/3 m-auto">
            {cartItems.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-4 p-4 border-t border-gray-300">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Subtotal</h2>
              <p className="text-xl font-semibold">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleCheckout}
              >
                Go to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
