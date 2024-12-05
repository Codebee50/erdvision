import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authActions";
import { userLogin } from "./authActions";
import Cookies from "js-cookie";


const initialState = {
  loading: false,
  userInfo: null,
  userToken: Cookies.get('userToken') || null,
  error: null,
  success: false,
  isAuthenticated: !!Cookies.get('userToken'),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state)=>{
      //logout reducer
      state.isAuthenticated = false
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.success = false
      state.error = null
      Cookies.remove('userToken')
      Cookies.remove('refreshToken')
    },
    setCredentials:(state, {payload}) =>{
      state.userInfo = payload
      state.isAuthenticated = payload? true: false
    }
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.data.user;
        state.userToken = payload.data.access_token;
        state.isAuthenticated = true;
        state.success = true
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isAuthenticated = false;
        state.success = false
      })
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
        state.success = false
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = false;
        state.success = true
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isAuthenticated = false;
        state.success = false
      })
     
  },
});

export const {logout, setCredentials} = authSlice.actions
export default authSlice.reducer;
