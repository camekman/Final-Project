import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import user from "../reducers/user";
import image from "../reducers/image";
import { API_URL } from "../utils/urls";

const ProfilePage = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const name = useSelector((store) => store.user.name);
  const username = useSelector((store) => store.user.username);

  // const [uploadComplete, setUploadComplete] = useState(false);
  const images = useSelector((store) => store.image.images);
  const fileInput = useRef();
  // const [imageName, setImageName] = useState("");
  // const [profileUrl, setProfileUrl] = useState("");
  // const [profileImage, setProfileImage] = useState("");

  const userId = useSelector((store) => store.user.userId);
  const UPLOAD_URL = `http://localhost:8080/upload/${userId}`;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }, [accessToken]);

  const handleRestart = () => {
    dispatch(user.actions.restart());
  };

  //fetching the profile image

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", fileInput.current.files[0]);
    formData.append("name", name);

    const options = {
      method: "POST",
      body: formData,
    };

    fetch(UPLOAD_URL, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.success) {
          dispatch(image.actions.setImages(json.response));
          // setUploadComplete(true);
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <ProfileContainer>
      <h1>Welcome to your Profile!</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="file"
          ref={fileInput}
          // onChange={(e) => setGalleries(e.target.ref)}
        />
        <ProfilePicture>
          {/* <img scr={imageUrl} alt="" /> */}
          {<img src={images.profileUrl} alt="Upload" />}

          <button type="submit">Continue</button>
        </ProfilePicture>
      </form>
      <Link to="/MyWardrobe">MyWardrobe</Link>
      <Link to="/MyFleeMarketWardrobe">MyFleeMarketWardrobe</Link>
      <Link to="/Moodboard">Moodboard</Link>
      <Link to="/Inspiration">Inspiration</Link>

      <ProfileInfo>
        <p>Name: {name}</p>
        <p>Username: {username}</p>
      </ProfileInfo>
      <Link to="/uploadImage">Upload new image</Link>
      <div>
        <button onClick={handleRestart}>sign out</button>
      </div>
    </ProfileContainer>
  );
};

export default ProfilePage;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: lightskyblue;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;
`;

const ProfilePicture = styled.div`
  border: 3px solid black;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

// const ProfilePictureImage = styled.image`
//   border-radius: 50%;
//   width: 100px;
//   height: 100px;
// `;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: pink;
  padding: 30px;
  margin: 20px;
  border-radius: 15px;
`;
