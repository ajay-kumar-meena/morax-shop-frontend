import React from 'react';
import DashboardNavbar from '../../components/admin/DashboardNavbar';
import { Link } from 'react-router-dom';

const adminNavLinks = [
  {
    name: "Add Product",
    path: '/admin/dashboard/addproduct',
  },
  {
    name: "Add Features Image",
    path: '/admin/dashboard/addfeatureimages',
  },
  {
    name: "View Products",
    path: '/admin/dashboard/viewproducts',
  },
  {
    name: "View Features Image",
    path: '/admin/dashboard/viewfeatureimages',
  },
  {
    name: "View Orders",
    path: '/admin/dashboard/vieworders',
  },
  {
    name: "View Users",
    path: '/admin/dashboard/viewusers',
  },
];

// Array of predefined background colors
const bgColors = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-yellow-500',
  'bg-pink-500',
];

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardNavbar />

      {/* Main Content */}
      <div className="overflow-y-auto max-h-[80vh] w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {adminNavLinks.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center justify-center w-full h-32 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-300 ${bgColors[index % bgColors.length]}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
