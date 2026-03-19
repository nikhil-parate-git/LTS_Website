import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTopRatedVendors = createAsyncThunk(
  "topRatedVendors/fetchTopRatedVendors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://local-trade-street-be.onrender.com/api/customer/vendor/getalltoprating"
      );
      return response.data.data; // API response ka 'data' array
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Something went wrong");
    }
  }
);

const getAllTopRatedVendorSlice = createSlice({
  name: "topRatedVendors",
  initialState: {
    vendors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchTopRatedVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getAllTopRatedVendorSlice.reducer;