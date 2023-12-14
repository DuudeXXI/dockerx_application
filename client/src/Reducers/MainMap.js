import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {lat: 54.69178014444323,  lng: 25.2759951244431};

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

export default currentLocationSlice.reducer;
