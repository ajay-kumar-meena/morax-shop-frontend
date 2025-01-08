import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}) => {
  const { photos, productId, name, price, quantity, stock } = cartItem;
  const imageUrl = photos[0].url;
  return (
    <div className="flex flex-row items-center justify-between mt- p-6 gap-6 border-b border-gray-200 w-full bg-gray-50 rounded-lg">
      {/* Product Image */}
      <img
        src={imageUrl}
        alt={name}
        className="w-20 h-20 object-contain mr-4"
      />

      {/* Product Info */}
      <div className="flex-1 flex items-center justify-around gap-5">
        <div className="flex items-center">
          <Link
            to={`/product/${productId}`}
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition mr-4"
          >
            {name}
          </Link>
          <span className="text-lg font-semibold text-gray-700 mr-4">₹{price}</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => decrementHandler(cartItem)}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-200 transition"
          >
            -
          </button>
          <p className="text-lg font-semibold mx-2">{quantity}</p>
          <button
            onClick={() => incrementHandler(cartItem)}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-200 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeHandler(productId)}
        className="text-xl text-white bg-red-600 hover:bg-red-700 rounded-full p-2 transition"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;