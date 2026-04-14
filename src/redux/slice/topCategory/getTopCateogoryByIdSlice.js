// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// export const fetchCategoryById = createAsyncThunk(
//   'categoryById/fetchCategoryById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/customer/keyWordmanagement/getbyidkeywordmanagement/${id}`);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch data");
//     }
//   }
// );

// const getTopCategoryByIdSlice = createSlice({
//   name: 'categoryById',
//   initialState: {
//     categoryData: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetCategoryData: (state) => {
//       state.categoryData = [];
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategoryById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCategoryById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categoryData = action.payload;
//       })
//       .addCase(fetchCategoryById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetCategoryData } = getTopCategoryByIdSlice.actions;
// export default getTopCategoryByIdSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// API already accepts cateId like CAT-003 — no change needed in endpoint
export const fetchCategoryById = createAsyncThunk(
  'categoryById/fetchCategoryById',
  async (cateId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/keyWordmanagement/getbyidkeywordmanagement/${cateId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch data"
      );
    }
  }
);

const getTopCategoryByIdSlice = createSlice({
  name: 'categoryById',
  initialState: {
    categoryData: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetCategoryData: (state) => {
      state.categoryData = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryData = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCategoryData } = getTopCategoryByIdSlice.actions;
export default getTopCategoryByIdSlice.reducer;