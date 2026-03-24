import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchVendorsByCatAndSubcat = createAsyncThunk(
  "vendors/fetchByCatAndSubcat",
  async ({ categoryId, subcategoryId, city }, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/vendor/getallvendor/${categoryId}/${subcategoryId}?city=${city}`
      );

      let subcategoryName = "";
      const allSubcategories = getState()?.subcategory?.subcategories || [];
      const matched = allSubcategories.find(
        (s) => (s._id || s.id) === subcategoryId
      );
      subcategoryName = matched?.name || "";

      if (!subcategoryName) {
        try {
          const subRes = await axios.get(
            `${BASE_URL}/customer/subcategory/${categoryId}`
          );
          const subs = subRes.data?.data || [];
          const found = subs.find((s) => (s._id || s.id) === subcategoryId);
          subcategoryName = found?.name || "";
        } catch (_) {
          subcategoryName = "";
        }
      }

      return { vendorData: response.data.data, subcategoryName };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const fetchSubCategoryBanners = createAsyncThunk(
  "vendors/fetchSubCategoryBanners",
  async ({ categoryId, subcategoryId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/banner-management/getallbannersubcategory/${categoryId}/${subcategoryId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subcategory banners"
      );
    }
  }
);

const vendorSlice = createSlice({
  name: "vendors",
  initialState: {
    vendors: [],
    banners: [],
    subcategoryName: "",
    loading: false,
    bannerLoading: false,
    error: null,
  },
  reducers: {
    clearVendorData: (state) => {
      state.vendors = [];
      state.banners = [];
      state.subcategoryName = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorsByCatAndSubcat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorsByCatAndSubcat.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategoryName = action.payload.subcategoryName || "";
        const vendorData = action.payload.vendorData;
        if (vendorData?.data && Array.isArray(vendorData.data)) {
          state.vendors = vendorData.data;
        } else if (Array.isArray(vendorData)) {
          state.vendors = vendorData;
        } else {
          state.vendors = [];
        }
      })
      .addCase(fetchVendorsByCatAndSubcat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
        state.vendors = [];
      })

      .addCase(fetchSubCategoryBanners.pending, (state) => {
        state.bannerLoading = true;
      })
      .addCase(fetchSubCategoryBanners.fulfilled, (state, action) => {
        state.bannerLoading = false;
        state.banners = (action.payload.data || []).map((banner) => ({
          ...banner,
          image: banner.bannerImage,
        }));
      })
      .addCase(fetchSubCategoryBanners.rejected, (state) => {
        state.bannerLoading = false;
      });
  },
});

export const { clearVendorData } = vendorSlice.actions;
export default vendorSlice.reducer;