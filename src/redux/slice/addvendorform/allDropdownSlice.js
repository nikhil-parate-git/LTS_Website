import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Base URL using Vite Environment Variable
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/customer/vendor`;

export const fetchCategories = createAsyncThunk(
  "vendorForm/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch categories.";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const fetchSubCategories = createAsyncThunk(
  "vendorForm/fetchSubCategories",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/categories/${categoryId}/subcategories`,
      );
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch subcategories.";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const fetchBusinessTypes = createAsyncThunk(
  "vendorForm/fetchBusinessTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/business`);
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch business types.";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

const vendorFormSlice = createSlice({
  name: "vendorForm",
  initialState: {
    categories: [],
    categoriesLoading: false,
    categoriesError: null,
    subCategories: [],
    subCategoriesLoading: false,
    subCategoriesError: null,
    businessTypes: [],
    businessTypesLoading: false,
    businessTypesError: null,
  },
  reducers: {
    clearSubCategories(state) {
      state.subCategories = [];
      state.subCategoriesError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = action.payload;
      })
      .addCase(fetchSubCategories.pending, (state) => {
        state.subCategoriesLoading = true;
        state.subCategoriesError = null;
        state.subCategories = [];
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.subCategoriesLoading = false;
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.subCategoriesLoading = false;
        state.subCategoriesError = action.payload;
      })
      .addCase(fetchBusinessTypes.pending, (state) => {
        state.businessTypesLoading = true;
        state.businessTypesError = null;
      })
      .addCase(fetchBusinessTypes.fulfilled, (state, action) => {
        state.businessTypesLoading = false;
        state.businessTypes = action.payload;
      })
      .addCase(fetchBusinessTypes.rejected, (state, action) => {
        state.businessTypesLoading = false;
        state.businessTypesError = action.payload;
      });
  },
});

export const { clearSubCategories } = vendorFormSlice.actions;
export default vendorFormSlice.reducer;
