import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItemCard from '../components/CartItem';
import { useSelector, useDispatch } from 'react-redux'
import { fetchCartItems, updateCartQuantity, deleteCartItem } from "../store/slices/cart.js";
import toast from "react-hot-toast";

import Loader from '../components/Loader.jsx'

const Cart = () => {
  const { cartItems, isLoading, subtotal, shippingCharges, tax, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fetch cart items when user changes
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCartItems(user._id));
    }
  }, [dispatch, user]);

  // Handlers
  const incrementHandler = (cartItem) => {
    if (cartItem && cartItem.stock > cartItem.quantity) {
        const newQuantity = cartItem.quantity + 1; // Increment quantity by 1
        dispatch(updateCartQuantity({ productId: cartItem.productId, userId: user._id, quantity: newQuantity }));
      
    } else {
        toast.error(`Only  ${cartItem.stock} Remaining`)
    }
  };

  const decrementHandler = (cartItem) => {
    if (cartItem && cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1; 
      dispatch(updateCartQuantity({ productId: cartItem.productId, userId: user._id, quantity: newQuantity }));
    } else if (cartItem && cartItem.quantity === 1) {
      toast.error("Quantity is already at minimum, consider removing the item instead.")
    } else {
      console.error("cartItem is undefined");
    }
  };

  const removeHandler = (productId) => {
    if (productId && user?._id) {
      dispatch(deleteCartItem({ productId, userId: user._id }));
    } else {
      console.error("Missing productId or user._id");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-8 gap-8 lg:gap-16">
      <main className="w-full lg:w-7/12 overflow-y-auto">
        {isLoading && <Loader />}

        {!isLoading && cartItems.length > 0 ? (
          cartItems.map((i) => (
            <CartItemCard
              incrementHandler={() => incrementHandler(i)}
              decrementHandler={() => decrementHandler(i)}
              removeHandler={() => removeHandler(i.productId)}
              key={i.productId}
              cartItem={i}
            />
          ))
        ) : (
          <h1 className="text-2xl text-center">No Items Added</h1>
        )}
      </main>

      <aside className="w-full lg:w-5/12 p-8 lg:p-16 flex flex-col items-center gap-6">
        <p className="text-lg">Subtotal: ₹{subtotal}</p>
        <p className="text-lg">Shipping Charges: ₹{shippingCharges}</p>
        <p className="text-lg">Tax: ₹{tax}</p>
        <p className="text-lg font-bold">Total: ₹{total}</p>

        {cartItems.length > 0 && (
          <Link
            to="/shipping"
            className="text-white px-8 py-4 uppercase tracking-wider rounded mt-4 hover:opacity-80 text-center w-full sm:w-auto justify-center"
          >

            <div class="mt-6 text-center">
              <button type="button" class="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow ">
                Checkout
                <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

          </Link>
        )}
      </aside>
    </div>
  );
};

export default Cart;

