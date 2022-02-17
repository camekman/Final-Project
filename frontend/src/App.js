import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UploadImage from "./components/UploadImage";
import NotFound from "./components/NotFound";
import AboutUs from "./components/AboutUs";
// import Inspiration from "./components/Inspiration";
import MyWardrobe from "./components/MyWardrobe";
import MyFleeMarketWardrobe from "./components/MyFleeMarketWardorbe";
import Moodboard from "./components/Moodboard";
// import Loader from "./components/Loader";
// import DeleteImage from "./components/DeleteImage";

import user from "./reducers/user";
import image from "./reducers/image";

// import ui from "./reducers/ui";

const reducer = combineReducers({
  user: user.reducer,
  image: image.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* <Route path="/Inspiration" element={<Inspiration />} /> */}
            <Route path="/MyWardrobe" element={<MyWardrobe />} />
            <Route
              path="/MyFleeMarketWardrobe"
              element={<MyFleeMarketWardrobe />}
            />
            <Route path="/Moodboard" element={<Moodboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/uploadImage" element={<UploadImage />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};
