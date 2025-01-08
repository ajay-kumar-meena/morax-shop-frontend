import React, { useEffect, useState } from 'react';
import DashboardNavbar from '../../components/admin/DashboardNavbar';
import { useDispatch } from 'react-redux';
import { cancelOrder, changeStatusOrder, fetchAllOrders } from '../../store/slices/order.js';
import toast from 'react-hot-toast';

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  // Load orders from the backend
  const loadOrders = () => {
    dispatch(fetchAllOrders()).then(data => {
      if (data?.payload?.success) {
          setOrders(data.payload.orders);
      } else {
        toast.error("Something went wrong fetching orders");
      }
    })
  };

  useEffect(() => {
    loadOrders();
  }, [dispatch]);

  // Handle status change
  const statusChangeHandler = (orderId) => {
      dispatch(
        changeStatusOrder(orderId)
      ).then(data => {
          if(data?.payload?.success){
               toast.success("change the order status")
               setOrders([]);
               loadOrders();
          }
      });
  };

  // Handle order cancellation
  const cancelOrderHandler = (orderId) => {
    dispatch(
      cancelOrder(orderId)
    ).then(data => {
        if(data?.payload?.success){
             toast.success("Order canceled successfully")
             setOrders([]);
             loadOrders();
        }
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardNavbar />

      {/* Main Content */}
      <div className="flex flex-col items-center w-full p-4">
        <h1 className="text-2xl font-semibold mb-4">View Orders</h1>
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 overflow-y-auto h-full max-h-[80vh]">
          {orders.length > 0 ? (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <OrderCart
                  key={order._id}
                  orderId={order._id}
                  productCount={order.orderItems.length}
                  orderStatus={order.status}
                  statusChangeHandler={statusChangeHandler}
                  cancelOrderHandler={cancelOrderHandler}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">No Orders available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewOrders;

const OrderCart = ({ orderId, productCount, orderStatus, statusChangeHandler, cancelOrderHandler }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white shadow-md rounded-lg hover:bg-gray-50 transition duration-300">
      {/* Order Details */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-3/4">
        {/* Order ID */}
        <div className="text-lg font-semibold text-gray-700">Order #{orderId}</div>

        {/* Product Count */}
        <div className="text-sm text-gray-500">
          <span className="font-medium">Product's :</span> {productCount}
        </div>

        {/* Order Status */}
        <div className="text-sm text-gray-500">
          <span className="font-medium">Status:</span> {orderStatus}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
        {/* Status Change Button */}
        <button
          onClick={() => statusChangeHandler(orderId)}
          className="bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
        >
          Change Status
        </button>

        {/* Cancel Order Button (only active when processing) */}
        {orderStatus === "Processing" && (
          <button
            onClick={() => cancelOrderHandler(orderId)}
            className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
};
