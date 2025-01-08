import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../store/slices/product";
import { addToCart } from "../store/slices/cart";
import toast from "react-hot-toast";


function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null); // Initialize as null to handle loading state
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  // Function to load the product
  const loadProduct = () => {
    dispatch(getSingleProduct(productId)).then((data) => {
      if (data?.payload?.success) {
        setProduct(data.payload.product);
      } else {
        toast.error("SomeThing went to load product")
      }
    });
  };

  useEffect(() => {
    loadProduct();
  }, [productId]); // Add productId to dependencies for better practice

  // Loading state
  if (!product) {
    return <div className="p-6 text-center">Loading product details...</div>;
  }

  // Destructure product
  const {
    _id,
    photos = [], // Default to an empty array if photos is undefined
    name = "Unknown Product",
    brand = "Unknown Brand",
    price = 0,
    salePrice,
    category = "Uncategorized",
    stock = 0,
    description = "No description available.",
  } = product;

  const addCartHandler = async(productId) => {      
    if(user){
        const userId = user._id;
        dispatch(
         addToCart({userId, productId, quantity: 1})
         ).then(data =>{
         if(data?.payload.success){
               toast.success("Add Item successfully")
         }
         else{
              toast.error(data?.payload.message);
         }
      })
    }
    
 }


  return (
    <div className="max-w-4xl h-[80vh] mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Product Image and Details */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product Image */}
        <div className="lg:w-1/2">
          {photos[0].url ? (
            <img
              src={photos[0].url}
              alt={name}
              className="rounded-lg w-full h-auto object-cover shadow-md"
            />
          ) : (
            <div className="bg-gray-200 h-64 w-full flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          {/* Name and Brand */}
          <h1 className="text-3xl font-semibold text-gray-800">{name}</h1>
          <h2 className="text-lg font-medium text-gray-500">Brand: {brand}</h2>

          {/* Price */}
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold text-red-500">
              ₹{salePrice ? salePrice : price}
            </p>
            {salePrice && (
              <p className="text-lg font-medium text-gray-500 line-through">
                ₹{price}
              </p>
            )}
          </div>

          {/* Category */}
          <p>
            <strong>Category:</strong> {category}
          </p>

          {/* Stock */}
          <p>
            <strong>Stock:</strong>{" "}
            <span
              className={`${
                stock > 0 ? "text-green-600" : "text-red-600"
              } font-semibold`}
            >
              {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
            </span>
          </p>

          {/* Description */}
          <p className="text-gray-700">{description}</p>

          {/* Add to Cart Button */}
          <button
            className="px-6 py-2 mt-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
            onClick={ ()=> addCartHandler(_id) }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
