import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import wardrobe from "../reducers/wardrobe";

const UploadImage = () => {
  const fileInput = useRef();
  const [imageName, setImageName] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);

  const images = useSelector((store) => store.wardrobe.images);

  const userId = useSelector((store) => store.user.userId);
  const UPLOAD_URL = `http://localhost:8080/upload/${userId}`;

  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", fileInput.current.files[0]);
    formData.append("imageName", imageName);

    const options = {
      method: "POST",
      body: formData,
    };

    fetch(UPLOAD_URL, options)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          dispatch(wardrobe.actions.addImage(json.response));
          setUploadComplete(true);
        } else {
          // TODO
        }
      });
  };

  return (
    <>
      <UploadContainer>
        <h1>Upload an image</h1>
        <StyledForm onSubmit={handleFormSubmit}>
          <UploadSection>
            <p>Choose your image here:</p>
            <input
              type="file"
              ref={fileInput}
              // onChange={(e) => setGalleries(e.target.ref)}
            />
          </UploadSection>

          <label>
            Type of garment:
            <input
              type="text"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            />
          </label>

          <button type="submit">Continue</button>
        </StyledForm>
      </UploadContainer>
      <div>
        <h2>Uploaded image will be displayed here</h2>
        {uploadComplete && (
          <img src={images[images.length - 1].imageUrl} alt="Upload" />
        )}
      </div>
    </>
  );
};

export default UploadImage;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: sandybrown;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 30px;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const UploadSection = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
