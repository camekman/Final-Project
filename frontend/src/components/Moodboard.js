import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";

import { API_URL } from "../utils/urls";
import image from "../reducers/image";

const Moodboard = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const images = useSelector((store) => store.image.images);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/login");
  //   }
  // }, [accessToken, navigate]);

  // fetching uploaded images

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: accessToken,
  //     },
  //   };
  //   fetch(API_URL(`user/${userId}/images`), options)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       if (json.success) {
  //         const images = json.response.map(({ _id: id, imageUrl }) => ({
  //           id,
  //           imageUrl,
  //         }));
  //         dispatch(image.actions.setImages(images));
  //       }
  //     });
  // }, [accessToken, userId, dispatch]);

  return (
    <Container>
      <h1>Create your perfect outfit combinations </h1>
      <div>
        <Link to="/MyWardrobe">MyWardrobe</Link>
        <Link to="/MyFleeMarketWardrobe">MyFleeMarketWardrobe</Link>
        <Link to="/Moodboard">Moodboard</Link>
        <Link to="/Inspiration">Inspiration</Link>
        <Link to="/profile">ProfilePage</Link>
      </div>
      <div>
        <Link to="/uploadImage">Upload new image</Link>
      </div>
      <div>
        <MoodboardContainer>
          {images.map(({ id, imageUrl }) => (
            <img src={imageUrl} alt={id} key={id} />
          ))}
        </MoodboardContainer>
      </div>
    </Container>
  );
};

export default Moodboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const MoodboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  gap: 10px;
  border: 3px solid black;

  background-color: lightgray;
`;
