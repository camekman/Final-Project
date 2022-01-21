import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
  return (
    <HomePageContainer>
      <h1>Welcome to the homepage!</h1>
      <ContentContainer>
        <h3>content</h3>
      </ContentContainer>
      <ContentContainer>
        <h3>content</h3>
      </ContentContainer>
      <ContentContainer>
        <h3>content</h3>
      </ContentContainer>
      <ContentContainer>
        <h3>content</h3>
      </ContentContainer>
      <LinkSection>
        <Link to="/login">Login</Link>
        <Link to="/aboutUs">About Us</Link>
      </LinkSection>
    </HomePageContainer>
  );
};

export default HomePage;

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid pink;
  background-color: lightblue;
  align-items: center;
  text-align: center;
  padding: 30px;
`;

const ContentContainer = styled.div`
  display: flex;
  background-color: lightblue;
  border: 2px solid black;
  border-radius: 20px;
  background-color: darkcyan;
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
