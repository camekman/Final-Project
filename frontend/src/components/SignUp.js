import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../utils/urls";
import user from "../reducers/user";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signup");
  const [errorMessage, setErrorMessage] = useState(null);

  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);
  console.log(error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/profile");
    }
  }, [accessToken, navigate]);

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
        console.log(data);
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
    <LoginContainer>
      <LoginSection>
        <RadioButtonContainer>
          <label htmlFor="signup">Signup</label>
          <input
            id="signup"
            type="radio"
            checked={mode === "signup"}
            onChange={() => setMode("signup")}
          />
        </RadioButtonContainer>
        <form onSubmit={onFormSubmit}>
          <p> Name: </p>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <p> Username: </p>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <p> Password: </p>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <p> Email: </p>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <ButtonContainer>
            <SubmitButton type="submit">Continue</SubmitButton>
          </ButtonContainer>
          {errorMessage !== null && <p>{error.message}</p>}
        </form>
      </LoginSection>
      <Link to="/">Home</Link>
    </LoginContainer>
  );
};

export default Signup;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: lightskyblue; */
  padding-top: 10px;
  padding-bottom: 20px;
  align-items: center;
`;

const LoginSection = styled.div`
  background-color: lightcoral;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 30px;
  margin: 20px;
  border-radius: 30px;
  border: 1px solid black;
  box-shadow: 5px 5px;
  color: white;
`;

const RadioButtonContainer = styled.div`
  background-color: darkcyan;
  display: flex;
  flex-direction: row;
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const SubmitButton = styled.button`
  padding: 10px;
  border-radius: 10px;
`;
