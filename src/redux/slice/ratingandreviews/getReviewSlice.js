import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const BASE = `${API_BASE}/customer/rate-review`; 

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export const fetchVendorReviews = createAsyncThunk(
  "vendorReviews/fetch",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE}/vendors/${vendorId}/reviews`, {
        headers: getHeaders(),
      });
      return response.data.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch reviews.";
      toast.error(message, { position: "top-right", autoClose: 3000 });
      return rejectWithValue(message);
    }
  },
);

export const updateVendorReview = createAsyncThunk(
  "vendorReviews/update",
  async ({ reviewId, rating, review }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE}/reviews/${reviewId}`,
        { rating, review },
        { headers: getHeaders() },
      );
      toast.success(response.data.message || "Review updated successfully!", {
        position: "top-right", autoClose: 3000
      });
      return response.data.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update review.";
      toast.error(message, { position: "top-right", autoClose: 3000 });
      return rejectWithValue(message);
    }
  },
);

export const deleteVendorReview = createAsyncThunk(
  "vendorReviews/delete",
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE}/reviews/${reviewId}`, {
        headers: getHeaders(),
      });
      toast.success(response.data.message || "Review deleted successfully!", {
        position: "top-right", autoClose: 3000
      });
      return reviewId;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete review.";
      toast.error(message, { position: "top-right", autoClose: 3000 });
      return rejectWithValue(message);
    }
  },
);

const vendorReviewsSlice = createSlice({
  name: "vendorReviews",
  initialState: {
    reviews: [],
    loading: false,
    updating: false,
    deleting: null,
    error: null,
  },
  reducers: {
    clearVendorReviews: (state) => {
      state.reviews = [];
      state.loading = false;
      state.updating = false;
      state.deleting = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload || [];
      })
      .addCase(fetchVendorReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateVendorReview.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateVendorReview.fulfilled, (state, action) => {
        state.updating = false;
        const updated = action.payload;
        state.reviews = state.reviews.map((r) =>
          r.reviewId === updated.reviewId ? { ...r, ...updated } : r,
        );
      })
      .addCase(updateVendorReview.rejected, (state) => {
        state.updating = false;
      })
      .addCase(deleteVendorReview.pending, (state, action) => {
        state.deleting = action.meta.arg;
      })
      .addCase(deleteVendorReview.fulfilled, (state, action) => {
        state.deleting = null;
        state.reviews = state.reviews.filter(
          (r) => r.reviewId !== action.payload,
        );
      })
      .addCase(deleteVendorReview.rejected, (state) => {
        state.deleting = null;
      });
  },
});

export const { clearVendorReviews } = vendorReviewsSlice.actions;
export default vendorReviewsSlice.reducer;