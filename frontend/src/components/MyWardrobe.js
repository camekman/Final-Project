import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { useOnClickOutside } from "./hooks";
import GlobalStyles from "./global";
import { theme } from "./theme";
import HamburgerMenu from "./HamburgerMenu";
import Menu from "./Menu";
import FocusLock from "react-focus-lock";
import { API_URL } from "../utils/urls";
import DeleteImage from "./DeleteImage";

import image from "../reducers/image";

const MyWardrobe = () => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const images = useSelector((store) => store.image.images);

  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryClothes = images.filter((item) => item.category === category);

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

    fetch(API_URL(`user/${userId}/images`), options)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const images = json.response.map(
            ({ _id: id, imageUrl, category }) => ({
              id,
              imageUrl,
              category,
            })
          );
          dispatch(image.actions.setImages(images));
          dispatch(image.actions.addCategory(category));
        }
      });
  }, [accessToken, userId, category, dispatch]);

  const buttonCategory = [
    "dresses",
    "tops",
    "jackets/coats",
    "sweatshirts",
    "pants",
  ];

  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  useOnClickOutside(node, () => setOpen(false));

  return (
    <Container>
      <BackgroundImage>
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

        <TextHeader>My Wardrobe </TextHeader>

        <ButtonContainer>
          {buttonCategory.map((category) => (
            <StyledButton
              key={category}
              value={category}
              onClick={onCategoryChange}
            >
              {category}
            </StyledButton>
          ))}
        </ButtonContainer>

        <ImageContainer>
          {categoryClothes.map(({ id, category, imageUrl }) => (
            <StyledImageSection key={id}>
              <StyledImage src={imageUrl} alt={category} />
              <DeleteImage imageId={id} />
            </StyledImageSection>
          ))}
        </ImageContainer>
      </BackgroundImage>
    </Container>
  );
};

export default MyWardrobe;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #747373;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const BackgroundImage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-image: url("./assets/empty.wardrobe.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 120vh;
  object-fit: cover;
  @media (min-width: 768px) {
    width: 70vh;
    height: 120vh;
  }
  @media (min-width: 1024px) {
    width: 120vh;
    height: 120vh;
  }
`;

const TextHeader = styled.h1`
  padding-top: 15px;
  @media (min-width: 768px) {
    padding-top: 30px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    padding: 20px;
    justify-content: space-evenly;
  }
`;

const StyledButton = styled.button`
  display: flex;
  background-color: rgba(221, 133, 96, 1);
  padding: 5px;
  margin-top: 20px;
  border: transparent;
  border-radius: 10px;
  color: rgb(77, 77, 77);
  font-family: "Righteous", cursive;
  font-size: 14px;
  margin-right: 3px;
  margin-left: 3px;
  @media (min-width: 768px) {
    font-size: 20px;
    padding: 10px;
    margin-right: 10px;
    margin-left: 10px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
  }
`;

const StyledImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const StyledImage = styled.img`
  width: 80%;
  height: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  @media (min-width: 768px) {
    width: 450px;
    margin-right: 10px;
    margin-left: 10px;
  }
  @media (min-width: 1024px) {
    width: 200px;
    margin-right: 10px;
    margin-left: 10px;
  }
`;
