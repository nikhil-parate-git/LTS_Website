import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const SEARCH_URL = `${API_BASE}/customer/search`;

export const fetchCategoryResults = createAsyncThunk(
  "search/fetchCategoryResults",
  async (keyword, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${SEARCH_URL}/category`, {
        params: { keyword },
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch category results",
      );
    }
  },
);

export const fetchSubcategoryResults = createAsyncThunk(
  "search/fetchSubcategoryResults",
  async (keyword, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${SEARCH_URL}/subcategory`, {
        params: { keyword },
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch subcategory results",
      );
    }
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    categories: [],
    subcategories: [],
    categoryLoading: false,
    subcategoryLoading: false,
    categoryError: null,
    subcategoryError: null,
  },
  reducers: {
    setSearchQuery(state, action) {
      state.query = action.payload;
    },
    clearSearchResults(state) {
      state.categories = [];
      state.subcategories = [];
      state.query = "";
      state.categoryError = null;
      state.subcategoryError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryResults.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })
      .addCase(fetchCategoryResults.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.categories = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCategoryResults.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.payload;
        state.categories = [];
      });

    builder
      .addCase(fetchSubcategoryResults.pending, (state) => {
        state.subcategoryLoading = true;
        state.subcategoryError = null;
      })
      .addCase(fetchSubcategoryResults.fulfilled, (state, action) => {
        state.subcategoryLoading = false;
        state.subcategories = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchSubcategoryResults.rejected, (state, action) => {
        state.subcategoryLoading = false;
        state.subcategoryError = action.payload;
        state.subcategories = [];
      });
  },
});

export const { setSearchQuery, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
