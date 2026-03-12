import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchVendorsByCatAndSubcat = createAsyncThunk(
  "vendors/fetchByCatAndSubcat",
  async ({ categoryId, subcategoryId }, { rejectWithValue }) => {
    try {
      
      const response = await axios.get(
        `${BASE_URL}/customer/vendor/getallvendor/${categoryId}/${subcategoryId}`
      );
      
      console.log("Response data.data:", response.data?.data);
      
      return response.data.data;
    } catch (error) {
      console.error("API Error:", error);
      console.error("Error response:", error.response?.data);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const vendorSlice = createSlice({
  name: "vendors",
  initialState: {
    vendors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorsByCatAndSubcat.pending, (state) => {
        console.log("Pending state");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorsByCatAndSubcat.fulfilled, (state, action) => {
        console.log("Fulfilled action:", action);
        console.log("Fulfilled payload:", action.payload);
        
        state.loading = false;
        
        // Handle different response structures
        if (action.payload?.data && Array.isArray(action.payload.data)) {
          state.vendors = action.payload.data;
        } else if (Array.isArray(action.payload)) {
          state.vendors = action.payload;
        } else {
          console.warn("Unexpected response structure:", action.payload);
          state.vendors = [];
        }
        
        console.log("Updated vendors in state:", state.vendors);
      })
      .addCase(fetchVendorsByCatAndSubcat.rejected, (state, action) => {
        console.log("Rejected action:", action);
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
        state.vendors = [];
      });
  },
});

export default vendorSlice.reducer;