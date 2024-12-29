// src/api/favoritesApi.js

import API from ".";

export function fetchFavoritesItemsApi(token) {
  return API.get("/user/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function addItemToFavoritesApi(productId, token) {
  return API.post(
    "/user/favorites",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function removeItemFromFavoritesApi(id, token) {
  return API.delete(`/user/favorites/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function clearFavoritesApi(token) {
  return API.delete("/user/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
