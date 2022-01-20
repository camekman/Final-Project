import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AboutUs = () => {
  return (
    <AboutContainer>
      <h1>About Us:</h1>
      <p>
        About Us Text Examples are all over the Internet (thank you Google), but
        few go into why it’s a good design beyond just the copy. Here’s the
        thing about copy, it’s only good if someone reads it. Likewise, a
        professional design only creates a successful About Us page, if it
        showcases good content. In this video I discuss 3 websites that are
        handling their about me pages correctly. And just for kicks, I threw in
        one very prominent website that, well, isn’t. Today, you’ll learn why
        it’s important that your About Us page be laid out like a landing page.
        Also we’ll talk about why items like the Backstory, Charity focuses,
        etc, need to be linked out to their own pages.
      </p>

      <Link to="/">
        <HomeLink>
          <p>Home</p>
        </HomeLink>
      </Link>
    </AboutContainer>
  );
};

export default AboutUs;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: lightblue;
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  align-items: center;
  padding: 10px;
`;

const HomeLink = styled.div`
  display: flex;
  padding: 10px;
  background-color: lightcoral;
  border-radius: 20px;
  margin-bottom: 10px;
`;
