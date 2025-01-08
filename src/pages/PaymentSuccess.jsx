import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { destroyCart } from '../store/slices/cart';

function PaymentSuccess() {
  // Extract query parameters using useLocation
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referredId = queryParams.get('reference');
  const { user  }  = useSelector(state => state.auth);
  const { _id } = user;
  const userId =  _id;
  const dispatch = useDispatch();

  useEffect(()=>{      
       dispatch(destroyCart(userId)
       ).then(data =>{
           if(data?.payload?.success){
              toast.success("your cart items now shopped")
           }
           else{
              console.log("Something went wrong"); 
           }
       })
  },[]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful</h1>
      <p className="text-lg text-gray-700 mb-6">
        <strong>Referred ID:</strong> {referredId || 'Not Available'}
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Explore More 
      </Link>
    </div>
  );
}

export default PaymentSuccess;
