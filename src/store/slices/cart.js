import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER } from '../../config/config.js'

// Helper functions
const calculateSubtotal = (items) => {
  if (items?.length > 0) {
    return items.reduce((sum, currentItem) => {
      const price = currentItem?.salePrice > 0 ? currentItem.salePrice : currentItem?.price;
      return sum + price * (currentItem?.quantity || 0);
    }, 0);
  }
  return 0;
};

const calculateTax = (subtotal, taxRate = 19) => (subtotal * taxRate) / 100;
const calculateTotal = (subtotal, tax, shippingCharge) => subtotal + tax + shippingCharge;

// Initial state
const initialState = {
  cartItems: [],
  shippingCharges: 45,
  subtotal: 0,
  tax: 0,
  total: 0,
  isLoading: false,
  error: null,
};

// Async Thunks
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      `${SERVER}/api/v1/cart/add`,
      { userId, productId, quantity },
      { withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );
    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async (userId) => {
  const response = await axios.get(`${SERVER}/api/v1/cart/get/${userId}`, {
    withCredentials: true,
  });
  return response.data;
});
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ productId, userId }) => {
    const response = await axios.delete(
      `${SERVER}/api/v1/cart/${userId}/${productId}`,
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

export const destroyCart = createAsyncThunk(
  "cart/destroyCart",
  async (userId) => {
    const response = await axios.delete(
      `${SERVER}/api/v1/cart/destory/${userId}}`,
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


export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ productId, userId, quantity }) => {
    const response = await axios.put(
      `${SERVER}/api/v1/cart/update-cart`,
      { productId, quantity, userId },
      { withCredentials: true }
    );
    return response.data;
  }
);

// Slice
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    calculateTotals: (state) => {
      state.subtotal = calculateSubtotal(state.cartItems);
      state.tax = calculateTax(state.subtotal);
      state.total = calculateTotal(state.subtotal, state.tax, state.shippingCharges);
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = []
        state.shippingCharges = 45;
        state.subtotal = 0;
        state.tax = 0;
        state.total = 0;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })

      // Fetch Cart Items
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.products;
        CartSlice.caseReducers.calculateTotals(state); // Recalculate totals
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
        state.error = action.error.message;
      })

      // Update Cart Quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.products;
        CartSlice.caseReducers.calculateTotals(state); // Recalculate totals
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Delete Cart Item
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.products;
        CartSlice.caseReducers.calculateTotals(state); // Recalculate totals
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.error.message;
      });
  },
});

export const { calculateTotals } = CartSlice.actions;
export default CartSlice;
