//src/api/seller/productApi.js
import API from "..";

export const addProductApi = async (product) => {
    return API.post("/products/add", product);
    };