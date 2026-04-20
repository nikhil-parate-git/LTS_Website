// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const fetchVendorsByCatAndSubcat = createAsyncThunk(
//   "vendorStore/fetchVendorsByCatAndSubcat",
//   async ({ cateId, subCateId, city }, { rejectWithValue }) => {
//     try {
//       const params = city ? `?city=${encodeURIComponent(city)}` : "";
//       const response = await axios.get(
//         `${BASE_URL}/customer/vendor/getallvendor/${cateId}/${subCateId}${params}`,
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch vendors",
//       );
//     }
//   },
// );

// // ✅ FIXED: correct route from Postman Image 1
// // /customer/banner-management/getallbannersubcategory/CAT-001/SUBCAT-001
// export const fetchSubCategoryBanners = createAsyncThunk(
//   "vendorStore/fetchSubCategoryBanners",
//   async ({ cateId, subCateId }) => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/customer/banner-management/getallbannersubcategory/${cateId}/${subCateId}`,
//       );
//       return response.data;
//     } catch (error) {
//       // Silent fail — banner not critical
//       return { data: [] };
//     }
//   },
// );

// const vendorStoreSlice = createSlice({
//   name: "vendorStore",
//   initialState: {
//     vendors: [],
//     banners: [],
//     loading: false,
//     bannerLoading: false,
//     error: null,
//     subcategoryName: "",
//   },
//   reducers: {
//     clearVendors: (state) => {
//       state.vendors = [];
//       state.banners = [];
//       state.error = null;
//       state.subcategoryName = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchVendorsByCatAndSubcat.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchVendorsByCatAndSubcat.fulfilled, (state, action) => {
//         state.loading = false;
//         const payload = action.payload;
//         state.vendors = Array.isArray(payload?.data)
//           ? payload.data
//           : Array.isArray(payload)
//             ? payload
//             : [];
//         state.subcategoryName = payload?.subcategoryName || "";
//       })
//       .addCase(fetchVendorsByCatAndSubcat.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Something went wrong";
//         state.vendors = [];
//       })
//       .addCase(fetchSubCategoryBanners.pending, (state) => {
//         state.bannerLoading = true;
//       })
//       .addCase(fetchSubCategoryBanners.fulfilled, (state, action) => {
//         state.bannerLoading = false;
//         state.banners = Array.isArray(action.payload?.data)
//           ? action.payload.data
//           : [];
//       })
//       .addCase(fetchSubCategoryBanners.rejected, (state) => {
//         state.bannerLoading = false;
//         state.banners = [];
//       });
//   },
// });

// export const { clearVendors } = vendorStoreSlice.actions;
// export default vendorStoreSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchVendorsByCatAndSubcat = createAsyncThunk(
  "vendorStore/fetchVendorsByCatAndSubcat",
  async ({ cateId, subCateId, city }, { rejectWithValue }) => {
    try {
      const params = city ? `?city=${encodeURIComponent(city)}` : "";
      const response = await axios.get(
        `${BASE_URL}/customer/vendor/getallvendor/${cateId}/${subCateId}${params}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch vendors",
      );
    }
  },
);

export const fetchSubCategoryBanners = createAsyncThunk(
  "vendorStore/fetchSubCategoryBanners",
  async ({ cateId, subCateId }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/banner-management/getallbannersubcategory/${cateId}/${subCateId}`,
      );
      return response.data;
    } catch (error) {
      return { data: [] };
    }
  },
);

const vendorStoreSlice = createSlice({
  name: "vendorStore",
  initialState: {
    vendors: [],
    banners: [],
    loading: false,
    bannerLoading: false,
    error: null,
    subcategoryName: "",
    mongoCatId: null, // ✅ NEW
    mongoSubCatId: null, // ✅ NEW
  },
  reducers: {
    clearVendors: (state) => {
      state.vendors = [];
      state.banners = [];
      state.error = null;
      state.subcategoryName = "";
      state.mongoCatId = null; // ✅ NEW
      state.mongoSubCatId = null; // ✅ NEW
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
        const payload = action.payload;
        state.vendors = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
            ? payload
            : [];
        state.subcategoryName = payload?.subcategoryName || "";
      })
      .addCase(fetchVendorsByCatAndSubcat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.vendors = [];
      })
      .addCase(fetchSubCategoryBanners.pending, (state) => {
        state.bannerLoading = true;
      })
      .addCase(fetchSubCategoryBanners.fulfilled, (state, action) => {
        state.bannerLoading = false;
        state.banners = Array.isArray(action.payload?.data)
          ? action.payload.data
          : [];

        // ✅ Banner response se MongoDB _id save karo
        const firstBanner = action.payload?.data?.[0];
        state.mongoCatId = firstBanner?.categoryId?._id || null;
        state.mongoSubCatId = firstBanner?.subcategoryId?._id || null;
      })
      .addCase(fetchSubCategoryBanners.rejected, (state) => {
        state.bannerLoading = false;
        state.banners = [];
      });
  },
});

export const { clearVendors } = vendorStoreSlice.actions;
export default vendorStoreSlice.reducer;
