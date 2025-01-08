import React from 'react';
import { useLocation , Link} from 'react-router-dom';

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


function DashboardNavbar() {
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <div className="w-1/5 bg-white p-4 shadow-md h-screen">
      <Link to={'/admin/dashboard'}>
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      </Link>
      <ul>
        {adminNavLinks.map((link) => (
          <li key={link.path} className="mb-2">
            <Link
              to={link.path}
              className={`block px-4 py-2 rounded ${
                currentUrl === link.path ? "text-white bg-blue-500" : "text-gray-700"
              } hover:bg-blue-100`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardNavbar;
