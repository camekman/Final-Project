import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

const imageProfile = createSlice({
  name: "imageProfile",
  initialState,
  reducers: {
    setImages: (store, action) => {
      store.images = action.payload;
    },
    addImage: (store, action) => {
      store.images.push(action.payload);
    },
  },
});

export default imageProfile;
