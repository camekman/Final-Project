import React from "react";
import styled from "styled-components";

const Magasin = () => {
  return (
    <>
      <MagasinHolder>
        <ImageWrapper1>
          <a
            href="https://www.vogue.com/"
            style={{
              color: "white",
            }}
          >
            VOGUE
          </a>
        </ImageWrapper1>{" "}
        <ImageWrapper2>
          <a
            href="https://www.vogue.com/"
            style={{
              color: "white",
            }}
          >
            ELLE
          </a>
        </ImageWrapper2>{" "}
        <ImageWrapper3>
          <a
            href="https://www.vogue.com/"
            style={{
              color: "white",
            }}
          >
            {" "}
            FASHION
          </a>
        </ImageWrapper3>{" "}
        <ImageWrapper4>
          <a
            href="https://www.vogue.com/"
            style={{
              color: "white",
            }}
          >
            MODE
          </a>
        </ImageWrapper4>{" "}
        <ImageWrapper5>
          <a
            href="https://www.vogue.com/"
            style={{
              color: "white",
            }}
          >
            MODE
          </a>
        </ImageWrapper5>{" "}
        <ImageWrapper6
          href="https://www.vogue.com/"
          style={{
            color: "white",
          }}
        >
          VINTAGE
        </ImageWrapper6>
      </MagasinHolder>
    </>
  );
};

const MagasinHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 30px;
  padding: 10px;
  margin-right: 5px;
  margin-left: 5px;
  font-size: 12px;
  justify-content: center;
  text-align: center;
  align-items: center;
  @media (min-width: 1024px) {
    flex-wrap: wrap;
  }
`;

const ImageWrapper1 = styled.div`
  display: flex;
  background-image: url("./assets/Vogue.jpg");
  background-size: cover;
  height: 60px;
  width: 25%;
  background-color: rgba(221, 133, 96, 1);
  border-radius: 30px;
  padding: 20px;
  margin: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
  @media (min-width: 768px) {
    height: 60%;
    width: 35%;
  }

  @media (min-width: 1024px) {
    height: 60%;
    width: 23%;
    flex: 1 0 21%;
  }
`;
const ImageWrapper2 = styled.div`
  display: flex;
  background-image: url("./assets/Elle.jpg");
  background-size: cover;
  height: 60px;
  width: 25%;
  background-color: rgba(221, 133, 96, 1);
  border-radius: 30px;
  padding: 20px;
  margin: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
  @media (min-width: 768px) {
    height: 60%;
    width: 35%;
  }
  @media (min-width: 1024px) {
    height: 60%;
    width: 23%;
    flex: 1 0 21%;
  }
`;
const ImageWrapper3 = styled.div`
  display: flex;
  background-image: url("./assets/Fashion.jpeg");
  background-size: cover;
  height: 60px;
  width: 25%;
  background-color: rgba(221, 133, 96, 1);
  border-radius: 30px;
  padding: 20px;
  margin: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
  @media (min-width: 768px) {
    height: 60%;
    width: 35%;
  }
  @media (min-width: 1024px) {
    height: 60%;
    width: 23%;
    flex: 1 0 21%;
  }
`;
const ImageWrapper4 = styled.div`
  display: flex;
  background-image: url("./assets/MetroMode.jpg");
  background-size: cover;
  height: 60px;
  width: 25%;
  background-color: rgba(221, 133, 96, 1);
  border-radius: 30px;
  padding: 20px;
  margin: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
  @media (min-width: 768px) {
    height: 60%;
    width: 35%;
  }
  @media (min-width: 1024px) {
    height: 60%;
    width: 23%;
    flex: 1 0 21%;
    flex-direction: row;
  }
`;
const ImageWrapper5 = styled.div`
  display: flex;
  background-image: url("./assets/Metro-Mode-Nyår.jpg");
  background-size: cover;
  height: 60px;
  width: 25%;
  background-color: rgba(221, 133, 96, 1);
  border-radius: 30px;
  padding: 20px;
  margin: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
  @media (min-width: 768px) {
    height: 60%;
    width: 35%;
    flex-direction: row;
  }
  @media (min-width: 1024px) {
    height: 60%;
    width: 23%;
    flex: 1 0 21%;
    flex-direction: row;
  }
`;
const ImageWrapper6 = styled.div`
  display: flex;
  background-image: url("./assets/vintage.jpg");
  background-size: cover;
  height: 60px;
  width: 25%;
  background-color: rgba(221, 133, 96, 1);
  border-radius: 30px;
  padding: 20px;
  margin: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-wrap: wrap;
  @media (min-width: 768px) {
    height: 60%;
    width: 23%;
    flex-direction: row;
  }
  @media (min-width: 1024px) {
    height: 60%;
    width: 23%;
    flex: 1 0 21%;
    flex-direction: row;
  }
  @media (min-width: 1024px) {
    height: 60%;
    width: 23%;
    flex: 1 0 21%;
  }
  @media (min-width: 1024px) {
    height: 60%;
    width: 23%;
    flex: 1 0 21%;
    flex-direction: row;
  }
`;

export default Magasin;
