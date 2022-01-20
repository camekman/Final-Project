import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div>
        <h1>Welcome to the homepage!</h1>
      </div>
      <Link to="/login">Login</Link>
    </>
  );
};

export default HomePage;
