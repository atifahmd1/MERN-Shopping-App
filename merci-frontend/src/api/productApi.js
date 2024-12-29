import API from ".";

export const updateProductStockApi = async (id, stock) => {
  return API.patch(`/products/update/${id}`, { stock });
};

export const fetchAllProductsApi = async () => {
  return API.get("/products");
};

export const fetchProductByIdApi = async (id) => {
  return API.get(`/products/${id}`);
};

export const fetchProductsByCategoryApi = async (category) => {
  return API.get(`/products/category/${category}`);
};

export const fetchProductsFilterApi = async (filters) => {
  const queryParams = new URLSearchParams();

  filters.categories.forEach((cat) =>
    queryParams.append("categories", cat._id)
  );
  filters.brands.forEach((brand) => queryParams.append("brands", brand._id));
  filters.sizes.forEach((size) => queryParams.append("sizes", size._id));
  filters.ratings.forEach((rating) => queryParams.append("ratings", rating));
  queryParams.append("priceRange", filters.priceRange.join(","));
  queryParams.append("discountRange", filters.discountRange.join(","));
  queryParams.append("stockAvailability", filters.stockAvailability);

  const queryString = queryParams.toString();
  const url = `/products/filter?${queryString}`;
  console.log(`Fetching products with URL: ${url}`);

  return API.get(url);
};
