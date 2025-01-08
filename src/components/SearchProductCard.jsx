import React from "react";
import { Link } from "react-router-dom";


function SearchProductCard({ productId, image, name, salePrice, originalPrice}) {
  return (
    <div className="flex flex-col items-center bg-indigo-500 shadow-lg rounded-lg p-6 max-w-xs w-[23%]">
      {/* Product Image */}
      <img 
        src={image} 
        alt={name} 
        className="h-40 w-full object-cover rounded-md mb-4"
      />

      {/* Product Name */}
      <h2 className="text-lg font-bold text-white">{name}</h2>

      {/* Price Section */}
      <div className="mt-2 flex flex-col items-center">
        <span className="text-yellow-300 text-xl font-semibold">₹{salePrice}</span>
        {originalPrice && (
          <span className="text-white line-through text-sm">₹{originalPrice}</span>
        )}
      </div>

      {/* View Product Button */}
      <Link 
        to={`/product/${productId}`}
        className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        View Product
      </Link>
    </div>
  );
}

export default SearchProductCard;
