import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Logo from "./Logo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem 4rem;
    margin: 0;
  }
`;

const Wrapper = styled.div``;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.onPrimary};
  margin-right: ${(props) => props.marginright || "3rem"};
  &.active {
    color: ${(props) =>
      props.noactivestyle ? props.theme.onPrimary : props.theme.onActive};
  }
`;

function Header() {
  return (
    <Container>
      <Logo />
      <Wrapper>
        <StyledNavLink to="/about">About</StyledNavLink>
        <StyledNavLink to="/contact">Contact Us</StyledNavLink>
        <StyledNavLink to="/careers" marginright="0">
          Careers
        </StyledNavLink>
      </Wrapper>
    </Container>
  );
}

export default Header;
