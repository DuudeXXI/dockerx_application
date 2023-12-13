import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = true;

export const introSlice = createSlice({
  name: "intro",
  initialState: { value: initialStateValue },
  reducers: {
    visibility: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { visibility } = introSlice.actions;

export default introSlice.reducer;
