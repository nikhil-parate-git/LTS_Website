import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/auth/verify-otp`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Invalid OTP");
    }
  }
);

const verifyOtpSlice = createSlice({
  name: "verifyOtp",
  initialState: {
    loading: false,
    success: false,
    error: null,
    userToken: null,
  },
  reducers: {
    resetVerifyState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userToken = action.payload.token;
        
        localStorage.setItem("token", action.payload.token);
        
        toast.success("Verify Successful!",{
          autoClose:1500
        });
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Verification Failed");
      });
  },
});

export const { resetVerifyState } = verifyOtpSlice.actions;
export default verifyOtpSlice.reducer;