import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled, { ThemeProvider } from "styled-components";
import { useOnClickOutside } from "./hooks";
import GlobalStyles from "./global";
import { theme } from "./theme";
import HamburgerMenu from "./HamburgerMenu";
import Menu from "./Menu";
import FocusLock from "react-focus-lock";

import image from "../reducers/image";

const UploadImage = () => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  const fileInput = useRef();
  const [uploadComplete, setUploadComplete] = useState(false);
  const [category, setCategory] = useState("");

  const images = useSelector((store) => store.image.images);
  const userId = useSelector((store) => store.user.userId);
  const UPLOAD_URL = `http://localhost:8080/upload/${userId}`;

  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", fileInput.current.files[0]);
    formData.append("category", category);

    const options = {
      method: "POST",
      body: formData,
    };

    fetch(UPLOAD_URL, options)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          dispatch(image.actions.addImage(json.response));

          setUploadComplete(true);
        } else {
          // TODO
        }
      });
  };

  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  useOnClickOutside(node, () => setOpen(false));

  return (
    <>
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
        <UploadContainer>
          <h1>Upload your image</h1>
          <StyledForm onSubmit={handleFormSubmit}>
            <UploadSection>
              <input type="file" ref={fileInput} style={{ display: "none" }} />
              <UploadButton onClick={() => fileInput.current.click()}>
                Choose your image here
              </UploadButton>
            </UploadSection>
            <h3>Choose your category here:</h3>
            <StyledSelect value={category} onChange={onCategoryChange}>
              <option value="dresses">Dresses</option>
              <option value="tops">Tops</option>
              <option value="jackets/coats">Jackets/Coats</option>
              <option value="sweatshirts">Sweatshirts</option>
              <option value="pants">Pants</option>
            </StyledSelect>
            <p>{category}</p>
            <SubmitButton type="submit">Upload</SubmitButton>
          </StyledForm>

          <div>
            {uploadComplete && (
              <img src={images[images.length - 1].imageUrl} alt="Upload" />
            )}
          </div>
        </UploadContainer>
      </BackgroundImage>
    </>
  );
};

export default UploadImage;

const BackgroundImage = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-image: url("./assets/beige.wardrobe.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 110vh;
  object-fit: cover;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #dcdcdc80;
  border-radius: 30px;
  padding: 30px;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const StyledSelect = styled.select`
  color: black;
  background-color: #dcdcdc80;
  border-radius: 20px;
  padding: 10px;
  font-size: 18px;
  border: 1px rgba(221, 133, 96, 1);
`;

const UploadSection = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UploadButton = styled.button`
  display: flex;
  background-color: rgba(221, 133, 96, 1);
  padding: 15px;
  margin-top: 20px;
  border: transparent;
  border-radius: 10px;
  color: whitesmoke;
  font-family: "Righteous", cursive;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  display: flex;
  background-color: whitesmoke;
  padding: 15px;
  margin-top: 20px;
  border: transparent;
  border-radius: 10px;
  color: rgba(221, 133, 96, 1);
  font-family: "Righteous", cursive;
  font-size: 14px;
`;
