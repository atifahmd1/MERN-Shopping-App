import React, { useState } from "react";
import { FaBars, FaBox, FaChartLine, FaShoppingCart } from "react-icons/fa";
import ProductManagement from "./ProductManagement"; // Dummy component
import SalesAnalytics from "./SalesAnalytics"; // Dummy component
import OrderManagement from "./OrderManagement";

const DashboardLayout = () => {
  const [activeSection, setActiveSection] = useState("order-management");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false); // Close sidebar after selection on small screens
  };

  // Render the main content dynamically based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "product-management":
        return <ProductManagement />;
      case "sales-analytics":
        return <SalesAnalytics />;
      case "order-management":
        return <OrderManagement />;
      default:
        return <OrderManagement />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Toggle Button for Small Screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 text-gray-800"
        aria-label="Toggle Sidebar"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-white w-64 p-6 shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64`}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h1>
        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => handleSectionChange("product-management")}
            className={`flex items-center space-x-3 p-3 rounded-lg ${
              activeSection === "product-management"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
            }`}
          >
            <FaBox size={20} />
            <span>Product Management</span>
          </button>
          <button
            onClick={() => handleSectionChange("sales-analytics")}
            className={`flex items-center space-x-3 p-3 rounded-lg ${
              activeSection === "sales-analytics"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-green-100 hover:text-green-700"
            }`}
          >
            <FaChartLine size={20} />
            <span>Sales Analytics</span>
          </button>
          <button
            onClick={() => handleSectionChange("order-management")}
            className={`flex items-center space-x-3 p-3 rounded-lg ${
              activeSection === "order-management"
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
            }`}
          >
            <FaShoppingCart size={20} />
            <span>Order Management</span>
          </button>
        </nav>
      </div>

      {/* Overlay for Small Screens */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-25 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="flex items-center text-3xl font-bold text-gray-800 mb-6">
          {activeSection === "product-management" && (
            <>
              <FaBox size={24} className="mr-2" />
              Product Management
            </>
          )}
          {activeSection === "sales-analytics" && (
            <>
              <FaChartLine size={24} className="mr-2" />
              Sales Analytics
            </>
          )}
          {activeSection === "order-management" && (
            <>
              <FaShoppingCart size={24} className="mr-2" />
              Order Management
            </>
          )}
        </h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardLayout;
