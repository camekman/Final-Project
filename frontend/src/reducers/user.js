import { createSlice } from "@reduxjs/toolkit";

// galleries: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Image",
//   },
// ],

const initialState = {
  userId: null,
  name: null,
  username: null,
  galleries: null,
  profileImage: null,
  email: null,
  accessToken: null,
  error: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setName: (store, action) => {
      store.name = action.payload;
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    setGalleries: (store, action) => {
      store.galleries = action.payload;
    },
    setProfileImage: (store, action) => {
      store.profileImage = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    restart: () => {
      return initialState;
    },
  },
});
export default user;

// export const fetchUpload = () => {
//  return (dispatch, getState) =>{
//  fetch('http://localhost:8080/upload/:userId", {
//   method: "POST",
//   body: formData,
//  },
//  )
//  .then((res) => res.json())
//  .then((data) => dispatch(user.actions.setGalleries)))

// }
