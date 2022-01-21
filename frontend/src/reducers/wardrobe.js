import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageId: null,
  name: null,
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
    setName: (store, action) => {
      store.name = action.payload;
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
