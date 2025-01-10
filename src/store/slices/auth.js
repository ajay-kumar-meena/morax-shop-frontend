import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { SERVER } from '../../config/config.js'

const initialState = {
     user:null,
     isLoading:true,
     isAuthenticated:false

}
export const signUp = createAsyncThunk(
  "user/signup",
  async (formData) => {
    const response = await axios.post(
      `${SERVER}/api/v1/user/register`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }, 
      }
    );
    return response.data;
  }
);


export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userExist: (state,action)=>{
          state.user = action.payload.user;
          state.isLoading = false;
          state.isAuthenticated=true;     
    },
    userNotExist: (state)=>{
        state.user = null;
        state.isLoading = true;
        state.isAuthenticated=false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { userExist,userNotExist } = auth.actions

export default auth;