import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchHomeBanners = createAsyncThunk(
  "banners/fetchHomeBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/banner-management/getallbannerhome`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const getAllCityBannerSlice = createSlice({
  name: "cityBanners",
  initialState: {
    banners: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data;
      })
      .addCase(fetchHomeBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getAllCityBannerSlice.reducer;