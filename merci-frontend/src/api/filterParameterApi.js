import API from ".";

export const fetchCategoriesApi = async () => {
  return API.get("/products/filter/categories");
};
export const fetchBrandsApi = async () => {
  return API.get("/products/filter/brands");
};
export const fetchSizesApi = async () => {
  return API.get("/products/filter/sizes");
};
