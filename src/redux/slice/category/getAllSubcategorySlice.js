// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const fetchSubcategories = createAsyncThunk(
//   "subcategory/fetchSubcategories",
//   async (Id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/customer/subcategory/${Id}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Something went wrong");
//     }
//   }
// );

// export const fetchCategoryBanners = createAsyncThunk(
//   "subcategory/fetchCategoryBanners",
//   async (categoryId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/customer/banner-management/getallbannercategory/${categoryId}`
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch banners");
//     }
//   }
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
//         state.categoryName = action.payload.message.replace("fetched successfully", "").trim();
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
//         state.banners = action.payload.data;
//       })
//       .addCase(fetchCategoryBanners.rejected, (state) => {
//         state.bannerLoading = false;
//       });
//   },
// });

// export const { clearSubcategories } = subcategorySlice.actions;
// export default subcategorySlice.reducer;


//Fix code
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchSubcategories = createAsyncThunk(
  "subcategory/fetchSubcategories",
  async (Id, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/subcategory/${Id}`,
      );

      // ── Try to resolve category name from already-loaded categories ──
      let allCategories = getState()?.categories?.categories || [];

      // ── If categories not loaded yet (e.g. page refresh), fetch them now ──
      if (allCategories.length === 0) {
        try {
          const catResponse = await axios.get(`${BASE_URL}/customer/category`);
          allCategories = catResponse.data?.data || [];
        } catch (_) {
          allCategories = [];
        }
      }

      const matchedCategory = allCategories.find(
        (cat) => (cat._id || cat.id) === Id,
      );
      const categoryName = matchedCategory?.name || "";

      return { ...response.data, resolvedCategoryName: categoryName };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

export const fetchCategoryBanners = createAsyncThunk(
  "subcategory/fetchCategoryBanners",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/banner-management/getallbannercategory/${categoryId}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch banners",
      );
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
        state.subcategories = action.payload.data;
        state.categoryName = action.payload.resolvedCategoryName || "";
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
        state.banners = Array.isArray(action.payload.data)
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
