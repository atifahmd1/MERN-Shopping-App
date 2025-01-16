// import React, { useState, useEffect } from 'react';

// const ProductManagement = () => {
//   const [active, setActive] = useState('addProduct');
//   const [products, setProducts] = useState([]);

//   // Fetch products
//   useEffect(() => {
//     fetch('/api/products')
//       .then((res) => res.json())
//       .then((data) => setProducts(data));
//   }, []);

//   const handleAddProduct = (e) => {
//     e.preventDefault();
//     // Handle adding product logic
//   };

//   const handleEditProduct = (id) => {
//     // Navigate to edit product form
//   };

//   const handleDeleteProduct = async (id) => {
//     await fetch(`/api/products/${id}`, { method: 'DELETE' });
//     setProducts(products.filter((product) => product.id !== id));
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-2xl font-bold text-gray-700">Product Management</h3>
//         <div className="flex space-x-4">
//           {active !== 'addProduct' && (
//             <button
//               onClick={() => setActive('addProduct')}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               Add Product
//             </button>
//           )}
//           {active !== 'editProduct' && (
//             <button
//               onClick={() => setActive('editProduct')}
//               className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
//             >
//               Edit Product
//             </button>
//           )}
//           {active !== 'deleteProduct' && (
//             <button
//               onClick={() => setActive('deleteProduct')}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//             >
//               Delete Product
//             </button>
//           )}
//         </div>
//       </div>

//       <form
//         onSubmit={handleAddProduct}
//         className="bg-white p-6 shadow-md rounded-lg mb-6"
//       >
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Product name"
//             className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Price"
//             className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Brand"
//             className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Size"
//             className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Color"
//             className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Stock"
//             className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//         >
//           Add Product
//         </button>
//       </form>

//       <ul className="space-y-4">
//         {products.map((product) => (
//           <li
//             key={product.id}
//             className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg"
//           >
//             <div>
//               <p className="text-lg font-semibold text-gray-700">
//                 {product.name}
//               </p>
//               <p className="text-gray-500">${product.price}</p>
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => handleEditProduct(product.id)}
//                 className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeleteProduct(product.id)}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductManagement;



import React, { useState } from 'react';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

const ProductManagement = () => {
  const [active, setActive] = useState('add-Product');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleRefresh = () => {
    setActive('add-Product');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-700 underline">{active.toUpperCase()}</h3>
        <div className="flex space-x-4">
          {active !== 'add-Product' && (
            <button
              onClick={() => setActive('add-Product')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Product
            </button>
          )}
          {active !== 'edit-Product' && (
            <button
              onClick={() => setActive('edit-Product')}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Edit Product
            </button>
          )}
          {active !== 'delete-Product' && (
            <button
              onClick={() => setActive('delete-Product')}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete Product
            </button>
          )}
        </div>
      </div>
      {active === 'add-Product' && <AddProduct onProductAdded={handleRefresh} />}
      {active === 'edit-Product' && (
        <EditProduct productId={selectedProductId} onProductUpdated={handleRefresh} />
      )}
      {active === 'delete-Product' && (
        <DeleteProduct productId={selectedProductId} onProductDeleted={handleRefresh} />
      )}
      {active === 'view-Products' && (
        <div>
          <button onClick={() => setActive('addProduct')}>Add Product</button>
          {/* Add Product Listing and edit/delete buttons here */}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
