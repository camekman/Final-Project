import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import user from "../reducers/user";
import profileImage from "../reducers/profileImage";

import { API_URL } from "../utils/urls";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState("");
  //const [uploadComplete, setUploadComplete] = useState(false);

  const accessToken = useSelector((store) => store.user.accessToken);
  const name = useSelector((store) => store.user.name);
  const username = useSelector((store) => store.user.username);

  const image = useSelector((store) => store.profileImage.images);
  // const images = useSelector((store) => store.image.profileImage);

  const fileInput = useRef();
  const userId = useSelector((store) => store.user.userId);

  const UPLOAD_URL = `http://localhost:8080/profile/${userId}`;

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

    fetch(API_URL(`user/${userId}/profile`), options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.success) {
          setProfileImage(json.response.imageUrl);
        }
      });
  }, [accessToken, userId, dispatch]);

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
        // dispatch(user.actions.setProfileImage(json.response));

        //dispatch(profileImage.actions.setImages(json.response));

        setProfileImage(json.imageUrl);
        //setUploadComplete(true);
      });
  };

  return (
    <ProfileContainer>
      <h1>Welcome to your Profile!</h1>

      <form onSubmit={handleFormSubmit}>
        <input type="file" ref={fileInput} />
        <ProfilePicture>
          <button type="submit">Continue</button>
        </ProfilePicture>
      </form>
      <div>
        <img
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
          }}
          src={profileImage}
          alt="ProfilePicture"
        />
      </div>
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
  /* border: 3px solid black;
  border-radius: 50%; */
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
