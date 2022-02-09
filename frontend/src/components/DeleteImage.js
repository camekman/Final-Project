import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaTrashAlt } from "react-icons/fa";
import { FaBeer } from "react-icons/fa";
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
      {" "}
      <button key={imageId} value={imageDelete} onClick={onDeleteImage}>
        {" "}
        <FaTrashAlt style={{ height: 20, width: 20, color: "white" }} />
      </button>{" "}
    </div>
  );
};

export default DeleteImage;
