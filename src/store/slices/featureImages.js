import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Initial state
const initialState = {
  images: [],
  isLoading: false,
};

// Async Thunks
export const addFeatureImage = createAsyncThunk(
  "featureimage/add",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/featureimages/add",
      formData, // Pass formData directly, not inside an object
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  }
);


export const getFeatureImages = createAsyncThunk("featureimage/get", async () => {
  const response = await axios.get(`http://localhost:3000/api/v1/featureimages/get`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  return response.data;
});

export const deleteFeatureImage = createAsyncThunk(
  "cart/deleteCartItem",
  async (featureImageId) => {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/featureimages/${featureImageId}`,
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
const FeatureImagesSlice = createSlice({
  name: "featureimages",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = false;
        state.images = [];
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.images = action.payload.images;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.images = [];
      })
  },
});


export default FeatureImagesSlice;
