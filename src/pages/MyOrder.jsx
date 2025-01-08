import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, fetchOrders } from "../store/slices/order.js";
import toast from "react-hot-toast";


function MyOrder() {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const loadOrders = async () => {
    try {
      const data = await dispatch(fetchOrders(userId)).unwrap();
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error("Failed to fetch orders. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Something went wrong while fetching orders.");
    }
  };

  useEffect(() => {
    loadOrders();
  }, [dispatch, userId]);

  const handleCancelOrder = async (orderId) => {
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

  if (!orders.length) {
    return <div className="p-4 text-center">No orders found</div>;
  }

  return (
    <div className="w-full flex justify-center gap-4 p-4">
      <div className="w-4/5">
        {orders.map((order) => (
          <MyOrderCard key={order._id} {...order} cancelOrder={handleCancelOrder} />
        ))}
      </div>
    </div>
  );
}

export const MyOrderCard = ({ _id, subtotal, total, tax, shippingCharges, orderItems, status, cancelOrder }) => {
  return (
    <div
      className="w-full h-[30vh] flex items-center p-5 border rounded-lg shadow-md bg-white hover:shadow-lg transition mb-4"
    >
      {/* Order Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">Order ID: {_id}</h3>
        <p>
          <strong>Subtotal:</strong> ₹{subtotal}
        </p>
        <p>
          <strong>Total:</strong> ₹{total}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>producs:</strong> {orderItems.length}
        </p>
      </div>

      {/* Cancel Button */}
      {status === "Processing" && (
        <button
          onClick={() => cancelOrder(_id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Cancel Order
        </button>
      )}
    </div>
  );
};

export default MyOrder;
