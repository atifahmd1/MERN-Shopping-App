//src/api/seller/productApi.js
import API from "..";

export const addProductApi = async (product) => {
    const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authorization token not found");
  }
    return API.post("/products/add", product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    };

export const fetchProductApi = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization token not found");
    }
    return API.get(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });
  };

export const updateProductApi = async (id, product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization token not found");
    }
    return API.patch(`/products/update/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });
  };

export const deleteProductApi = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization token not found");
    }
    return API.delete(`/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });
  };

// Search for categories by query
export const searchCategoryApi = async (query) => {
    console.log(query);
    const response = await API.get(`/categories/search?query=${query}`);
    return response.data;
  };
  
  // Add a new category
  export const addCategoryApi = async (name) => {
    const response = await API.post("/categories/add", { name });
    return response.data;
  };