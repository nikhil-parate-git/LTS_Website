import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/customer`;

// Create Vendor
export const createVendor = createAsyncThunk(
  "addVendor/createVendor",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/vendor/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(data.message || "Vendor registered successfully! 🎉");
      return data.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to create vendor. Please try again.";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

const addVendorSlice = createSlice({
  name: "addVendor",
  initialState: {
    loading: false,
    success: false,
    error: null,
    vendorData: null,
  },
  reducers: {
    resetVendorState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.vendorData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVendor.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.vendorData = action.payload;
      })
      .addCase(createVendor.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetVendorState } = addVendorSlice.actions;
export default addVendorSlice.reducer;
