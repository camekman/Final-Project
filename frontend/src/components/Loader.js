import React from "react";
import Lottie from "react-lottie";
// import Lottie from "lottie-web-react";

import animationData from "../Lottie/loader.lottie.json";
import { useSelector } from "react-redux";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  margin: 10px;
`;

const Loader = () => {
  const loading = useSelector((store) => store.ui.loading);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <LoadingContainer>
      {loading && <Lottie options={defaultOptions} height={400} width={400} />}
    </LoadingContainer>
  );
};
export default Loader;
