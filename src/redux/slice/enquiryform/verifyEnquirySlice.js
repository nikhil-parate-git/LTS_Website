import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const verifyEnquiryOtp = createAsyncThunk(
  "enquiry/verifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/enquiry/verify-otp`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Verification failed");
    }
  }
);

const verifyEnquirySlice = createSlice({
  name: "verifyEnquiry",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetVerifyState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEnquiryOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEnquiryOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        toast.success("Enquiry Submitted Successfully! ",{autoClose:1500});
      })
      .addCase(verifyEnquiryOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { resetVerifyState } = verifyEnquirySlice.actions;
export default verifyEnquirySlice.reducer;