import React, { useState, useRef } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import styled from "styled-components";

import wardrobe from "../reducers/wardrobe";
import user from "../reducers/user";

const UploadImage = () => {
  const fileInput = useRef();

  const [imageId, setImageId] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const [galleries, setGalleries] = useState([{}]);

  // const galleries = useSelector((store) => store.user.galleries);
  const userId = useSelector((store) => store.user.userId);
  const UPLOAD_URL = `http://localhost:8080/upload/${userId}`;

  const dispatch = useDispatch();

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
        // console.log(data);
        console.log(data.galleries);
        console.log(data.galleries[""]);
        console.log(data.galleries[0]);
        console.log(data.galleries[{}]);
        console.log(data.galleries.length);

        if (data.success) {
          batch(() => {
            dispatch(wardrobe.actions.setImageId(data.response.imageId));
            dispatch(wardrobe.actions.setName(data.response.name));
            dispatch(wardrobe.actions.setImageUrl(data.response.imageUrl));
            dispatch(user.actions.setGalleries(data.response.galleries));
            dispatch(wardrobe.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(wardrobe.actions.setImageId(null));
            dispatch(wardrobe.actions.setName(null));
            dispatch(wardrobe.actions.setImageUrl(null));
            dispatch(user.actions.setGalleries(null));
            dispatch(wardrobe.actions.setError(data.response));
          });
        }
      });
  };

  // do we need a get req also?

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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <button type="submit">Continue</button>
        </StyledForm>

        <div>
          <h1>Uploaded image will be displayed here</h1>
        </div>
        <img src={imageUrl} />
        {/* <img src={imageUrl.data} /> */}
        {/* <img src={imageUrl[""].response} /> */}
        {/* <img src={imageUrl[0].response} /> */}
        {/* <img src={setImageUrl} /> */}
        {/* <img src={fileInput} /> */}
        {/* <img src={galleries[0]} /> */}
        <img src={imageUrl.galleries} />
        <img src={galleries[0]} />
        {/* <img src={galleries[{}]} /> */}
        {/* <img src={imageUrl.galleries[0]} /> */}

        <p>{name}</p>
        <p>{imageId}</p>
        <p>{error.response}</p>

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
