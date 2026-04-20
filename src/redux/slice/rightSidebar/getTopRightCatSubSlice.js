// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// export const fetchTopRightCatSub = createAsyncThunk(
//   "topRightCatSub/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/customer/keyWordmanagement/getallmanagement`
//       );
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Something went wrong");
//     }
//   }
// );

// const getTopRightCatSubSlice = createSlice({
//   name: "topRightCatSub",
//   initialState: {
//     data: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTopRightCatSub.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTopRightCatSub.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchTopRightCatSub.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default getTopRightCatSubSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTopRightCatSub = createAsyncThunk(
  "topRightCatSub/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/customer/keyWordmanagement/getallmanagement`,
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const { data, loading } = getState().topRightCatSub;
      if (loading || (data && data.length > 0)) {
        return false; // API call cancel
      }
      return true;
    },
  },
);

const getTopRightCatSubSlice = createSlice({
  name: "topRightCatSub",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRightCatSub.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRightCatSub.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTopRightCatSub.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getTopRightCatSubSlice.reducer;
