import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchTopCategories = createAsyncThunk(
  'topCategories/fetchTopCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/customer/keyWordmanagement/getallkeywordmanagement`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch categories");
    }
  }
);

const getTopCategorySlice = createSlice({
  name: 'topCategories',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchTopCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getTopCategorySlice.reducer;