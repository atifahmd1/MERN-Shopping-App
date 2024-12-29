import API from ".";

export function fetchCartItemsApi(token) {
  return API.get("/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function addItemToCartApi(token, id, quantity) {
  return API.post(
    "/user/cart",
    { id, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function removeItemFromCartApi(token, id) {
  return API.delete(`/user/cart/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateItemQuantityInCartApi(token, id, quantity) {
  return API.patch(
    `/user/cart/${id}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function clearCartApi(token) {
  return API.delete("/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function checkoutApi(token, orderData) {
  return API.post("/user/order/checkout", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function verifyPaymentApi(
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature
) {
  return API.post("/user/order/verifypayment", {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });
}
