import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

/* ──────────────────────────────────────────────────────
   THUNKS
────────────────────────────────────────────────────── */

/** Public — fetch all plans, no auth */
export const fetchPublicPlans = createAsyncThunk(
  "plans/fetchPublic",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE}/customer/plan`, { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch plans");
    }
  }
);

/**
 * Guest purchase — register + pay in one step.
 * POST /api/customer/plan/:planId/payment
 * planId is extracted from payload and put in the URL path.
 */
export const guestPurchasePlan = createAsyncThunk(
  "plans/guestPurchase",
  async (payload, { rejectWithValue }) => {
    try {
      const { planId, ...body } = payload;
      const res = await axios.post(`${BASE}/customer/plan/${planId}/payment`, body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Purchase failed");
    }
  }
);

/* ──────────────────────────────────────────────────────
   SLICE
────────────────────────────────────────────────────── */
const plansSlice = createSlice({
  name: "plans",
  initialState: {
    list:          [],
    loading:       false,
    error:         null,
    pagination:    null,
    paymentInfo:   null,   // { paymentLink, linkId, amount, planName, duration }
    purchasing:    false,
    purchaseError: null,
  },
  reducers: {
    clearPaymentInfo: (state) => { state.paymentInfo  = null; state.purchaseError = null; },
    clearError:       (state) => { state.error        = null; },
  },
  extraReducers: (builder) => {
    builder
      // ── fetch plans ──
      .addCase(fetchPublicPlans.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(fetchPublicPlans.fulfilled, (state, { payload }) => {
        state.loading    = false;
        state.list       = payload.data       || [];
        state.pagination = payload.pagination || null;
      })
      .addCase(fetchPublicPlans.rejected,  (state, { payload }) => {
        state.loading = false;
        state.error   = payload;
      })

      // ── guest purchase ──
      .addCase(guestPurchasePlan.pending,   (state) => { state.purchasing = true;  state.purchaseError = null; })
      .addCase(guestPurchasePlan.fulfilled, (state, { payload }) => {
        state.purchasing  = false;
        state.paymentInfo = payload.data || null;
      })
      .addCase(guestPurchasePlan.rejected,  (state, { payload }) => {
        state.purchasing   = false;
        state.purchaseError = payload;
      });
  },
});

export const { clearPaymentInfo, clearError } = plansSlice.actions;
export default plansSlice.reducer;