import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../utils/urls";
// import user from "../reducers/user";

const Inspiration = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

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

    fetch(API_URL, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }, [accessToken]);

  return (
    <>
      <div>
        <p>Here you can store your inspirations pic</p>
        <Link to="/MyWardrobe">MyWardrobe</Link>
        <Link to="/MyFleeMarketWardrobe">MyFleeMarketWardrobe</Link>
        <Link to="/Moodboard">Moodboard</Link>
        <Link to="/Inspiration">Inspiration</Link>
        <Link to="/profile">ProfilePage</Link>
      </div>

      <div>
        {" "}
        <Link to="/uploadImage">Upload new image</Link>
      </div>
    </>
  );
};

export default Inspiration;
