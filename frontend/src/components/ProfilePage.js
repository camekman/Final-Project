import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import user from "../reducers/user";

import { API_URL } from "../utils/urls";

const ProfilePage = () => {
  const [imageUrl, setImageUrl] = useState("");
  // const [profileImage, setProfileImage] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);
  const name = useSelector((store) => store.user.name);
  const username = useSelector((store) => store.user.username);

  const images = useSelector((store) => store.image.images);
  // const profileImage = useSelector((store) => store.image.profileImage);

  const fileInput = useRef();
  const userId = useSelector((store) => store.user.userId);

  const UPLOAD_URL = `http://localhost:8080/uploadprofile/${userId}`;

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

    fetch(API_URL(`user/${userId}`), options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }, [accessToken, userId]);

  const handleRestart = () => {
    dispatch(user.actions.restart());
  };

  //fetching the profile image

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", fileInput.current.files[0]);

    const options = {
      method: "POST",
      body: formData,
    };

    // skapa ny upload profile url
    fetch(UPLOAD_URL, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        console.log("hej", json.imageUrl);

        if (json.success) {
          dispatch(user.actions.setImageUrl(imageUrl));

          // dispatch(profileImage.actions.setProfileUrl(json.response));
          // setProfileUrl(json.response);
          //setProfileImage(json.response);

          setImageUrl(json.imageUrl);
        } else {
          // TO DO
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <ProfileContainer>
      <h1>Welcome to your Profile!</h1>

      <form onSubmit={handleFormSubmit}>
        <input type="file" ref={fileInput} />
        <ProfilePicture>
          {/* FUNKAR */}
          {/* <img src={imageUrl} alt="ProfilePicture" /> */}
          <img src={images.imageUrl} alt="ProfilePicture" />
          {/* <img src={images[imageUrl]} alt="ProfilePicture" /> */}

          {/* FUNKAR EJ */}
          {/* <img src={images[images.length - 1].imageUrl} alt="Upload" /> */}
          {/* <img src={profileImage[imageUrl.length - 1].imageUrl} alt="Upload" /> */}

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

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: pink;
  padding: 30px;
  margin: 20px;
  border-radius: 15px;
`;
