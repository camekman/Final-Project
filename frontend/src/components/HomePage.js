import React from "react";
import { Link } from "react-router-dom";
import { FaRecycle } from "react-icons/fa";
import styled from "styled-components";

const HomePage = () => {
  const linkStyle = {
    textDecoration: "none",
    color: "whitesmoke",
  };

  return (
    <BackgroundImage>
      <HomePageWrapper>
        <Header>
          <Logo>SUSTA</Logo>

          <IconStyled>
            <FaRecycle
              style={{
                height: 100,
                width: 100,
                color: "rgba(221, 133, 96, 1)",
              }}
            />
          </IconStyled>
          {/* <img src="../assets/recycle.png" alt="icon" /> */}
        </Header>

        <HomePageContainer>
          <ContentContainer>
            <h3>
              <Link style={linkStyle} to="/SignUp">
                Signup
              </Link>
            </h3>
          </ContentContainer>

          <ContentContainer>
            <h3>
              <Link style={linkStyle} to="/Login">
                Login
              </Link>
            </h3>
          </ContentContainer>
        </HomePageContainer>
      </HomePageWrapper>
    </BackgroundImage>
  );
};

export default HomePage;

const BackgroundImage = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-image: url("./assets/background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 110vh;
  object-fit: cover;
`;
const Header = styled.div`
  font-family: "Righteous", cursive;
  color: white;
  margin-bottom: 60px;
  justify-content: center;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.h3`
  font-size: 100px;
  margin-top: 135px;
  color: darkblue;
  margin-bottom: 0px;
`;

const IconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const HomePageContainer = styled.main`
  display: flex;
  font-family: "Righteous", cursive;
  padding: 20px;
  align-items: center;
  align-self: center;
  justify-content: center;
  position: absolute;
  bottom: 5px;
  width: 80%;
  @media (min-width: 992px) {
    width: auto;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  border-radius: 20px;
  background-color: rgba(221, 133, 96, 0.612);
  text-align: center;
  color: whitesmoke;
  align-items: center;
  justify-content: center;
  width: 35%;
  padding: 5px;
  margin: 10px;
`;
