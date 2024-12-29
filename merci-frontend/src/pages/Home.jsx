import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

const Home = () => {
  const products = useSelector((state) => state.products.products);

  // const status = useSelector((state) => state.products.status);

  // if (status == "loading") {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 py-10 mt-16">
      {products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
};

export default Home;
