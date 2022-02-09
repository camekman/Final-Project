import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

const image = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImages: (store, action) => {
      console.log(action.payload);
      store.images = action.payload;
    },
    addImage: (store, action) => {
      store.images.push(action.payload);
    },
    setId: (store, action) => {
      store.images.id(action.payload);
    },
    addCategory: (store, action) => {
      store.images.push(action.payload);
    },
    deleteImage: (store, action) => {
      store.images = store.images.filter(
        (image) => image.id !== action.payload
      );
    },
    addMoodImage: (store, action) => {
      const existingImages = store.images.filter(
        (image) => image.id === action.payload.id
      );
      if (existingImages) {
        existingImages.quantity += 1;
      } else {
        store.images.push({ ...action.payload, quantity: 1 });
      }
    },
  },
});

export default image;
