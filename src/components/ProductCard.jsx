import React, { useState } from 'react';
import { Link } from 'react-router-dom' 
const ProductCard = ({ productId, name, image, description, salePrice, price, stock, addCartHandler }) => {
    // State to manage the product quantity
    const [quantity, setQuantity] = useState(1);

    // Function to increment quantity
    const increment = () => {
        if (quantity < stock) {  // Prevent exceeding stock limit
            setQuantity(quantity + 1);
        }
    };

    // Function to decrement quantity, ensuring it doesn't go below 1
    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="bg-indigo-500 p-4 rounded-lg shadow-lg flex flex-col items-center gap-4 max-w-sm">
            {/* Product Image */}
            <img src={image} alt={name} className="h-56 w-full object-cover rounded-md" />

            {/* Product Name */}
            <h2 className="text-2xl font-bold">{name}</h2>

            {/* Product Description */}
            <p className="text-gray-600 text-center">{description}</p>

            {/* Price Section */}
            <div className="flex  items-center mt-3">
                {/* Sale Price */}
                <span className="text-lg mx-2 font-bold text-black-600">{`${salePrice}`}</span>
                {/* Regular Price */}
                <span className="text-lg font-bold line-through text-white">{`${price}`}</span>

            </div>

            {/* Quantity Control */}
            <div className="flex items-center gap-5 mt-3">

                {stock ? (
                    <>
                        <button
                            onClick={decrement}
                            className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-gray-400 transition"
                        >
                            -
                        </button>
                        <span className="text-lg">{quantity}</span>
                        <button
                            onClick={increment}
                            className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-gray-400 transition"
                        >
                            +
                        </button>
                    </>
                ) : (
                    <span> Stock of Stock </span>
                )
                }

            </div>
            
            {(stock !== 0)  && (<>
                <button
                    onClick={() => addCartHandler(productId, quantity)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition mt-3"
                >
                    Add to Cart
                </button>
            </>)}

            {/* View Product Button */}

            <Link
                to={`/product/${productId}`}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition mt-3"
            >
                View Product
            </Link>
        </div>
    );
};

export default ProductCard;
