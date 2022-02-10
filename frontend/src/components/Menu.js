import React from "react";
import { bool } from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Menu = ({ open, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <Link to="/profile" tabIndex={tabIndex}>
        {" "}
        <span aria-hidden="true">👘</span> ProfilePage
      </Link>
      {/* <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">👘</span>
        My Wardrobe
      </a> */}
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">😎</span>
        My Moodboard
      </a>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">📷</span>
        Upload Your Cloths
      </a>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.primaryLight};
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100vh;
  width: 40%;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 50%;
  }
  a {
    font-size: 16px;
    text-transform: uppercase;
    padding: 10px;
    font-weight: bold;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }
    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;
