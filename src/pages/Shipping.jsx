import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { destroyCart, fetchCartItems } from '../store/slices/cart';
import { makeOrder } from '../store/slices/order';
import axios from 'axios';

const initialShippingForm = {
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
}
function ShippingForm() {
  const [shippingFormData, setShippingFormData] = useState(initialShippingForm);
   const dispatch = useDispatch();
   const { cartItems, subtotal, shippingCharges, tax, total } = useSelector((state) => state.cart);
   const { user }  =  useSelector(state => state.auth);
   const userId = user._id;

  const handleChange = (e) => {
    setShippingFormData({
      ...shippingFormData,
      [e.target.name]: e.target.value,
    });
  };
  const paymentRequestHandler = (e) => {
    e.preventDefault();

    const orderItems = cartItems.map(item =>{
         return {
             name: item.name,
             photo: item.photos[0].url,
             productId: item.productId,
             quantity: item.quantity,
             price: item.salePrice,
            }
     })
    
     if(shippingFormData.pinCode.length != 6){
        toast.error("Pin code must be 6 digit")
        return;
    }

    dispatch(makeOrder({
        shippingInfo : shippingFormData,
        user: userId,
        subtotal,
        shippingCharges,
        tax,
        total,
        orderItems
    })).then(data=>{
         if(data?.payload?.success){
            toast.success("Order Placed Successfully")
         }
         else{
            toast.error("Your Product quantity has greater than stock to cart ");
         }
         console.log(data)
    })

    const managePayment = async()=>{
      const { data: { key } } = await axios.get("http://www.localhost:3000/api/v1/payment/getkey", {
        withCredentials: true, // Include credentials
        headers: {
          "Content-Type": "application/json", // Specify the Content-Type
        },
      });
      
      const { data: { order } } = await axios.post(
        "http://localhost:3000/api/v1/payment/checkout",
        { amount }, // Request body
        {
          withCredentials: true, // Include credentials
          headers: {
            "Content-Type": "application/json", // Specify the Content-Type
          },
        }
      );
      
      console.log("managePyament functin.... running....")

      const options = {
          key,
          amount: order.amount,
          currency: "INR",
          name: user.name,
          description: "For buying the product from morax shop",
          image: "https://avatars.githubusercontent.com/u/25058652?v=4",
          order_id: order.id,
          callback_url: "http://localhost:3000/api/v1/payment/paymentverification",
          prefill: {
              name: "Ajay Kumar meena",
              email: "ajaymeena045.official@gmail.com",
              contact: "964258742"
          },
          notes: {
              "address": "Razorpay Corporate Office"
          },
          theme: {
              "color": "#121212"
          }
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } 
    managePayment();

  };

  useEffect(()=>{

  },[]);

  return (
    <form onSubmit={paymentRequestHandler}  className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={shippingFormData.address}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={shippingFormData.city}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State
        </label>
        <input
          type="text"
          id="state"
          name="state"
          value={shippingFormData.state}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={shippingFormData.country}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">
          Pin Code
        </label>
        <input
          type="number"
          id="pinCode"
          name="pinCode"
          value={shippingFormData.pinCode}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-700  hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
      >
        Shipping Order
      </button>
    </form>
  );
}

export default ShippingForm;