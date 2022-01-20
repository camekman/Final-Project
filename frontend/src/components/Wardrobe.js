import React, { useState, useRef } from "react";

import { API_URL } from "../utils/urls";

const Wardrobe = () => {
  const fileInput = useRef();
  const [name, setName] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", fileInput.current.files[0]);
    formData.append("name", name);

    fetch(API_URL, { method: "POST", body: formData })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Your Wardrobe
        <input type="file" ref={fileInput} />
      </label>

      <label>
        Type of garment:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Wardrobe;
