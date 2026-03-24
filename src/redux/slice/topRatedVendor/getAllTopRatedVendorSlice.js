import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchTopRatedVendors = createAsyncThunk(
  "topRatedVendors/fetchTopRatedVendors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/vendor/getalltoprating`
      );
      return response.data.data;
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