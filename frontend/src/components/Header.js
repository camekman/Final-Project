import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <p>hamburger menu</p>
      <h4>This is our header</h4>
      <p>go to my profile</p>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  height: 50px;
  background-color: darkcyan;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
  padding-left: 10px;
`;
