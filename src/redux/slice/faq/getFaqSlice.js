// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const fetchFaqsByCategoryAndCity = createAsyncThunk(
//   "faq/fetchFaqsByCategoryAndCity",
//   async ({ categoryId, city }, { rejectWithValue }) => {
//     try {
//       const params = {};
//       if (city) params.city = city;

//       const response = await axios.get(
//         `${BASE_URL}/customer/faqs/${categoryId}`,
//         { params },
//       );
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch FAQs",
//       );
//     }
//   },
// );

// const faqSlice = createSlice({
//   name: "faq",
//   initialState: {
//     faqs: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearFaqs: (state) => {
//       state.faqs = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFaqsByCategoryAndCity.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchFaqsByCategoryAndCity.fulfilled, (state, action) => {
//         state.loading = false;
//         state.faqs = action.payload;
//       })
//       .addCase(fetchFaqsByCategoryAndCity.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearFaqs } = faqSlice.actions;
// export default faqSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ API: GET /customer/faqs/CAT-002?city=Nagpur
// Uses readable cateId — NOT MongoDB _id
export const fetchFaqsByCategoryAndCity = createAsyncThunk(
  "faq/fetchFaqsByCategoryAndCity",
  async ({ cateId, city }, { rejectWithValue }) => {
    try {
      const params = {};
      if (city) params.city = city;

      const response = await axios.get(
        `${BASE_URL}/customer/faqs/${cateId}`,
        { params }
      );
      // API returns: { success, data: [...], pagination: {...} }
      return response.data.data || [];
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
        state.faqs = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchFaqsByCategoryAndCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearFaqs } = faqSlice.actions;
export default faqSlice.reducer;