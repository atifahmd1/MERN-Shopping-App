import React, { useEffect, useState } from 'react';
import { fetchProductApi, deleteProductApi } from '../../api/seller/productApi';

const DeleteProduct = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetchProductApi(productId);
      setProduct(response.data);
      setError('');
    } catch (error) {
      setProduct(null);
      setError('Product not found');
    } finally {
      setIsLoading(false);
      setProductId('');
    }
  };

  useEffect(() => {
    if (product) {
      console.log('Updated product state:', product);
    }
  }, [product]);

  const handleDelete = async () => {
    try{
      await deleteProductApi(product._id);
      
      alert(`Product with ID ${productId} deleted successfully.`);
    } catch (error) {
      setError(error.message);
    } finally {
      setShowConfirm(false);
      setProduct(null);
      setProductId('');
      setError('');
    }

  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-700 text-center">Delete Product</h2>

      {/* Input Section */}
      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter Product ID"
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full text-gray-700"
        />
        <button
          onClick={handleFetchProduct}
          className={`mt-3 py-2 px-4 w-full rounded-lg text-white ${
            isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Fetching...' : 'Fetch Product'}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-6">{error}</p>}

      {/* Product Details */}
      {product && (
        <div className="w-full max-w-4xl bg-white rounded-md shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={product?.thumbnail || '/placeholder-image.jpg'}
              alt={product?.title}
              className="h-40 w-40 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
            />
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-gray-800">{product?.title || 'Product Title'}</h3>
              <p className="text-gray-600 mt-2">{product?.description || 'No description available'}</p>
              <p className="text-gray-700 mt-2 font-semibold">Price: ${product?.price || 'N/A'}</p>
              <div className="mt-2 flex text-gray-700">
                <p className="font-semibold self-centre">Categories:</p>
                <ul className="flex flex-wrap align-centre gap-2 mt-2">
                  {product?.category.map((cat) => (
                    <li
                      key={cat?._id}
                      className="bg-gray-100 text-sm px-3 py-1 rounded-md border border-gray-300"
                    >
                      {cat?.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Delete Button */}
          {!showConfirm && (
            <button
              onClick={() => setShowConfirm(true)}
              className="mt-6 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full md:w-auto"
            >
              Delete Product
            </button>
          )}

          {/* Delete Confirmation */}
          {showConfirm && (
            <div className="mt-6 bg-red-50 p-4 rounded-md">
              <p className="text-red-600 font-semibold">
                Are you sure you want to delete this product?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
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
      )}
    </div>
  );
};

export default DeleteProduct;
