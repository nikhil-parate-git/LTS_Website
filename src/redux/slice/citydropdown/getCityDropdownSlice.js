import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchCities = createAsyncThunk('cities/fetchCities', async () => {
  const response = await axios.get(`${BASE_URL}/customer/dropdown`);
  return response.data.data; 
});

const getCityDropdownSlice = createSlice({
  name: 'cityDropdown',
  initialState: {
    cities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getCityDropdownSlice.reducer;