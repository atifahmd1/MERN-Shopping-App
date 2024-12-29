import API from ".";

export function addUser(user) {
  return API.post("/user/signup", user);
}

export function authenticateUser(user) {
  return API.post("/user/login", user);
}

export function fetchUser(token) {
  return API.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateUserDetails(id, updatedUser) {
  return API.put("/user/update", { id, updatedUser });
}

export function removeItem(id) {
  return API.delete(`/cart/${id}`);
}

export function updateItemQuantity(item) {
  return API.put(`/cart/${item.id}`, item);
}

export function clearCartApi() {
  return API.delete(`/cart`);
}
