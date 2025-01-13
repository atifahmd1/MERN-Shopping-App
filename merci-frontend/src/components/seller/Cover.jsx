import React from "react";
import ProductManagement from "./ProductManagement";
import SalesAnalytics from "./SalesAnalytics";

function Cover({ toCover, isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div
        className="relative bg-white rounded-lg shadow-lg p-6 
                   w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 max-h-[90vh] overflow-y-auto"
      >
        {/* 3D Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex justify-center items-center shadow-md hover:shadow-lg transform hover:translate-y-1 active:translate-y-0 transition-all duration-200"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="flex justify-center items-center h-full">
          {toCover === "product-management" ? (
            <ProductManagement />
          ) : (
            <SalesAnalytics />
          )}
        </div>
      </div>
    </div>
  );
}

export default Cover;
