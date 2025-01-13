import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const SalesAnalytics = () => {
  // Sample data
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [5000, 8000, 12000, 15000, 20000, 25000, 30000],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const categoryData = {
    labels: ["Electronics", "Clothing", "Groceries", "Home Decor", "Books"],
    datasets: [
      {
        label: "Sales by Category",
        data: [30, 25, 20, 15, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const productData = {
    labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
    datasets: [
      {
        label: "Units Sold",
        data: [200, 150, 130, 110, 90],
        backgroundColor: "#FF6384",
      },
    ],
  };

  const customerData = {
    labels: ["New Customers", "Returning Customers"],
    datasets: [
      {
        label: "Customer Demographics",
        data: [40, 60],
        backgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Sales Analytics
      </h1>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold">$150,000</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">12,000</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Average Order Value</p>
          <p className="text-2xl font-bold">$125</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Customer Retention</p>
          <p className="text-2xl font-bold">60%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trends */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Revenue Trends</h2>
          <Line data={revenueData} options={{ responsive: true }} />
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Top Products</h2>
          <Bar data={productData} options={{ responsive: true }} />
        </div>

        {/* Sales by Category */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Sales by Category</h2>
          <Doughnut data={categoryData} options={{ responsive: true }} />
        </div>

        {/* Customer Insights */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Customer Insights</h2>
          <Pie data={customerData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
