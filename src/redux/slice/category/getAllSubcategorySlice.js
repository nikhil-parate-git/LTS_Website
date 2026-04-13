// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const fetchSubcategories = createAsyncThunk(
//   "subcategory/fetchSubcategories",
//   async (Id, { rejectWithValue, getState, dispatch }) => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/customer/subcategory/${Id}`,
//       );

//       let allCategories = getState()?.categories?.categories || [];

//       if (allCategories.length === 0) {
//         try {
//           const catResponse = await axios.get(`${BASE_URL}/customer/category`);
//           allCategories = catResponse.data?.data || [];
//         } catch (_) {
//           allCategories = [];
//         }
//       }

//       const matchedCategory = allCategories.find(
//         (cat) => (cat._id || cat.id) === Id,
//       );
//       const categoryName = matchedCategory?.name || "";

//       return { ...response.data, resolvedCategoryName: categoryName };
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Something went wrong",
//       );
//     }
//   },
// );

// export const fetchCategoryBanners = createAsyncThunk(
//   "subcategory/fetchCategoryBanners",
//   async (categoryId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/customer/banner-management/getallbannercategory/${categoryId}`,
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch banners",
//       );
//     }
//   },
// );

// const subcategorySlice = createSlice({
//   name: "subcategory",
//   initialState: {
//     subcategories: [],
//     banners: [],
//     categoryName: "",
//     loading: false,
//     bannerLoading: false,
//     error: null,
//   },
//   reducers: {
//     clearSubcategories: (state) => {
//       state.subcategories = [];
//       state.banners = [];
//       state.categoryName = "";
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSubcategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSubcategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.subcategories = action.payload.data;
//         state.categoryName = action.payload.resolvedCategoryName || "";
//       })
//       .addCase(fetchSubcategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchCategoryBanners.pending, (state) => {
//         state.bannerLoading = true;
//       })
//       .addCase(fetchCategoryBanners.fulfilled, (state, action) => {
//         state.bannerLoading = false;
//         state.banners = Array.isArray(action.payload.data)
//           ? action.payload.data
//           : [];
//       })
//       .addCase(fetchCategoryBanners.rejected, (state) => {
//         state.bannerLoading = false;
//         state.banners = [];
//       });
//   },
// });

// export const { clearSubcategories } = subcategorySlice.actions;
// export default subcategorySlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchSubcategories = createAsyncThunk(
  "subcategory/fetchSubcategories",
  async (cateId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/subcategory/${cateId}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subcategories",
      );
    }
  },
);

export const fetchCategoryBanners = createAsyncThunk(
  "subcategory/fetchCategoryBanners",
  async (cateId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/banner/category/${cateId}`,
      );
      return response.data;
    } catch (error) {
      y;
      return { data: [] };
    }
  },
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
      state.categoryName = "";
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
        const payload = action.payload;
        // API returns: { success: true, data: [...subcategories] }
        if (Array.isArray(payload?.data)) {
          state.subcategories = payload.data;
          state.categoryName = payload.categoryName || "";
        } else if (Array.isArray(payload)) {
          state.subcategories = payload;
        } else {
          state.subcategories = [];
        }
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(fetchCategoryBanners.pending, (state) => {
        state.bannerLoading = true;
      })
      .addCase(fetchCategoryBanners.fulfilled, (state, action) => {
        state.bannerLoading = false;
        state.banners = Array.isArray(action.payload?.data)
          ? action.payload.data
          : [];
      })
      .addCase(fetchCategoryBanners.rejected, (state) => {
        state.bannerLoading = false;
        state.banners = [];
      });
  },
});

export const { clearSubcategories } = subcategorySlice.actions;
export default subcategorySlice.reducer;
