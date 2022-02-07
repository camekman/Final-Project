import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import image from "../reducers/image";

const DeleteImage = ({ imageId }) => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);

  const dispatch = useDispatch();
  const deleteImage = useSelector((store) => store.image.deleteImage);

  const [imageDelete, setImageDelete] = useState("");

  const DELETE_URL = `http://localhost:8080/delete/${imageId}`;

  let selectedDelete = useSelector((store) =>
    store.image.images.filter((item) => item.deleteImage)
  );

  const categoryImage = selectedDelete.filter(
    (item) => item.deleteImage === deleteImage
  );

  const onDeleteImage = (event) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    console.log("hej", DELETE_URL);
    fetch(DELETE_URL, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        dispatch(image.actions.deleteImage(imageId));
      });
    setImageDelete(event.target.value);
  };

  return (
    <div>
      <button key={imageId} value={imageDelete} onClick={onDeleteImage}>
        Hello delete
      </button>
    </div>
  );
};

export default DeleteImage;
