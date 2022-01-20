import React, { useState, useRef } from "react";
import styled from "styled-components";

import { API_URL } from "../utils/urls";

const Wardrobe = () => {
  const fileInput = useRef();
  const [name, setName] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", fileInput.current.files[0]);
    formData.append("name", name);

    fetch(API_URL, { method: "POST", body: formData })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };

  return (
    <WardrobeContainer>
      <h1>My Wardrobe</h1>
      <StyledForm onSubmit={handleFormSubmit}>
        <UploadSection>
          <p>Upload your pictures here:</p>
          <input type="file" ref={fileInput} />
        </UploadSection>

        <label>
          Type of garment:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </StyledForm>
    </WardrobeContainer>
  );
};

export default Wardrobe;

const WardrobeContainer = styled.div`
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
