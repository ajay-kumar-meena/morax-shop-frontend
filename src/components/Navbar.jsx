import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from 'react-redux';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useSelector(state => state.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="text-slate-700 container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center sm:h-3/4">
      <a href="/" className="flex items-center whitespace-nowrap text-2xl font-black">
        <span className="mr-2 w-8">
          <div className="text-blue-600 font-bold text-2xl">
            <h1 className="text-2xl">
              Morax<span className="text-2xl text-black">Shop</span>
            </h1>
          </div>
        </span>
      </a>
      <input
        type="checkbox"
        className="peer hidden"
        id="navbar-open"
        checked={isOpen}
        onChange={toggleMenu}
      />
      <label className="absolute top-5 right-5 cursor-pointer lg:hidden" htmlFor="navbar-open">
        <svg
          className="h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
      <nav
        aria-label="Header Navigation"
        className={`peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row lg:flex ${
          isOpen ? '' : 'hidden lg:flex'
        }`}
      >
        <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
          <li className="lg:mr-12">
            <Link
              to="/"
              className="rounded text-gray-700 transition-transform duration-1000 transform hover:scale-110 hover:text-lg"
            >
              Home
            </Link>
          </li>
          <li className="lg:mr-12">
            <Link
              to="/my-orders"
              className="rounded text-gray-700 transition-transform duration-1000 transform hover:scale-110 hover:text-lg"
            >
              My Orders
            </Link>
          </li>
          <li className="lg:mr-12">
            <Link
              to="/contact-us"
              className="rounded text-gray-700 transition-transform duration-1000 transform hover:scale-110 hover:text-lg"
            >
              Contact Us
            </Link>
          </li>
          {isAuthenticated && user?.role === "admin" && (
            <li className="lg:mr-12">
              <Link
                to="/admin/dashboard"
                className="rounded text-gray-700 transition-transform duration-1000 transform hover:scale-110 hover:text-lg"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
        <hr className="mt-4 w-full lg:hidden" />
        <div className="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0">
          <Link
            to="/search"
            className="whitespace-nowrap rounded font-medium transition-transform duration-1000 transform hover:scale-110 hover:text-lg"
          >
            <IoIosSearch className="text-xl text-black" />
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/cart"
                className="whitespace-nowrap rounded font-medium transition-transform duration-1000 transform hover:scale-110 hover:text-lg"
              >
                <CiShoppingCart className="text-xl text-black text-bold" />
              </Link>
              <Link
                to="/profile"
                className="whitespace-nowrap rounded-xl px-5 py-3 font-medium text-white transition-transform duration-1000 transform hover:scale-110 hover:text-lg"
              >
                <FaRegUserCircle className="text-xl text-black" />
              </Link>
              <Link
                to="/logout"
                className="whitespace-nowrap rounded-xl px-5 py-3 font-medium text-white  hover:bg-blue-800 bg-blue-600"
              >
                <button>Logout</button>
              </Link>
            </>
          ) : (
            <>
            <Link
              to="/login"
              className="whitespace-nowrap rounded-xl px-5 py-3 font-medium text-white transition-transform duration-1000 transform hover:scale-110  bg-blue-600"
            >
              <button>Login</button>
            </Link>
            <Link
              to="/signup"
              className="whitespace-nowrap rounded-xl px-5 py-3 font-medium text-white transition-transform duration-1000 transform hover:scale-110  bg-blue-600"
            >
              <button>Sign Up</button>
            </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;













