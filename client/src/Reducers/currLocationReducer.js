import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

export const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState: { value: initialStateValue },
  reducers: {
    updateLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateLocation } = currentLocationSlice.actions;
export const selectUserLocation = (state) => state.currentLocation.value;

export default currentLocationSlice.reducer;
