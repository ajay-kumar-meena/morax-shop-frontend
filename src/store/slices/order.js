import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER } from "../../config/config";


// Initial state
const initialState = {
    shippingInfo: {},
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    total: 0,
    status: "",
    items: [{}],
};

// Async Thunks
export const makeOrder = createAsyncThunk(
    "cart/makeOrder",
    async ({ shippingInfo, user, subtotal, shippingCharges, tax, total, orderItems }) => {
        const response = await axios.post(
            `${SERVER}/api/v1/order/new`,
            {
               shippingInfo,
               user,
               subtotal,
               shippingCharges,
               tax,
               total,
               orderItems
            },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"

                }
            }
        );
        return response.data;
    }
);

export const fetchOrders = createAsyncThunk("cart/fetchOrders", async (userId) => {
    const response = await axios.get(`${SERVER}/api/v1/order/my/?id=${userId}`,
        {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
    return response.data;
});



export const changeStatusOrder = createAsyncThunk(
    "cart/changeStatusOrder",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${SERVER}/api/v1/order/${orderId}`,
                { status: 'Shipped' }, // Replace 'Shipped' with your desired payload
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error in changeStatusOrder:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);



export const cancelOrder = createAsyncThunk(
    "cart/cancelOrder",
    async (orderId) => {
        const response = await axios.delete(
            `${SERVER}/api/v1/order/${orderId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
        return response.data;
    }
);

export const getLastOrder = createAsyncThunk(
    "cart/getLastOrder",
    async (userId) => {
        const response = await axios.get(
            `${SERVER}/api/v1/order/lastorder/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return response.data;
    }
);


export const fetchAllOrders = createAsyncThunk(
    "cart/fetchAllOrders",
    async () => {
        const response = await axios.get(
            `${SERVER}/api/v1/order/all`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return response.data;
    }
);




// Slice
const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(makeOrder.pending)


    },
});


export default OrderSlice;

