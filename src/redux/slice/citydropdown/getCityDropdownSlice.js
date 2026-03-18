import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCities = createAsyncThunk('cities/fetchCities', async () => {
  const response = await axios.get('https://local-trade-street-be.onrender.com/api/customer/dropdown');
  // API response structure ke hisaab se data return karein
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