import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};


export const addNewProduct = createAsyncThunk(
  "/product/new",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:3000/api/v1/product/new",
      formData,
      {
        withCredentials: true,
      }
    );

    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:3000/api/v1/product/admin-products",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }

      }
    );

    return result?.data;
  }
);

// export const editProduct = createAsyncThunk(
//   "/products/editProduct",
//   async ({ id, formData }) => {
//     const result = await axios.put(
//       `http://localhost:3000/api/admin/products/edit/${id}`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return result?.data;
//   }
// );

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:3000/api/v1/product/${id}`,
      {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
      }
    );

    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase()
  },
});

export default AdminProductsSlice;
