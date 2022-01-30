import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

const wardrobe = createSlice({
  name: "wardrobe",
  initialState,
  reducers: {
    setImages: (store, action) => {
      store.images = action.payload;
    },
  },
});

export default wardrobe;
