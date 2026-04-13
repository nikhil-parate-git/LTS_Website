// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// export const fetchAllCategories = createAsyncThunk(
//   "categories/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/customer/category`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const getAllCategorySlice = createSlice({
//   name: "categories",
//   initialState: {
//     categories: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllCategories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAllCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categories = action.payload.data;
//       })
//       .addCase(fetchAllCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Something went wrong";
//       });
//   },
// });

// export default getAllCategorySlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/customer/category`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const getAllCategorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        // Normalise: { data: [...] } or just [...]
        state.categories = Array.isArray(action.payload?.data)
          ? action.payload.data
          : Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export default getAllCategorySlice.reducer;