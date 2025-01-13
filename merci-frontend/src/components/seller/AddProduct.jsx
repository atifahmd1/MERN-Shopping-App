// import React, { useState } from "react";
// import { addProductApi } from "../../api/seller/productApi";

// const AddProduct = ({ onProductAdded }) => {
//   const [product, setProduct] = useState({
//     id: "",
//     title: "",
//     desc: "",
//     img: [], // Array for multiple image URLs
//     thumbnail: "", // Single thumbnail URL
//     price: "",
//     size: "",
//     category: "",
//     brand: "",
//     stock: "",
//   });

//   const [currentImg, setCurrentImg] = useState(""); // Temporary input for adding images to the array

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleAddImage = () => {
//     if (currentImg.trim()) {
//       setProduct({ ...product, img: [...product.img, currentImg] });
//       setCurrentImg("");
//     }
//   };

//   const handleRemoveImage = (index) => {
//     const updatedImages = product.img.filter((_, i) => i !== index);
//     setProduct({ ...product, img: updatedImages });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await addProductApi(product); // Use the API function to make a POST request

//       alert("Product added successfully!");
//       setProduct({
//         id: "",
//         title: "",
//         desc: "",
//         img: [],
//         thumbnail: "",
//         price: "",
//         size: "",
//         category: "",
//         brand: "",
//         stock: "",
//       }); // Reset the form

//       if (onProductAdded) onProductAdded(); // Notify the parent component
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add product. Please try again.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50">
//       <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="grid gap-4 bg-white p-6 rounded-md shadow-md"
//       >
//         {/* Input fields for the product */}
//         {Object.keys(product).map((key) => {
//           if (key === "img") {
//             return (
//               <div key={key}>
//                 <label className="block text-sm font-medium mb-1">Images</label>
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="text"
//                     placeholder="Image URL"
//                     value={currentImg}
//                     onChange={(e) => setCurrentImg(e.target.value)}
//                     className="p-2 border rounded-md flex-1 focus:ring-2 focus:ring-blue-500"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleAddImage}
//                     className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <div className="mt-2">
//                   {product.img.map((url, index) => (
//                     <div key={index} className="flex items-center gap-2">
//                       <p className="text-sm text-gray-600">{url}</p>
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveImage(index)}
//                         className="text-red-500 hover:text-red-700 font-bold"
//                       >
//                         ✖
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           } else {
//             return (
//               <input
//                 key={key}
//                 name={key}
//                 placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//                 value={product[key]}
//                 onChange={handleInputChange}
//                 className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//               />
//             );
//           }
//         })}
//         <button
//           type="submit"
//           className="py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//         >
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;



import React, { useState } from "react";
import { addProductApi } from "../../api/seller/productApi";

const AddProduct = ({ onProductAdded }) => {
  const [product, setProduct] = useState({
    id: "",
    title: "",
    description: "",
    thumbnail: "",
    category: "",
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

  const [currentImg, setCurrentImg] = useState(""); // Temporary input for adding images to the array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("dimensions")) {
      setProduct({
        ...product,
        dimensions: { ...product.dimensions, [name.split(".")[1]]: value },
      });
    } else if (name.startsWith("meta")) {
      setProduct({
        ...product,
        meta: { ...product.meta, [name.split(".")[1]]: value },
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProductApi(product); // Use the API function to make a POST request

      alert("Product added successfully!");
      setProduct({
        id: "",
    title: "",
    description: "",
    thumbnail: "",
    category: "",
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
      }); // Reset the form

      if (onProductAdded) onProductAdded(); // Notify the parent component
    } catch (err) {
      console.error(err);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 bg-white p-6 rounded-md shadow-md"
      >
        {/* Input fields for the product */}
        {Object.keys(product).map((key) => {
           if (key === "images") {
            return (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">Images</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={currentImg}
                    onChange={(e) => setCurrentImg(e.target.value)}
                    className="p-2 border rounded-md flex-1 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2">
                  {product.images.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <p className="text-sm text-gray-600">{url}</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          } else {
            return (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">{key}</label>
                <input
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={product[key]}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            );
          }
        })}
        <button
          type="submit"
          className="py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
