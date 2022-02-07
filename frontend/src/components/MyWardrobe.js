import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../utils/urls";
import DeleteImage from "./DeleteImage";

import image from "../reducers/image";

const MyWardrobe = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);

  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let selectedCategory = useSelector((store) =>
    store.image.images.filter((item) => item.category)
  );

  const categoryClothes = selectedCategory.filter(
    (item) => item.category === category
  );

  console.log(selectedCategory);
  console.log(categoryClothes);
  console.log(category);

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
    "Jackets/Coats",
    "sweatshirts",
    "pants",
  ];
  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  };

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
        {buttonCategory.map((category) => (
          <button key={category} value={category} onClick={onCategoryChange}>
            {category}
          </button>
        ))}
      </div>

      <div>
        {categoryClothes.map(({ id, category, imageUrl }) => (
          <div key={id}>
            {" "}
            <img src={imageUrl} alt={category} /> <DeleteImage imageId={id} />
          </div>
        ))}
      </div>

      <div>
        <Link to="/uploadImage">Upload new image</Link>
      </div>
    </>
  );
};

export default MyWardrobe;
