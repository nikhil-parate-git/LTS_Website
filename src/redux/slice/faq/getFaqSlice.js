// redux/slice/faq/faqSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://local-trade-street-be.onrender.com/api";

// Thunk: categoryId aur city ke basis par FAQs fetch karo
export const fetchFaqsByCategoryAndCity = createAsyncThunk(
  "faq/fetchFaqsByCategoryAndCity",
  async ({ categoryId, city }, { rejectWithValue }) => {
    try {
      const params = {};
      if (city) params.city = city;

      const response = await axios.get(
        `${BASE_URL}/customer/faqs/${categoryId}`,
        { params }
      );
      return response.data.data; // array of faqs
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch FAQs"
      );
    }
  }
);

const faqSlice = createSlice({
  name: "faq",
  initialState: {
    faqs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearFaqs: (state) => {
      state.faqs = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqsByCategoryAndCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaqsByCategoryAndCity.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload;
      })
      .addCase(fetchFaqsByCategoryAndCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFaqs } = faqSlice.actions;
export default faqSlice.reducer;