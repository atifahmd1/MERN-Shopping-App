import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const FilterProducts = () => {
  const filteredProducts = useSelector((state) => state.FilterProducts.items);
  return (
    <div className="mt-16">
      <div>Filtered Products</div>
      {filteredProducts.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

export default FilterProducts;
