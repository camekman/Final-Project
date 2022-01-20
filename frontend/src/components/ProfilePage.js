import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import user from "../reducers/user";
import { API_URL } from "../utils/urls";

const ProfilePage = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

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
    <div>
      <h1>Welcome to your Profile!</h1>
      <div>
        <button onClick={handleRestart}>sign out</button>
      </div>
    </div>
  );
};

export default ProfilePage;
