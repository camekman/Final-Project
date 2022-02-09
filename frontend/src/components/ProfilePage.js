import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import user from "../reducers/user";

import { API_URL } from "../utils/urls";

const ProfilePage = () => {
  const fileInput = useRef();
  const [profileImage, setProfileImage] = useState("");

  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken);
  const name = useSelector((store) => store.user.name);
  const username = useSelector((store) => store.user.username);

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

        setProfileImage(json.imageUrl);
      });
  };

  const linkStyle = {
    textDecoration: "none",
    color: "whitesmoke",
  };

  return (
    <ProfileContainer>
      <h1>Welcome to your Profile!</h1>
      <UploadImageSection>
        <form onSubmit={handleFormSubmit}>
          <input type="file" ref={fileInput} />
          <ButtonDiv>
            <button type="submit">Continue</button>
          </ButtonDiv>
        </form>
      </UploadImageSection>
      <ProfileWrapper>
        <ProfilePictureSection>
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
            }}
            src={profileImage}
            alt="ProfilePicture"
          />
        </ProfilePictureSection>
        <ProfileInfo>
          <p>Name: {name}</p>
          <p>Username: {username}</p>
        </ProfileInfo>
      </ProfileWrapper>
      <ContentSection>
        <ContentWrapper>
          <Link to="/MyWardrobe" style={linkStyle}>
            MyWardrobe
          </Link>
        </ContentWrapper>
        <ContentWrapper>
          <Link to="/Moodboard" style={linkStyle}>
            Moodboard
          </Link>
        </ContentWrapper>
        <ContentWrapper>
          <Link to="/uploadImage" style={linkStyle}>
            Upload new image
          </Link>
        </ContentWrapper>
      </ContentSection>
      <div>
        <SignOutButton onClick={handleRestart}>Sign out</SignOutButton>
      </div>
    </ProfileContainer>
  );
};

export default ProfilePage;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid black;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;
`;

const UploadImageSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid blue;
  align-items: center;
  text-align: center;
`;

const ButtonDiv = styled.div`
  display: flex;
  border: 2px solid red;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const ProfilePictureSection = styled.div`
  display: flex;
  border: 2px solid green;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid blue;
  justify-content: center;
  margin: 10px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  border: 2px solid red;
`;

const ContentSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 2px solid black;
  align-content: center;
  justify-content: center;
  padding: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 30px;
  background-color: rgba(221, 133, 96, 1);
  border-radius: 30px;
  padding: 20px;
  margin: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const SignOutButton = styled.button`
  display: flex;
  background-color: rgba(221, 133, 96, 1);
  padding: 10px;
  margin-top: 20px;
  border: transparent;
  border-radius: 10px;
  color: whitesmoke;
  font-family: "Righteous", cursive;
  font-size: 14px;
`;
