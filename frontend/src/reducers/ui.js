import { createSlice } from "@reduxjs/toolkit";

const ui = createSlice({
  name: "ui",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default ui;
