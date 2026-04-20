
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendEnquiryOtp = createAsyncThunk(
  "enquiry/sendOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/enquiry/send-otp`,
        {
          name: payload.name,
          phone: payload.phone,
          enquiry: payload.enquiry,
          vendorId: payload.vendorId || null,
          categoryId: payload.categoryId || null,
          subcategoryId: payload.subcategoryId || null,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const enquirySentOtpSlice = createSlice({
  name: "enquiryOtp",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetEnquiryState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEnquiryOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEnquiryOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        toast.success(`Enquiry OTP: ${action.payload.otp}`, { icon: "📩" });
      })
      .addCase(sendEnquiryOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { resetEnquiryState } = enquirySentOtpSlice.actions;
export default enquirySentOtpSlice.reducer;
