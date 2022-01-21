import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import user from "../reducers/user";
import { API_URL } from "../utils/urls";

const ProfilePage = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const name = useSelector((store) => store.user.name);
  const username = useSelector((store) => store.user.username);

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

  return (
    <ProfileContainer>
      <h1>Welcome to your Profile!</h1>
      <ProfilePicture>profile picture</ProfilePicture>
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
