import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitEnquiry = createAsyncThunk(
  "enquiry/submitEnquiry",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://local-trade-street-be.onrender.com/api/customer/customerservice/contact",
        formData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: { loading: false, success: false, error: null },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitEnquiry.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = enquirySlice.actions;
export default enquirySlice.reducer;
