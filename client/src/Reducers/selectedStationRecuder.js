import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = null;

export const selectedStationSlice = createSlice({
  name: "selectedStation",
  initialState: { value: initialStateValue },
  reducers: {
    updateSelectedStation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateSelectedStation } = selectedStationSlice.actions;
export const selectStation = (state) => state.selectedStation.value;

export default selectedStationSlice.reducer;
