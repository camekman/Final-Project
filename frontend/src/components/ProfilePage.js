import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { useOnClickOutside } from "./hooks";
import GlobalStyles from "./global";

import { theme } from "./theme";

import Magasin from "./Magasin";
import HamburgerMenu from "./HamburgerMenu";
import Menu from "./Menu";
import FocusLock from "react-focus-lock";
import { API_URL } from "../utils/urls";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

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

  useOnClickOutside(node, () => setOpen(false));

  return (
    <BackgroundImage>
      <ProfileContainer>
        <ProfileWrapper>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyles />
              <div ref={node}>
                <FocusLock disabled={!open}>
                  <HamburgerMenu
                    open={open}
                    setOpen={setOpen}
                    aria-controls={menuId}
                  />
                  <Menu open={open} setOpen={setOpen} id={menuId} />
                </FocusLock>
              </div>
            </>
          </ThemeProvider>

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
            <UploadImageSection>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="file"
                  ref={fileInput}
                  style={{ display: "none" }}
                />
                <UploadButton onClick={() => fileInput.current.click()}>
                  <span className="plus-sign" role="img" aria-label="plus-sign">
                    ➕
                  </span>
                </UploadButton>
                <ButtonDiv>
                  <SubmitButton type="submit">Upload</SubmitButton>
                </ButtonDiv>
              </form>
            </UploadImageSection>
          </ProfilePictureSection>
          <ProfileInfo>
            <NameText>Name: {name}</NameText>
            <NameText>Username: {username}</NameText>
            <IconsWrapper>
              <a href="https://sv-se.facebook.com/">
                <FaFacebook
                  icon="fa-brands fa-facebook"
                  style={{ height: 25, width: 25, color: "black" }}
                />
              </a>
              <a href="https://www.instagram.com/">
                <FaInstagram
                  icon="fa-brands fa-instagram"
                  style={{ height: 25, width: 25, color: "black" }}
                />
              </a>
              <a href="https://twitter.com/">
                <FaTwitter
                  icon="fa-brands fa-twitter"
                  style={{ height: 25, width: 25, color: "black" }}
                />
              </a>
            </IconsWrapper>
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
        <Magasin />
      </ProfileContainer>
    </BackgroundImage>
  );
};

export default ProfilePage;

const BackgroundImage = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-image: url("./assets/background.image.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  flex-direction: column;
`;

const UploadImageSection = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-top: -90px;
  margin-left: 120px;
  align-items: center;
  text-align: center;
`;

const UploadButton = styled.button`
  display: flex;
  background-color: whitesmoke;
  padding-top: 5px;
  padding-right: 7px;
  padding-bottom: 5px;
  border-radius: 20px;
  border: transparent;
`;

const ButtonDiv = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.button`
  display: flex;
  background-color: transparent;
  margin-left: 15px;
  padding: 3px;
  border: transparent;
  border-radius: 10px;
  color: black;
  font-family: "Righteous", cursive;
  font-size: 8px;
`;

const ProfilePictureSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  color: black;
  font-size: 15px;
`;

const NameText = styled.h3`
  margin-bottom: 0;
`;

const IconsWrapper = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-evenly;
  margin-top: 5px;
`;

const ContentSection = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  background-color: rgba(221, 133, 96, 1);
  border-radius: 30px;
  padding: 10px;
  margin-right: 5px;
  margin-left: 5px;
  font-size: 12px;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
