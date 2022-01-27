import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const UploadImage = () => {
  const fileInput = useRef();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [galleries, setGalleries] = useState("");

  // const galleries = useSelector((store) => store.user.galleries);
  const userId = useSelector((store) => store.user.userId);
  const UPLOAD_URL = `http://localhost:8080/upload/${userId}`;

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
      .then((data) => {
        console.log(data);
        setGalleries(data.galleries);
        setImageUrl(data.imageUrl);
      }, [])
      .catch((err) => console.log(err));
  };

  return (
    <>
      <UploadContainer>
        <h1>Upload an image</h1>
        <StyledForm onSubmit={handleFormSubmit}>
          <UploadSection>
            <p>Choose your image here:</p>
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

          <button type="submit">Continue</button>
        </StyledForm>

        <div>
          <h1>Uploaded image will be displayed here</h1>
        </div>
        <img src={imageUrl.galleries} />
        <img src={galleries} />
        {/* <div>
          {galleries.map((item) => (
            <div key={userId}>
              <img
                src={`http://localhost:8080//user/${item.galleries}`}
                alt={name}
              />
            </div>
          ))}
        </div> */}
      </UploadContainer>
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
