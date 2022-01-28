import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import styled from "styled-components";
import { API_URL } from "../utils/urls";

import wardrobe from "../reducers/wardrobe";
import user from "../reducers/user";

const UploadImage = () => {
  const fileInput = useRef();
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // const [error, setError] = useState("");
  // const [galleries, setGalleries] = useState([{}]);

  // we should pic everything from the store :)
  const galleries = useSelector((store) => store.user.galleries);
  const userId = useSelector((store) => store.user.userId);
  const UPLOAD_URL = `http://localhost:8080/upload/${userId}`;
  const IMAGE_URL = `http://localhost:8080/user/${userId}/images`;

  // const dispatch = useDispatch();

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
        // console.log(data);
        console.log(json.galleries);
        // console.log(data.galleries[""]);
        // console.log(data.galleries[0]);
        // console.log(data.galleries[{}]);
        // console.log(data.galleries.length);
        setImageUrl(json.galleries);

        // if (data.success) {
        //   batch(() => {
        //     dispatch(wardrobe.actions.setImageId(data.response.imageId));
        //     dispatch(wardrobe.actions.setImageName(data.response.name));
        //     dispatch(wardrobe.actions.setImageUrl(data.response.imageUrl));
        //     dispatch(user.actions.setGalleries(data.response.galleries));
        //     dispatch(wardrobe.actions.setError(null));
        //   });
        // } else {
        //   batch(() => {
        //     dispatch(wardrobe.actions.setImageId(null));
        //     dispatch(wardrobe.actions.setName(null));
        //     dispatch(wardrobe.actions.setImageUrl(null));
        //     dispatch(user.actions.setGalleries(null));
        //     dispatch(wardrobe.actions.setError(data.response));
        //   });
        // }
      });
  };

  // API_URL(`user/${userId}/images`
  // do we need a get req also?
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {},
    };

    fetch(IMAGE_URL, options)
      .then((res) => res.json())
      .then((json) => {
        console.log("hehej", json);
        console.log("image", galleries);
        // setImageUrl(json.response);
      });
  });

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

        <div>
          <h1>Uploaded image will be displayed here</h1>
        </div>
        {/* får ut alla objektid nu  */}
        <img src={imageUrl} />
        {/* <img src={imageUrl.data} /> */}
        {/* <img src={imageUrl[""].response} /> */}
        {/* <img src={imageUrl[0].response} /> */}
        {/* <img src={setImageUrl} /> */}
        {/* <img src={fileInput} /> */}
        {/* <img src={galleries[0]} /> */}
        {/* <img src={imageUrl.galleries} /> */}
        {/* <img src={galleries[0]} /> */}
        {/* <img src={galleries[{}]} /> */}
        {/* <img src={imageUrl.galleries[0]} /> */}

        <p>{imageName}</p>
        {/* <p>{imageId}</p>
        <p>{error.response}</p> */}

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
