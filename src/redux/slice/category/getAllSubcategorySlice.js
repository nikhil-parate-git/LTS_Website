
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchSubcategories = createAsyncThunk(
  "subcategory/fetchSubcategories",
  async (Id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/customer/subcategory/${Id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const fetchCategoryBanners = createAsyncThunk(
  "subcategory/fetchCategoryBanners",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/banner-management/getallbannercategory/${categoryId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch banners");
    }
  }
);

const subcategorySlice = createSlice({
  name: "subcategory",
  initialState: {
    subcategories: [],
    banners: [],
    categoryName: "",
    loading: false,
    bannerLoading: false, 
    error: null,
  },
  reducers: {
    clearSubcategories: (state) => {
      state.subcategories = [];
      state.banners = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload.data;
        state.categoryName = action.payload.message.replace("fetched successfully", "").trim();
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategoryBanners.pending, (state) => {
        state.bannerLoading = true;
      })
      .addCase(fetchCategoryBanners.fulfilled, (state, action) => {
        state.bannerLoading = false;
        state.banners = action.payload.data;
      })
      .addCase(fetchCategoryBanners.rejected, (state) => {
        state.bannerLoading = false;
      });
  },
});

export const { clearSubcategories } = subcategorySlice.actions;
export default subcategorySlice.reducer;