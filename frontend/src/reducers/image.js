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
      store.images.category(action.payload);
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

// deleteTodo: (store, action) => {
//   const decreasedItems = store.items.filter(
//     (item) => item.id !== action.payload
//   );
//   store.items = decreasedItems;
// },

// addItem: (state, action) => {
//   const existingProducts = state.items.find(
//     (item) => item.id === action.payload.id
//   );
//   if (existingProducts) {
//     existingProducts.quantity += 1;
//   } else {
//     state.items.push({ ...action.payload, quantity: 1 });
//   }
// },
