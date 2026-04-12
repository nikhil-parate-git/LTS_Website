// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Environment variable se base URL fetch kar rahe hain
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_URL = `${API_BASE_URL}/customer/customerservice`;

// // Async Thunk: API fetch karne ke liye
// export const fetchServices = createAsyncThunk(
//   "services/fetchServices",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(API_URL);
//       return response.data.data; // API se 'data' array nikal rahe hain
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Something went wrong",
//       );
//     }
//   },
// );

// const serviceSlice = createSlice({
//   name: "services",
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearServiceState: (state) => {
//       state.items = [];
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchServices.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchServices.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchServices.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearServiceState } = serviceSlice.actions;
// export default serviceSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/customer/customerservice`;

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { params: { page } });
      return response.data; // { data: [...], pagination: { total, page, limit, totalPages } }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    items: [],
    loading: false,
    error: null,
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
  },
  reducers: {
    clearServiceState: (state) => {
      state.items = [];
      state.error = null;
      state.pagination = { total: 0, page: 1, limit: 10, totalPages: 1 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearServiceState } = serviceSlice.actions;
export default serviceSlice.reducer;