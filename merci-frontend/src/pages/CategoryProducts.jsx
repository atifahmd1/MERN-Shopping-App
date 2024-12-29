import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const CategoryProducts = () => {
  // const { category } = useParams();
  const products = useSelector((state) => state.categoryProducts.items);
  const categoryLoadingStatus = useSelector(
    (state) => state.categoryProducts.status
  );
  if (categoryLoadingStatus == "Loading") return <div>Loading...</div>;
  console.log(products);

  // const products = useSelector((state) => state.filteredProducts.items);
  // console.log(products);
  return (
    <div className=" relative mb-16">
      <h1 className=" absolute w-full top-0 z-10 flex justify-center text-3xl font-bold py-3 bg-gray-200">
        {/* {category} */}
        hello ji
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-4 py-10 mt-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
