import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    dataArray: [],
  },
  reducers: {
    setDataArray(state, action) {
      state.dataArray = action.payload;
    },
  },
});

export const { setDataArray } = dataSlice.actions;
export default dataSlice.reducer;
