import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/customer/vendor/otp`;

export const sendOtp = createAsyncThunk(
  "vendorOtp/sendOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/send`, { phone });
      const otp = response.data.OTP;
      toast.success(
        otp
          ? `Your OTP is: ${otp}`
          : response.data.message || "OTP sent successfully!",
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send OTP. Try again.";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "vendorOtp/verifyOtp",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify`, { phone, otp });
      toast.success(response.data.message || "OTP verified successfully!");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid OTP. Please try again.";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

const vendorOtpSlice = createSlice({
  name: "vendorOtp",
  initialState: {
    phone: "",
    isPhoneVerified: false,
    otpSent: false,

    sendOtpLoading: false,
    sendOtpError: null,

    verifyOtpLoading: false,
    verifyOtpError: null,
  },
  reducers: {
    setPhone(state, action) {
      state.phone = action.payload;
    },
    resetOtpState(state) {
      state.otpSent = false;
      state.isPhoneVerified = false;
      state.sendOtpError = null;
      state.verifyOtpError = null;
    },
    resetAll(state) {
      state.phone = "";
      state.isPhoneVerified = false;
      state.otpSent = false;
      state.sendOtpLoading = false;
      state.sendOtpError = null;
      state.verifyOtpLoading = false;
      state.verifyOtpError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.sendOtpLoading = true;
        state.sendOtpError = null;
        state.otpSent = false;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.sendOtpLoading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.sendOtpLoading = false;
        state.sendOtpError = action.payload;
      })

      .addCase(verifyOtp.pending, (state) => {
        state.verifyOtpLoading = true;
        state.verifyOtpError = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.verifyOtpLoading = false;
        state.isPhoneVerified = true;
        state.otpSent = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.verifyOtpLoading = false;
        state.verifyOtpError = action.payload;
      });
  },
});

export const { setPhone, resetOtpState, resetAll } = vendorOtpSlice.actions;
export default vendorOtpSlice.reducer;
