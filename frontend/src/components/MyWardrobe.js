import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../utils/urls";

import wardrobe from "../reducers/wardrobe";

const MyWardrobe = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const images = useSelector((store) => store.wardrobe.images);

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

    fetch(API_URL(`user/${userId}/images`), options)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const images = json.response.map(({ _id: id, imageUrl }) => ({
            id,
            imageUrl,
          }));
          dispatch(wardrobe.actions.setImages(images));
        }
      });
  }, [accessToken, userId, dispatch]);

  return (
    <>
      <div>
        <p>Here is my wardrobe </p>
        <Link to="/MyWardrobe">MyWardrobe</Link>
        <Link to="/MyFleeMarketWardrobe">MyFleeMarketWardrobe</Link>
        <Link to="/Moodboard">Moodboard</Link>
        <Link to="/Inspiration">Inspiration</Link>
        <Link to="/profile">ProfilePage</Link>
      </div>
      <div>
        {images.map(({ id, imageUrl }) => (
          <img src={imageUrl} alt={id} key={id} />
        ))}
      </div>
      <div>
        {" "}
        <Link to="/uploadImage">Upload new image</Link>
      </div>
    </>
  );
};

export default MyWardrobe;
