import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    // LocalStorage se uthayega, warna default Nagpur
    selectedCity: localStorage.getItem("selectedCity") || "Nagpur", 
  },
  reducers: {
    setCity: (state, action) => {
      state.selectedCity = action.payload;
      localStorage.setItem("selectedCity", action.payload); // Save takki refresh par na jaye
    },
  },
});

export const { setCity } = locationSlice.actions;
export default locationSlice.reducer;