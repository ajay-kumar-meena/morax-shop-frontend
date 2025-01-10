import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from '../../config/config.js'

const initialState = {
  isLoading: true,
  productList: [],
  totalPage: 1,
  error : "",

};



export const getlatestProducts = createAsyncThunk(
  "/product/latest",
  async () => {
    const result = await axios.get(
      `${SERVER}/api/v1/product/latest`,
      {
        withCredentials: true, 
      }
    );

    return result?.data;
  }
);

export const getSingleProduct = createAsyncThunk(
  "/product/single",
  async (productId) => {
    const result = await axios.get(
      `${SERVER}/api/v1/product/${productId}`,
      {
        withCredentials: true, 
      }
    );

    return result?.data;
  }
);


export const fetchAllFilteredProducts = createAsyncThunk(
  '/products/fetchAllProducts',
  async ({search,page,price,sort,brand}) => 
    {
    let base = `all?search=${search}&page=${page}`;
    if (price) base += `&price=${price}`;
    if (sort) base += `&sort=${sort}`;
    if (brand) base += `&brand=${brand}`;

    try {
      const response = await axios.get(
        `${SERVER}/api/v1/product/`+base,
        {
          withCredentials: true,
        }
      );

      if (!response.data) {
        throw new Error('Server returned empty response');
      }

      console.log('Response data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Re-throw the error to be handled by Redux Toolkit
    }
  }
)



const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
             state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.products;
        state.totalPage = action.payload.totalPage;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state,action) => {
        state.isLoading = false;
        state.productList = [];
      })
  },
});

export default ProductSlice;
