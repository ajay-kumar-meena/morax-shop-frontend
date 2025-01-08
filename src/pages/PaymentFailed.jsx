import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cancelOrder, getLastOrder } from '../store/slices/order';

function PaymentFailed() {
  const { user } = useSelector((state) => state.auth);
  const  userId = user._id || "undefined";
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOrderCancellation = async () => {
      try {
        // Fetch the last order
        const lastOrderResponse =  dispatch(getLastOrder(userId));
        const lastOrder = lastOrderResponse?.payload;
        if (lastOrder?.success) {
          const orderId = lastOrder.order._id;
          console.log("orderId: ", orderId)
          const cancelResponse =  dispatch(cancelOrder(orderId));
          const cancelData = cancelResponse?.payload;

          if (cancelData?.success) {
            toast.success('Your order has been canceled successfully.');
          } else {
            toast.error('Failed to cancel the order.');
          }
        } else {
          toast.error('Failed to retrieve the last order.');
        }
      } catch (error) {
        console.error('Error handling order cancellation:', error);
        toast.error('An unexpected error occurred.');
      }
    };

    handleOrderCancellation();
  }, [dispatch, userId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
      <Link
        to="/cart"
        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
      >
        Go to Cart
      </Link>
    </div>
  );
}

export default PaymentFailed;
