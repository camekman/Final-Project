import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../utils/urls";
import styled from "styled-components";
import image from "../reducers/image";

const MyWardrobe = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const images = useSelector((store) => store.image.images);
  console.log(images);

  const [category, setCategory] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let selectedCategory = useSelector((store) =>
    store.image.images.filter((item) => item.category)
  );

  const categoryClothes = selectedCategory.filter(
    (item) => item.category === category
  );

console.log(selectedImages);
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

  const onSelectImage = (event) => {
    if (!selectedImages.find(({id}) => event.target.dataset.id)) {
      setSelectedImages([
        ...selectedImages,
        {
          id: event.target.dataset.id,
          imageUrl: event.target.src
        }
      ]);
    }
  };

  const onDeleteMoodboard = () => {
    setSelectedImages([]);
  };

  return (
    <>
      <Container>
        <h1>MOODBOARD</h1>
        <div>
          <Link to="/MyWardrobe">MyWardrobe</Link>
          <Link to="/MyFleeMarketWardrobe">MyFleeMarketWardrobe</Link>
          <Link to="/Moodboard">Moodboard</Link>
          <Link to="/Inspiration">Inspiration</Link>
          <Link to="/profile">ProfilePage</Link>
        </div>
        <Wrapper>
          <ImageContainer>
            <div>
              {buttonCategory.map((category) => (
                <button
                  key={category}
                  value={category}
                  onClick={onCategoryChange}
                >
                  {category}
                </button>
              ))}
            </div>

            {categoryClothes.map(({ id, category, imageUrl }) => (
              <button key={category} onClick={onSelectImage}>
                <div key={id}>
                  <Image src={imageUrl} data-id={id} alt={category} />
                </div>
              </button>
            ))}
          </ImageContainer>

          <MoodBoardTablet>

            This is your mood-tablet onSelect
          {selectedImages.map(({ imageUrl }) => <Image src={imageUrl} alt="" />)}
          <button onClick={onDeleteMoodboard} > DELETE</button>
          </MoodBoardTablet>
        </Wrapper>
        <div>
          <Link to="/uploadImage">Upload new image</Link>
        </div>
      </Container>
    </>
  );
};

// {products.map((product) => (
//   <CartItem key={product.id} product={product} />
// ))}

export default MyWardrobe;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 3px solid black;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  border: 2px solid blue;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid green;
`;
const MoodBoardTablet = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid green;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
`;

// const Moodboard = () => {
//   var draggable = ".draggable";
//   var resizable = ".resizeable";
//   var element = "element";

//   element.each(setRandomSize);
//   element.each(setRandomPosition);

//   resizable.resizable({
//     containment: "#background",
//     aspectRatio: true,
//     handles: "n, w, s, e",
//   });

//   draggable.draggable({
//     cursor: "move",
//     containment: "#background",
//     stack: ".element",
//   });
//   if (window.innerHeight > window.innerWidth) {
//   }

//   function setRandomSize() {
//     //Get IMG size
//     var img = this.find("img");
//     var imgHeight = img.outerHeight();
//     var imgWidth = img.outerWidth();

//     if (window.innerHeight > window.innerWidth) {
//       //Generate random Width % [10, 60]
//       var randomWidth = randomIntFromInterval(10, 60);
//       this.css({
//         width: randomWidth + "%",
//       });
//     } else {
//       //Change Height to [100, 330] randomly
//       var randomHeight = randomIntFromInterval(100, 330);
//       //Calc proportional width
//       var proportionalWidth = (imgWidth * randomHeight) / imgHeight;
//       this.css({
//         height: randomHeight + "px",
//         width: proportionalWidth + "px",
//       });
//     }
//   }

//   function setRandomPosition() {
//     //Generate random Top % [0, 75]
//     var randomTop = randomIntFromInterval(0, 75);
//     //Generate randon Left % [0, 85]
//     var randomLeft = randomIntFromInterval(0, 75);
//     this.css({
//       top: randomTop + "%",
//       left: randomLeft + "%",
//     });
//   }

//   function randomIntFromInterval(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   }
// };

// export default Moodboard;
