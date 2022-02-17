import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { FaHouseUser } from "react-icons/fa";

import { API_URL } from "../utils/urls";
import user from "../reducers/user";

const Login = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signup");
  const [errorMessage, setErrorMessage] = useState(null);

  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/profile");
    }
  }, [accessToken, navigate, setName, setEmail]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, password, email }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setName(data.response.name));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setName(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setEmail(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
            setErrorMessage(data.message);
          });
        }
      });
  };

  return (
    <BackgroundImage>
      <LoginContainer>
        <LoginSection>
          <form onSubmit={onFormSubmit}>
            <StyledFieldset>
              <legend> Username:</legend>
              <StyledInputField
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </StyledFieldset>
            <StyledFieldset>
              <legend>Password: </legend>
              <StyledInputField
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </StyledFieldset>

            <ButtonContainer>
              <RadioButtonContainer>
                <label htmlFor="signin">Sign in</label>
                <input
                  id="signin"
                  type="radio"
                  checked={mode === "signin"}
                  onChange={() => setMode("signin")}
                />
              </RadioButtonContainer>
              <SubmitButton type="submit">Continue</SubmitButton>
            </ButtonContainer>
            {errorMessage !== null && <p>{error.message}</p>}
          </form>
        </LoginSection>
        <Link to="/">
          <FaHouseUser style={{ height: 45, width: 45, color: "white" }} />
        </Link>
      </LoginContainer>
    </BackgroundImage>
  );
};

export default Login;

const BackgroundImage = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-image: url("./assets/background1.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 110vh;
  object-fit: cover;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 110vh;
  padding-top: 10px;
  padding-bottom: 20px;
  align-items: center;
  justify-content: center;
`;

const LoginSection = styled.div`
  background-color: #dcdcdc80;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 40px;
  margin: 20px;
  border-radius: 30px;
  color: rgb(77, 77, 77);
  font-size: 20px;
  @media (min-width: 768px) {
    padding: 60px;
    font-size: 22px;
  }
  @media (min-width: 1024px) {
    width: 400px;
    padding: 40px;
  }
`;

const StyledFieldset = styled.fieldset`
  border: 3px solid rgba(221, 133, 96, 1);
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  margin-bottom: 10px;
  margin-top: 3px;
`;

const StyledInputField = styled.input`
  border: 1px solid transparent;
  width: 70%;
  height: 100%;
  border: none transparent;
  outline: none;
  border-radius: 30px;
  font-size: 20px;
  background-color: transparent;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const RadioButtonContainer = styled.div`
  background-color: rgba(221, 133, 96, 1);
  display: flex;
  flex-direction: row;
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  color: rgb(77, 77, 77);
  font-size: 16px;
  margin-right: 30px;
  @media (min-width: 768px) {
    font-size: 22px;
    align-items: center;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  background-color: rgba(221, 133, 96, 1);
  padding: 15px;
  margin-top: 20px;
  border: transparent;
  border-radius: 10px;
  color: rgb(77, 77, 77);
  font-family: "Righteous", cursive;
  font-size: 16px;
  @media (min-width: 768px) {
    font-size: 24px;
  }
`;
