import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
  return (
    <BackgroundImage>
      <Header>
        <h1>SUSTA</h1>
        <p> Sustainable Fashion Lovers</p>
        <Link to="/aboutUs">WHATS SUSTA?</Link>
      </Header>
      <HomePageContainer>
        <h2>Your virtual wardrobe</h2>
        <ContentContainer>
          <h3>
            <Link to="/SignUp">Signup</Link>
          </h3>
        </ContentContainer>
        <h4>Create a count </h4>
        <p>
          Start organize your cloth -as soon you got the app Creat your
          moodboard, collect inspiration, follow others and much more.
        </p>

        <LinkSection>
          <p>
            Already a member?
            <Link to="/login">Login</Link>
          </p>
        </LinkSection>
      </HomePageContainer>
    </BackgroundImage>
  );
};

export default HomePage;

const BackgroundImage = styled.main`
  background-image: linear-gradient(
    to right,
    rgba(255, 0, 0, 0),
    rgba(255, 0, 0, 1)
  );
  /* background-image: url("./fashion.jpg"); */
  /* background-color: black; */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  height: 100%;
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
const Header = styled.div`
  font-family: "Righteous", cursive;
  color: white;
  /* margin: 0px; */
  margin-bottom: 60px;
  justify-content: center;
  text-align: center;
  /* justify-content: center; */
`;

const HomePageContainer = styled.div`
  width: 60%;
  height: 60%;
  color: white;
  font-family: "Righteous", cursive;
  background-image: linear-gradient(
    to right,
    rgba(255, 0, 0, 0),
    rgba(380, 0, 0, 1)
  );
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 992px) {
    width: auto;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  background-color: lightblue;
  border: 2px solid black;
  border-radius: 20px;
  background-color: white;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 45%;
  padding: 20px;
  margin: 20px;
`;

const LinkSection = styled.div`
  display: flex;
  gap: 50px;
`;
