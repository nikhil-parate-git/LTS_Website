import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;

/* ──────────────────────────────────────────────────────
   THUNKS
────────────────────────────────────────────────────── */

/** Public — no auth header needed */
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
 

/** Guest purchase — register + pay in one step */
export const guestPurchasePlan = createAsyncThunk(
  "plans/guestPurchase",
  async (payload, { rejectWithValue }) => {
    try {
      console.log('payload',payload)
      const res = await axios.post(`${BASE}/customer/plan/${payload?.planId}/payment`, payload);
      return res.data;
    } catch (err) {
      console.log(err)
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
    list:         [],
    loading:      false,
    error:        null,
    pagination:   null,
    paymentInfo:  null,  // { paymentLink, linkId, amount, planName, duration }
    purchasing:   false,
    purchaseError:null,
  },
  reducers: {
    clearPaymentInfo: (state) => { state.paymentInfo = null; state.purchaseError = null; },
    clearError:       (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    const loading  = (state) => { state.loading = true;  state.error = null; };
    const failed   = (state, action) => { state.loading = false; state.error = action.payload; };

    builder
      // public fetch
      .addCase(fetchPublicPlans.pending,   loading)
      .addCase(fetchPublicPlans.fulfilled, (state, action) => {
        state.loading    = false;
        state.list       = action.payload.data       || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchPublicPlans.rejected,  failed)

      // guest purchase
      .addCase(guestPurchasePlan.pending,   (state) => { state.purchasing = true; state.purchaseError = null; })
      .addCase(guestPurchasePlan.fulfilled, (state, action) => {
        state.purchasing  = false;
        state.paymentInfo = action.payload.data || null;
      })
      .addCase(guestPurchasePlan.rejected,  (state, action) => {
        state.purchasing   = false;
        state.purchaseError = action.payload;
      })
  },
});

export const { clearPaymentInfo, clearError } = plansSlice.actions;
export default plansSlice.reducer;