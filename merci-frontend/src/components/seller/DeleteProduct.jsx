import React, { useState } from 'react';

const DeleteProduct = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  // Dummy Product
  const dummyProduct = {
    id: '1',
    title: 'Essence Mascara Lash Princess',
    description:
      'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    category: 'beauty',
    price: 9.99,
    brand: 'Essence',
    sku: 'RCH45Q1A',
    images: [
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
    ],
  };

  const handleFetchProduct = () => {
    setError('');
    if (productId === dummyProduct.id) {
      setProduct(dummyProduct);
    } else {
      setProduct(null);
      setError('Product not found');
    }
  };

  const handleDelete = () => {
    alert(`Product '${product?.title}' deleted successfully!`);
    setProduct(null); // Clear product details after deletion
    setShowConfirm(false);
    setProductId('');
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Delete Product</h2>

      {/* Input for Product ID */}
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
          Fetch Product
        </button>
      </div>

      {/* Show Error if Fetch Fails */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Show Product Details */}
      {product && (
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <p className="text-lg font-semibold">{product.title}</p>
          <p className="text-gray-600">Price: ${product.price}</p>
          <p className="text-gray-600">Category: {product.category}</p>
          <p className="text-gray-600">Brand: {product.brand}</p>
          <p className="text-gray-600">SKU: {product.sku}</p>
        </div>
      )}

      {/* Delete Confirmation */}
      {product && !showConfirm && (
        <button
          onClick={() => setShowConfirm(true)}
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete Product
        </button>
      )}

      {showConfirm && (
        <div className="mt-4 bg-red-50 p-4 rounded-md">
          <p className="text-red-600">Are you sure you want to delete this product?</p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleDelete}
              className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Confirm Delete
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
