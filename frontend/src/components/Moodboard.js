import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../utils/urls";
import styled, { ThemeProvider } from "styled-components";
import image from "../reducers/image";
import { useOnClickOutside } from "./hooks";
import GlobalStyles from "./global";
import { theme } from "./theme";
import HamburgerMenu from "./HamburgerMenu";
import Menu from "./Menu";
import FocusLock from "react-focus-lock";

const MyWardrobe = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const images = useSelector((store) => store.image.images);

  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  const [category, setCategory] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

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

  const onSelectImage = (item) => {
    setSelectedImages([...selectedImages, item]);
  };

  const onDeleteMoodBoard = () => {
    setSelectedImages([]);
  };

  useOnClickOutside(node, () => setOpen(false));

  return (
    <BackgroundImage>
      <Container>
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
        <StyledText>MOODBOARD</StyledText>

        <Wrapper>
          <ImageContainer>
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

            {categoryClothes.map(({ id, category, imageUrl }) => (
              <ImageButton
                key={id}
                onClick={() => onSelectImage({ id, category, imageUrl })}
              >
                <div key={id}>
                  <Image src={imageUrl} data-id={id} alt={category} />
                </div>
              </ImageButton>
            ))}
          </ImageContainer>

          <MoodBoardTablet>
            This is your mood-tablet onSelect
            <MoodboardContainer>
              {selectedImages.map(({ id, imageUrl }) => (
                <MoodboardWrapper key={id}>
                  <ImageStyled src={imageUrl} alt="" />
                </MoodboardWrapper>
              ))}
            </MoodboardContainer>
            <DeleteButton onClick={onDeleteMoodBoard}>
              Delete Moodboard
            </DeleteButton>
          </MoodBoardTablet>
        </Wrapper>
      </Container>
    </BackgroundImage>
  );
};

export default MyWardrobe;

const BackgroundImage = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 130vh;
  background-image: url("./assets/background.image.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;
`;

const StyledText = styled.h1`
  margin-top: 0;
`;
const Container = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;

  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  margin-bottom: 10px;
  gap: 5px;
`;

const StyledButton = styled.button`
  display: flex;
  background-color: rgba(221, 133, 96, 1);
  padding: 5px;
  margin-top: 20px;
  border: transparent;
  border-radius: 10px;
  color: whitesmoke;
  font-family: "Righteous", cursive;
  font-size: 14px;
`;

const ImageButton = styled.button`
  display: flex;
  border: transparent;
  border-radius: 10px;
  background-color: transparent;
`;

const MoodBoardTablet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #dcdcdc80;
  border-radius: 10px;
  margin-right: 10px;
  margin-left: 10px;
  padding-top: 5px;
  padding-bottom: 10px;
`;

const MoodboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const MoodboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ImageStyled = styled.img`
  width: 130px;
  height: auto;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 5px;
  margin-left: 5px;
`;

const DeleteButton = styled.button`
  display: flex;
  width: fit-content;
  background-color: rgba(221, 133, 96, 1);
  padding: 10px;
  margin-top: 20px;
  border: transparent;
  border-radius: 10px;
  color: whitesmoke;
  font-family: "Righteous", cursive;
  font-size: 14px;
`;
