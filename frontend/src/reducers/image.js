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
    // deleteImage: (store, action) => {
    //   const removeImage = store.images.filter(
    //     (images) => images.id !== action.payload
    //   );
    //   store.images = removeImage;
    // },
  },
});

export default image;

// deleteTodo: (store, action) => {
//   const decreasedItems = store.items.filter(
//     (item) => item.id !== action.payload
//   );
//   store.items = decreasedItems;
// },
