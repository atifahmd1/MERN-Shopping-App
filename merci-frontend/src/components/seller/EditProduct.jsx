import React, { useState } from 'react';

const EditProduct = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Dummy Product for demonstration
  const dummyProduct = {
    id: '1',
    title: 'Essence Mascara Lash Princess',
    description:
      'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    category: 'beauty',
    price: 9.99,
    brand: 'Essence',
    sku: 'RCH45Q1A',
  };

  const handleFetchProduct = () => {
    setError('');
    setProduct(null);
    setSuccessMessage('');

    if (productId === dummyProduct.id) {
      // Simulate fetching the product
      setProduct(dummyProduct);
    } else {
      setError('Product not found');
    }
  };

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    // Simulate saving changes
    alert(`Product '${product.title}' updated successfully!`);
    setSuccessMessage('Product updated successfully!');

    // Automatically hide the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);

    // Reset states after saving
    setProduct(null);
    setProductId('');
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      {/* Search Product by ID */}
      <div className="mb-6">
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter Product ID"
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
        />
        <button
          onClick={handleFetchProduct}
          className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search Product
        </button>
      </div>

      {/* Show Error if Product Not Found */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Show Product Details for Editing */}
      {product && (
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <p className="text-lg font-semibold mb-2">Edit Product Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              placeholder="Brand"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleInputChange}
              placeholder="SKU"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 col-span-1 md:col-span-2"
            ></textarea>
          </div>
          <button
            onClick={handleSaveChanges}
            className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Show Success Message */}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default EditProduct;
