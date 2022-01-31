import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

const image = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImages: (store, action) => {
      store.images = action.payload;
    },
    addImage: (store, action) => {
      store.images.push(action.payload);
    },
    setCategory: (store, action) => {
      store.images.category(action.payload);
    },
  },
});

export default image;
