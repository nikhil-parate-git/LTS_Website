import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    selectedCity: localStorage.getItem("selectedCity") || "Nagpur", 
  },
  reducers: {
    setCity: (state, action) => {
      state.selectedCity = action.payload;
      localStorage.setItem("selectedCity", action.payload);
    },
  },
});

export const { setCity } = locationSlice.actions;
export default locationSlice.reducer;