// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartBtn";
import { fetchProductByIdApi } from "../api/productApi";

const ProductDetail = () => {
  console.log("in product detail page");
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  console.log(productId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchProductByIdApi(productId);
        console.log(response);
        if (response.status === 404) {
          navigate("/404");
        } else {
          console.log("response.data:", response.data);
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/404");
      }
    };

    fetchProduct();
  }, []);

  console.log("product:", product);

  return (
    <div className="container mx-auto p-4 mt-16">
      <div className="max-w-4xl mx-auto bg-white p-8 border border-gray-300 rounded">
        <h1 className="text-2xl font-bold mb-4">{product?.title}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-4">
            <img
              src={product?.thumbnail}
              alt={product?.title}
              className="w-full h-auto"
            />
            <div className="flex mt-4">
              {product?.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product?.title} ${index}`}
                  className="w-24 h-24 object-cover mr-2"
                />
              ))}
            </div>
          </div>
          <div className="md:w-1/2 md:ml-4">
            <p className="text-gray-700 mb-4">{product?.description}</p>
            <p className="text-xl font-bold mb-4">${product?.price}</p>
            <p className="text-gray-600 mb-4">Category: {product?.category}</p>
            <p className="text-gray-600 mb-4">Brand: {product?.brand}</p>
            <p className="text-gray-600 mb-4">SKU: {product?.sku}</p>
            <p className="text-gray-600 mb-4">Weight: {product?.weight}g</p>
            <p className="text-gray-600 mb-4">
              Dimensions: {product?.dimensions.width} x{" "}
              {product?.dimensions.height} x {product?.dimensions.depth} mm
            </p>
            <p className="text-gray-600 mb-4">
              Warranty: {product?.warrantyInformation}
            </p>
            <p className="text-gray-600 mb-4">
              Shipping: {product?.shippingInformation}
            </p>
            <p className="text-gray-600 mb-4">
              Availability: {product?.availabilityStatus}
            </p>
            <p className="text-gray-600 mb-4">
              Minimum Order Quantity: {product?.minimumOrderQuantity}
            </p>
            <AddToCartButton product={product} />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Reviews</h2>
          {product?.reviews?.map((review, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-200 rounded"
            >
              <p className="text-gray-700">
                <strong>{review.reviewerName}</strong> ({review.date})
              </p>
              <p className="text-gray-700">Rating: {review.rating}</p>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
