import React from "react";
import { useDispatch } from "react-redux";
import { bool } from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import user from "../reducers/user";

const Menu = ({ open, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  const dispatch = useDispatch();

  const handleRestart = () => {
    dispatch(user.actions.restart());
  };

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <Link to="/MyWardrobe" tabIndex={tabIndex}>
        <span aria-hidden="true">👘</span> My Wardrobe
      </Link>
      <Link to="/Moodboard" tabIndex={tabIndex}>
        <span aria-hidden="true">😎</span> Moodboard
      </Link>
      <Link to="/uploadImage" tabIndex={tabIndex}>
        <span aria-hidden="true">📷</span> Upload here!
      </Link>
      <Link to="/profile" tabIndex={tabIndex}>
        <span aria-hidden="true">🤡</span> Profile
      </Link>
      <div>
        <SignOutButton onClick={handleRestart}>Sign out</SignOutButton>
      </div>
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
  height: 115vh;
  width: 40%;
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
  a {
    font-size: 20px;
    text-transform: uppercase;
    margin-bottom: 40px;
    color: rgb(77, 77, 77);
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
const SignOutButton = styled.button`
  display: flex;
  background-color: rgba(221, 133, 96, 1);
  padding: 10px;
  margin-top: 20px;
  border: transparent;
  border-radius: 10px;
  color: rgb(77, 77, 77);
  font-family: "Righteous", cursive;
  font-size: 14px;
`;
