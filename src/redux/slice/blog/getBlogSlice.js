// // src/redux/slice/blog/blogSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = "https://local-trade-street-be.onrender.com/api/customer/blog/getall";
// export const LIMIT = 5;

// // ── Thunk ─────────────────────────────────────────────────────────────────────
// // categoryId  → single category API call  (backend pagination)
// // categoryIds → "All" selected: parallel fetch all, then client-paginate
// export const fetchBlogsByCategory = createAsyncThunk(
//   "blogs/fetchByCategory",
//   async ({ categoryId, categoryIds = [], page = 1 }, { rejectWithValue }) => {
//     try {
//       if (categoryId) {
//         // ── Single category: use backend pagination ──────────────────────────
//         const res = await axios.get(
//           `${BASE_URL}/${categoryId}?page=${page}&limit=${LIMIT}`
//         );
//         return {
//           blogs: res.data.data || [],
//           pagination: res.data.pagination || null,
//           allBlogsForAll: null,
//         };
//       } else {
//         // ── "All": fetch every category page-1 in parallel ──────────────────
//         const requests = categoryIds.map((id) =>
//           axios
//             .get(`${BASE_URL}/${id}?page=1&limit=100`)
//             .catch(() => ({ data: { data: [] } }))
//         );
//         const results = await Promise.all(requests);
//         const allBlogs = results.flatMap((r) => r.data?.data || []);

//         // client-side pagination
//         const total = allBlogs.length;
//         const totalPages = Math.ceil(total / LIMIT) || 1;
//         const start = (page - 1) * LIMIT;
//         const paginated = allBlogs.slice(start, start + LIMIT);

//         return {
//           blogs: paginated,
//           pagination: { total, page, limit: LIMIT, totalPages },
//           allBlogsForAll: allBlogs,
//         };
//       }
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || "Failed to fetch blogs"
//       );
//     }
//   }
// );

// // ── Slice ─────────────────────────────────────────────────────────────────────
// const blogSlice = createSlice({
//   name: "blogs",
//   initialState: {
//     blogs: [],
//     allBlogsCache: [],   // full merged list when "All" is active
//     loading: false,
//     error: null,
//     pagination: null,
//     currentPage: 1,
//   },
//   reducers: {
//     // Navigate pages on the client-cached "All" list without a new API call
//     paginateAllBlogs(state, action) {
//       const page = action.payload;
//       const start = (page - 1) * LIMIT;
//       state.blogs = state.allBlogsCache.slice(start, start + LIMIT);
//       state.currentPage = page;
//       if (state.pagination) {
//         state.pagination = { ...state.pagination, page };
//       }
//     },
//     clearBlogs(state) {
//       state.blogs = [];
//       state.allBlogsCache = [];
//       state.error = null;
//       state.pagination = null;
//       state.currentPage = 1;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBlogsByCategory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBlogsByCategory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.blogs = action.payload.blogs;
//         state.pagination = action.payload.pagination;
//         state.currentPage = action.payload.pagination?.page || 1;
//         if (action.payload.allBlogsForAll) {
//           state.allBlogsCache = action.payload.allBlogsForAll;
//         } else {
//           state.allBlogsCache = [];
//         }
//       })
//       .addCase(fetchBlogsByCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.blogs = [];
//       });
//   },
// });

// export const { paginateAllBlogs, clearBlogs } = blogSlice.actions;
// export default blogSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BASE_URL = `${API_BASE_URL}/customer/blog/getall`;
const DETAIL_URL = `${API_BASE_URL}/customer/blog/getbyid`;

export const LIMIT = 5;

export const fetchBlogsByCategory = createAsyncThunk(
  "blogs/fetchByCategory",
  async ({ categoryId, categoryIds = [], page = 1 }, { rejectWithValue }) => {
    try {
      if (categoryId) {
        const res = await axios.get(
          `${BASE_URL}/${categoryId}?page=${page}&limit=${LIMIT}`,
        );
        return {
          mode: "single",
          blogs: res.data.data || [],
          pagination: res.data.pagination || null,
          groupedByCategory: null,
        };
      } else {
        const requests = categoryIds.map((id) =>
          axios
            .get(`${BASE_URL}/${id}?page=1&limit=${LIMIT}`)
            .catch(() => ({ data: { data: [], pagination: null } })),
        );
        const results = await Promise.all(requests);

        const grouped = results
          .map((r, i) => ({
            categoryId: categoryIds[i],
            blogs: r.data?.data || [],
            pagination: r.data?.pagination || null,
          }))
          .filter((g) => g.blogs.length > 0);

        return {
          mode: "all",
          blogs: [],
          pagination: null,
          groupedByCategory: grouped,
        };
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch blogs",
      );
    }
  },
);

