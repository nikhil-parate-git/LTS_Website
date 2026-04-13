// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const fetchVendorById = createAsyncThunk(
//   "vendor/fetchById",
//   async (vendorId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/customer/vendor/getbyidvendor/${vendorId}`
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch vendor details"
//       );
//     }
//   }
// );

// const vendorDetailSlice = createSlice({
//   name: "vendorDetail",
//   initialState: {
//     vendor: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearVendorDetail: (state) => {
//       state.vendor = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchVendorById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchVendorById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.vendor = action.payload.data;
//       })
//       .addCase(fetchVendorById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearVendorDetail } = vendorDetailSlice.actions;
// export default vendorDetailSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ API: /customer/vendor/getbyidvendor/VEN-001 — uses venId directly
export const fetchVendorById = createAsyncThunk(
  "vendorDetail/fetchVendorById",
  async (venId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/vendor/getbyidvendor/${venId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch vendor");
    }
  }
);

const vendorDetailSlice = createSlice({
  name: "vendorDetail",
  initialState: {
    vendor: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearVendorDetail: (state) => {
      state.vendor = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorById.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload?.data || action.payload || null;
      })
      .addCase(fetchVendorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearVendorDetail } = vendorDetailSlice.actions;
export default vendorDetailSlice.reducer;