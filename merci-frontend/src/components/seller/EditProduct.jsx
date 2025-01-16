import React, { useState, useEffect } from "react";
import { fetchProductApi, updateProductApi, searchCategoryApi } from "../../api/seller/productApi";
import useDebounce from "../../hooks/useDebounce";

const EditProduct = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [currentImg, setCurrentImg] = useState("");
  const [customFields, setCustomFields] = useState([]);
  const [error, setError] = useState("");
  const debouncedCategory = useDebounce(categoryInput, 500);

  useEffect(() => {
    const fetchCategories = async () => {
      if (debouncedCategory.trim()) {
        try {
          const currentCategory = debouncedCategory;
          const response = await searchCategoryApi(currentCategory);
          if (currentCategory === debouncedCategory) {
            setCategorySuggestions(response || []);
          }
        } catch (err) {
          console.error("Error fetching categories:", err);
        }
      } else {
        setCategorySuggestions([]);
      }
    };
    fetchCategories();
  }, [debouncedCategory]);

  const handleFetchProduct = async () => {
    try {
      const response = await fetchProductApi(productId);
      setProduct(response.data);
      setProduct((prev) => ({
        ...prev,
        category: prev?.category?.map((cat) => cat.name) || [],
        brand: prev?.brand?.name || "",
        size: prev?.size?.name || "",
        images: prev.images || [],
      }));
      console.log("fetched product", product);
      setCustomFields(
        Object.keys(response.data).reduce((acc, key) => {
          if (!["id", "title", "description", "thumbnail", "images", "price", "MRP","size", "brand", "category", "stock", "weight", "warrantyInformation", "returnPolicy", "minimumOrderQuantity", "_id", "reviews", "createdAt", "updatedAt", "__v"].includes(key)) {
            acc.push({ key, value: response.data[key] });
          }
          return acc;
        }
        , [])
      );
      setError("");
    } catch (err) {
      setProduct(null);
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = (value) => setCategoryInput(value);

  const handleAddCategory = () => {
    if (categoryInput.trim()) {
      setProduct({ ...product, category: [...product?.category, categoryInput] });
      setCategoryInput("");
    }
  };

  const handleAddSuggestedCategory = (category) => {
    setProduct({ ...product, category: [...product?.category, category] });
    setCategoryInput("");
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = product?.category?.filter((_, i) => i !== index);
    setProduct({ ...product, category: updatedCategories });
  };

  const handleAddImage = () => {
    if (currentImg.trim()) {
      setProduct({ ...product, images: [...product.images, currentImg] });
      setCurrentImg("");
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: updatedImages });
  };

  const handleAddCustomField = () => setCustomFields([...customFields, { key: "", value: "" }]);

  const handleCustomFieldChange = (index, field, value) => {
    setCustomFields((prev) =>
      prev.map((customField, i) => (i === index ? { ...customField, [field]: value } : customField))
    );
  };

  const handleRemoveCustomField = (index) => setCustomFields((prev) => prev.filter((_, i) => i !== index));

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    customFields.forEach((field) => {
      product[field.key] = field.value;
    });
    try {
      await updateProductApi(product?._id, product);
      alert("Product updated successfully!");
    } catch (err) {
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>

      <div className="mb-6">
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter Product ID"
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFetchProduct}
          className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Fetch Product
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {product && (
        <form
          onSubmit={handleSaveChanges}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 rounded-md shadow-md"
        >
          {["id", "title", "description", "thumbnail", "price", "MRP", "brand","size", "stock", "weight", "minimumOrderQuantity", "warrantyInformation", "returnPolicy"].map(
            (field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-2">{field.toUpperCase()}</label>
                <input
                  type="text"
                  name={field}
                  value={product[field] || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${field}`}
                />
              </div>
            )
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Categories</label>
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={categoryInput}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Type to search or add a category"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
              {categorySuggestions?.length > 0 && (
                <ul className="absolute top-10 max-h-4  z-10 w-full bg-white border border-gray-200 rounded-md mt-1">
                  {categorySuggestions?.map((category) => (
                    <li
                      key={category?._id}
                      onClick={() => handleAddSuggestedCategory(category?.name)}
                      className="p-2 bg-gray-100 hover:bg-gray-400 cursor-pointer"
                    >
                      {category?.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <ul className="flex flex-wrap gap-2 mt-2">
              {product?.category?.map((cat, index) => (
                <li key={index} className="bg-gray-200 px-2 py-1 rounded-md">
                  {cat}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(index)}
                    className="text-red-500 ml-2"
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Images</label>
            <input
              type="text"
              value={currentImg}
              onChange={(e) => setCurrentImg(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Image URL"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Image
            </button>
            <ul className="mt-4">
              {product?.images?.map((img, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span>{img}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-500"
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Custom Fields</label>
            <button
              type="button"
              onClick={handleAddCustomField}
              className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 mb-4"
            >
              Add Field
            </button>
            {customFields.map((field, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <input
                  type="text"
                  value={field.key}
                  onChange={(e) => handleCustomFieldChange(index, "key", e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Field Name"
                />
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => handleCustomFieldChange(index, "value", e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Field Value"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCustomField(index)}
                  className="text-red-500"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          <div className="md:col-span-2 lg:col-span-3 text-center">
            <button
              type="submit"
              className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProduct;



// import React, { useState } from 'react';
// import { fetchProductApi, updateProductApi } from '../../api/seller/productApi';

// // export const fetchProductApi = async (id) => {
// //   const token = localStorage.getItem("token");
// //   if (!token) {
// //     throw new Error("Authorization token not found");
// //   }
// //   return API.get("/products", {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //       });
// // };

// // export const updateProductApi = async (id, product) => {
// //   const token = localStorage.getItem("token");
// //   if (!token) {
// //     throw new Error("Authorization token not found");
// //   }
// //   return API.patch(`/products/${id}`, product, {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //       });
// // };

// const EditProduct = () => {
//   const [productId, setProductId] = useState('');
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState('');


//   const handleFetchProduct = async () => {
//     try {
//       const response = await fetchProductApi(productId);
//       console.log(response?.data);
//       setProduct(response.data);
//       setError('');
//     } catch (error) {
//       setProduct(null);
//       setError('Product not found!');
//     }
//   };

//   const handleInputChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleSaveChanges = () => {
//     updateProductApi(productId, product)
//       .then(() => {
//         alert('Product updated successfully');
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   };

//   return (
//     <div className="p-6 bg-gray-50">
//       <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

//       {/* Search Product by ID */}
//       <div className="mb-6">
//         <input
//           type="text"
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//           placeholder="Enter Product ID"
//           className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
//         />
//         <button
//           onClick={handleFetchProduct}
//           className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Search Product
//         </button>
//       </div>

//       {/* Show Error if Product Not Found */}
//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {/* Show Product Details for Editing */}

      
// {//update section
//   product && (
//     <div className="p-4 bg-white rounded-md shadow-md">
//       <h3 className="text-xl font-bold mb-4">Edit Product Details</h3>
      
//       {/* Editable fields */}
//       <div className="mb-4">
//         <label className="block mb-2 font-semibold">Title</label>
//         <input
//           type="text"
//           name="title"
//           value={product.title}
//           onChange={handleInputChange}
//           className="p-2 border border-gray-300 rounded-md w-full"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2 font-semibold">Description</label>
//         <textarea
//           name="description"
//           value={product.description}
//           onChange={handleInputChange}
//           className="p-2 border border-gray-300 rounded-md w-full"
//         ></textarea>
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2 font-semibold">Price</label>
//         <input
//           type="number"
//           name="price"
//           value={product.price}
//           onChange={handleInputChange}
//           className="p-2 border border-gray-300 rounded-md w-full"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2 font-semibold">Stock</label>
//         <input
//           type="number"
//           name="stock"
//           value={product.stock}
//           onChange={handleInputChange}
//           className="p-2 border border-gray-300 rounded-md w-full"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2 font-semibold">Thumbnail</label>
//         <input
//           type="text"
//           name="thumbnail"
//           value={product.thumbnail}
//           onChange={handleInputChange}
//           className="p-2 border border-gray-300 rounded-md w-full"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2 font-semibold">Brand</label>
//         <input
//           type="text"
//           name="brand"
//           value={product.brand?.name || ''}
//           onChange={(e) =>
//             setProduct({
//               ...product,
//               brand: { ...product.brand, name: e.target.value },
//             })
//           }
//           className="p-2 border border-gray-300 rounded-md w-full"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2 font-semibold">Weight</label>
//         <input
//           type="text"
//           name="weight"
//           value={product.weight}
//           onChange={handleInputChange}
//           className="p-2 border border-gray-300 rounded-md w-full"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2 font-semibold">Return Policy</label>
//         <textarea
//           name="returnPolicy"
//           value={product.returnPolicy}
//           onChange={handleInputChange}
//           className="p-2 border border-gray-300 rounded-md w-full"
//         ></textarea>
//       </div>

//       <div className="mb-4">
//         <label className="block mb-2 font-semibold">Categories</label>
//         {product.category.map((cat, index) => (
//           <input
//             key={index}
//             type="text"
//             value={cat.name}
//             onChange={(e) => {
//               const updatedCategories = [...product.category];
//               updatedCategories[index].name = e.target.value;
//               setProduct({ ...product, category: updatedCategories });
//             }}
//             className="p-2 border border-gray-300 rounded-md w-full mb-2"
//           />
//         ))}
//       </div>

//       <button
//         onClick={handleSaveChanges}
//         className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
//       >
//         Save Changes
//       </button>
//     </div>
//   )
// }


//     </div>
//   );
// };

// export default EditProduct;
