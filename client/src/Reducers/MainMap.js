import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {latitude: 54.69178014376323,  longitude: 25.27599512080431};

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
