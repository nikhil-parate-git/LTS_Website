import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/auth/send-otp`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP");
    }
  }
);

const sendOtpSlice = createSlice({
  name: "otp",
  initialState: {
    loading: false,
    success: false,
    error: null,
    receivedOtp: null,
  },
  reducers: {
    resetOtpState: (state) => {
      state.success = false;
      state.error = null;
      state.receivedOtp = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.receivedOtp = action.payload.otp;
        
        // toast.success(`OTP Sent! Your code is: ${action.payload.otp}`, {
        //   duration: 6000,
        //   icon: '🚀',
        // });
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { resetOtpState } = sendOtpSlice.actions;
export default sendOtpSlice.reducer;