// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import image from "../reducers/image";

// const MoodImage = ({ imageId }) => {
//   const dispatch = useDispatch();

//   const [addMoodImage, setAddMoodImage] = useState("");

//   const UPLOAD_URL = `http://localhost:8080/upload/${imageId}`;

//   let selectedCopy = useSelector((store) =>
//     store.image.images.filter((item) => item.addMoodImage)
//   );

//   const moodImage = selectedCopy.filter(
//     (item) => item.addMoodImage === addMoodImage
//   );

//   const onAddMoodImage = (event) => {
//     event.preventDefault();
//     const formData = new FormData();

//     const options = {
//       method: "POST",
//       body: formData,
//     };

//     fetch(UPLOAD_URL, options)
//       .then((res) => res.json())
//       .then((json) => {
//         console.log(json);
//         dispatch(image.actions.addMoodImage(imageId));
//       });
//     setAddMoodImage(event.target.value);
//   };

//   return (
//     <div key={imageId}>
//       <img src={moodImage.imageUrl} alt="Upload" />
//     </div>
//   );
// };

// export default MoodImage;