export const fetchMoreForCategory = createAsyncThunk(
  "blogs/fetchMoreForCategory",
  async ({ categoryId, page }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/${categoryId}?page=${page}&limit=${LIMIT}`,
      );
      return {
        categoryId,
        blogs: res.data.data || [],
        pagination: res.data.pagination || null,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchBlogById = createAsyncThunk(
  "blogs/fetchById",
  async ({ categoryId, blogId }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${DETAIL_URL}/${categoryId}/${blogId}`);
      return res.data.data || null;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch blog",
      );
    }
  },
);

export const paginateAllBlogs = (page) => (dispatch, getState) => {
  dispatch(blogSlice.actions._paginateAll(page));
};

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    mode: "all",
    blogs: [],
    groupedByCategory: [],
    allBlogsCache: [],
    loading: false,
    error: null,
    pagination: null,
    currentPage: 1,
    categoryLoadingMap: {},
    // single blog detail
    currentBlog: null,
    blogDetailLoading: false,
    blogDetailError: null,
  },
  reducers: {
    _paginateAll(state, action) {
      const page = action.payload;
      const start = (page - 1) * LIMIT;
      state.blogs = state.allBlogsCache.slice(start, start + LIMIT);
      state.currentPage = page;
      if (state.pagination) state.pagination = { ...state.pagination, page };
    },
    clearBlogs(state) {
      state.blogs = [];
      state.groupedByCategory = [];
      state.allBlogsCache = [];
      state.error = null;
      state.pagination = null;
      state.currentPage = 1;
      state.categoryLoadingMap = {};
    },
    clearBlogDetail(state) {
      state.currentBlog = null;
      state.blogDetailLoading = false;
      state.blogDetailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── fetchBlogsByCategory ─────────────────────────────────────────────
      .addCase(fetchBlogsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.mode = action.payload.mode;

        if (action.payload.mode === "single") {
          state.blogs = action.payload.blogs;
          state.pagination = action.payload.pagination;
          state.currentPage = action.payload.pagination?.page || 1;
          state.groupedByCategory = [];
        } else {
          state.groupedByCategory = action.payload.groupedByCategory || [];
          state.blogs = [];
          state.pagination = null;
        }
      })
      .addCase(fetchBlogsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.blogs = [];
        state.groupedByCategory = [];
      })

      // ── fetchMoreForCategory ─────────────────────────────────────────────
      .addCase(fetchMoreForCategory.pending, (state, action) => {
        const catId = action.meta.arg.categoryId;
        state.categoryLoadingMap[catId] = true;
      })
      .addCase(fetchMoreForCategory.fulfilled, (state, action) => {
        const { categoryId, blogs, pagination } = action.payload;
        state.categoryLoadingMap[categoryId] = false;

        const idx = state.groupedByCategory.findIndex(
          (g) => g.categoryId === categoryId,
        );
        if (idx !== -1) {
          const existingIds = new Set(
            state.groupedByCategory[idx].blogs.map((b) => b._id),
          );
          const newBlogs = blogs.filter((b) => !existingIds.has(b._id));
          state.groupedByCategory[idx].blogs = [
            ...state.groupedByCategory[idx].blogs,
            ...newBlogs,
          ];
          state.groupedByCategory[idx].pagination = pagination;
        }
      })
      .addCase(fetchMoreForCategory.rejected, (state, action) => {
        const catId = action.meta.arg.categoryId;
        state.categoryLoadingMap[catId] = false;
      })

      // ── fetchBlogById ────────────────────────────────────────────────────
      .addCase(fetchBlogById.pending, (state) => {
        state.blogDetailLoading = true;
        state.blogDetailError = null;
        state.currentBlog = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.blogDetailLoading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.blogDetailLoading = false;
        state.blogDetailError = action.payload;
      });
  },
});

export const { clearBlogs, clearBlogDetail } = blogSlice.actions;
export default blogSlice.reducer;
