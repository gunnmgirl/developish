import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import LogoIcon from "../icons/LogoIcon";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 4rem;
  font-size: 1.5rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div``;

const StyledSpan = styled.span`
  margin: 0 1rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.onPrimary};
  margin-right: ${(props) => props.marginRight || "3rem"};
  &.active {
    color: ${(props) =>
      props.noactivestyle ? props.theme.onPrimary : props.theme.onActive};
  }
`;

function Header() {
  return (
    <Container>
      <StyledNavLink to="/" exact noactivestyle="true">
        <LogoWrapper>
          <LogoIcon />
          <StyledSpan>Developish</StyledSpan>
        </LogoWrapper>
      </StyledNavLink>
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
