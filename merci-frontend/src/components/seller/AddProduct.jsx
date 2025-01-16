//components/seller/AddProduct.jsx
import React, { useState, useEffect } from "react";
import { addProductApi, searchCategoryApi } from "../../api/seller/productApi";
import useDebounce from "../../hooks/useDebounce";

const AddProduct = () => {
  const [product, setProduct] = useState({
    id: "",
    title: "",
    description: "",
    thumbnail: "",
    categories: [], // Will store the final category array
    price: "",
    MRP: "",
    stock: "",
    brand: "",
    weight: "",
    warrantyInformation: "",
    returnPolicy: "10 days return policy",
    minimumOrderQuantity: 1,
    size: "",
    images: [],
  });

  const [currentImg, setCurrentImg] = useState("");
  const [categoryInput, setCategoryInput] = useState(""); // For category input
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [customFields, setCustomFields] = useState([]); // To store custom fields
  const debouncedCategory = useDebounce(categoryInput, 500); // Debounced value for searching categories


  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     if (debouncedCategory.trim()) {
  //       try {
  //         const response = await searchCategoryApi(debouncedCategory);
  //         console.log(response);
  //         if (response) {
  //           setCategorySuggestions(response);
  //         } else {
  //           setCategorySuggestions([]);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching categories:", error);
  //       }
  //     } else {
  //       setCategorySuggestions([]);
  //     }
  //   };

  //   fetchCategories();
  // }, [debouncedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (debouncedCategory.trim()) {
        try {
          const currentCategory = debouncedCategory;
          const response = await searchCategoryApi(currentCategory);
          if (currentCategory === debouncedCategory) {
            setCategorySuggestions(response || []);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      } else {
        setCategorySuggestions([]);
      }
    };
  
    fetchCategories();
  }, [debouncedCategory]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = (value) => {
    setCategoryInput(value);

  };

  const handleAddCategory = () => {
      if (categoryInput.trim()) {
        setProduct({ ...product, categories: [...product.categories, categoryInput] });
        setCategoryInput("");
      }
  };

  const handleAddSuggestedCategory = (category) => {
      setProduct({ ...product, categories: [...product.categories, category] });
      setCategoryInput("");
  };

  const handleRemoveCategory = (index) => {
      const updatedCategories = product.categories.filter((_, i) => i !== index);
      setProduct({ ...product, categories: updatedCategories });
    
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

  const handleAddCustomField = () => {
    setCustomFields((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleCustomFieldChange = (index, field, value) => {
    setCustomFields((prev) =>
      prev.map((customField, i) =>
        i === index ? { ...customField, [field]: value } : customField
      )
    );
  };

  const handleRemoveCustomField = (index) => {
    setCustomFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add custom fields to the product
    customFields.forEach((field) => {
      product[field.key] = field.value;
    });

    console.log(product);

      // Submit the product
      try{
        await addProductApi(product);
        alert("Product added successfully!");
      }
      catch(err){
        alert("Failed to add product. Please try again.");
      }
      finally{
        setProduct({
          id: "",
          title: "",
          description: "",
          thumbnail: "",
          categories: [],
          price: "",
          MRP: "",
          stock: "",
          brand: "",
          weight: "",
          warrantyInformation: "",
          returnPolicy: "10 days return policy",
          minimumOrderQuantity: 1,
          size: "",
          images: [],
        });
        setCustomFields([]);
      }
    } 

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 rounded-md shadow-md"
      >
        {/* ID */}
        <div>
          <label className="block text-sm font-medium mb-2">Product ID</label>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Product ID"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Title"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Description"
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
            value={product.thumbnail}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Thumbnail URL"
          />
        </div>

        {/* Category */}
        <div className="relative md:col-span-2">
          <label className="block text-sm font-medium mb-2">Categories</label>
          <div className="flex gap-4">
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Type to search or add a category"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {categorySuggestions?.length > 0 && (
            <ul className="absolute p-2 border rounded-md shadow-md min-w-40 max-h-40 overflow-auto mt-2">
              {categorySuggestions?.map((cat, index) => (
                <li
                  key={index}
                  onClick={() => handleAddSuggestedCategory(cat.name)}
                  className="bg-gray-100 my-2 rounded-md hover:bg-gray-500 cursor-pointer"
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
          <ul className="flex flex-wrap gap-3 mt-2 pl-1">
            {product?.categories?.map((cat, index) => (
              <li key={index} className="flex items-center gap-1">
                <span className="text-gray-600 bg-gray-300 rounded-md px-2">{cat}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Price, MRP, Stock */}
        {["price", "MRP","brand","size","weight","stock"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-2">{field.toUpperCase()}</label>
            <input
              type="text"
              name={field}
              value={product[field]}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        {/* Images */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Images</label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={currentImg}
              onChange={(e) => setCurrentImg(e.target.value)}
              className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Image URL"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="mt-4">
            {product.images.map((img, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-gray-600">{img}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Custom Fields */}
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
            <div key={index} className="flex items-center gap-4 mb-2">
              <input
                type="text"
                value={field.key}
                onChange={(e) => handleCustomFieldChange(index, "key", e.target.value)}
                className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Field Name"
              />
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleCustomFieldChange(index, "value", e.target.value)}
                className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Field Value"
              />
              <button
                type="button"
                onClick={() => handleRemoveCustomField(index)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✖
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 lg:col-span-3 text-center">
          <button
            type="submit"
            className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
