import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const REVIEW_URL = `${API_BASE}/customer/rate-review/reviews`; // ✅ FIXED

export const submitRateReview = createAsyncThunk(
  "rateReview/submit",
  async ({ vendorId, rating, review }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        REVIEW_URL,
        { vendorId, rating, review },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      toast.success(
        response.data.message || "Rating & review submitted successfully! 🎉",
        { position: "top-right", autoClose: 3000, closeOnClick: true }
      );

      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";

      const isAlreadyReviewed =
        error?.response?.status === 400 &&
        message.toLowerCase().includes("already reviewed");

      if (isAlreadyReviewed) {
        toast.info(
          "You have already reviewed this vendor. You can only review once. ✅",
          { position: "top-right", autoClose: 4000, closeOnClick: true }
        );
      } else {
        toast.error(message, {
          position: "top-right", autoClose: 4000, closeOnClick: true
        });
      }

      return rejectWithValue({ message, alreadyReviewed: isAlreadyReviewed });
    }
  },
);

const rateReviewSlice = createSlice({
  name: "rateReview",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
    alreadyReviewed: false,
  },
  reducers: {
    resetRateReview: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
      state.alreadyReviewed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRateReview.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitRateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload?.data || null;
      })
      .addCase(submitRateReview.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || action.payload;
        state.alreadyReviewed = action.payload?.alreadyReviewed || false;
      });
  },
});

export const { resetRateReview } = rateReviewSlice.actions;
export default rateReviewSlice.reducer;