import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  users: [],
};


// Make Admin Thunk
export const makeAdmin = createAsyncThunk(
  "user/makeAdmin",
  async (userId, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `http://localhost:3000/api/v1/user/makeadmin/${userId}`,
        null,
        {
          withCredentials: true,
        }
      );
      return result.data;
    } catch (error) {
      console.error('Error in makeAdmin:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch All Users Thunk
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        "http://localhost:3000/api/v1/user/all",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error('Error in fetchAllUsers:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete User Thunk
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `http://localhost:3000/api/v1/user/${userId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error('Error in deleteUser:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const AdminUserSlice = createSlice({
  name: "adminuser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase()
  },
});

export default AdminUserSlice;
