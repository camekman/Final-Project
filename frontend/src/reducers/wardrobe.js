import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageId: null,
  imageName: null,
  imageUrl: null,
  error: null,
};

const wardrobe = createSlice({
  name: "wardrobe",
  initialState,
  reducers: {
    setImageId: (store, action) => {
      store.imageId = action.payload;
    },
    setImageName: (store, action) => {
      store.imageName = action.payload;
    },
    setImageUrl: (store, action) => {
      store.imageUrl = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default wardrobe;
