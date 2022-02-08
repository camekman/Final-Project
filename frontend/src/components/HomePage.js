import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import fashionbackground from "./assets/fashionbackground.jpg";

const HomePage = () => {
  return (
    <BackgroundImage>
      <Header>
        <h1>SUSTA</h1>
        <p> Sustainable Fashion Lovers</p>
        <Link to="/aboutUs">WHATS SUSTA?</Link>
      </Header>
      <HomePageContainer>
        <Header>Your virtual wardrobe</Header>
       
        <Header>Create a count </Header>
         <ContentContainer>
          <h3>
            <Link to="/SignUp">Signup</Link>
          </h3>
        </ContentContainer>
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 700px;
  background-image: url("./assets/background.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 110vh;
`;
const Header = styled.div`
  font-family: "Righteous", cursive;
  color: white;
  /* margin: 0px; */
  margin-bottom: 60px;
  justify-content: center;
  text-align: center;
  /* justify-content: center; */

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const HomePageContainer = styled.main`
  
  color: black;
  font-family: "Righteous", cursive;
   /* background-image: url("./assets/background.png"); */
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
  padding: 5px;
  margin: 5px;

`;



const LinkSection = styled.div`
color: black;
  display: flex;
  gap: 50px;
`;
