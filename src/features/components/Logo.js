import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import LogoIcon from "../../icons/LogoIcon";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSpan = styled.span`
  font-size: ${(props) => (props.large ? "3rem" : "1.4rem")};
  margin: 0 1rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) =>
    props.secondary ? props.theme.onSecondary : props.theme.onPrimary};
  margin-right: ${(props) => props.marginright || "3rem"};
  &.active {
    color: ${(props) => props.theme.onPrimary};
  }
`;

const Logo = (props) => {
  const { large, secondary } = props;
  return (
    <StyledNavLink to="/" exact secondary={secondary}>
      <LogoWrapper>
        <LogoIcon />
        <StyledSpan large={large}>Developish</StyledSpan>
      </LogoWrapper>
    </StyledNavLink>
  );
};

export default Logo;
