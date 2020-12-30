import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: 0;
  border-radius: 16px;
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.onSecondary};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  :hover {
    background-color: ${(props) => props.theme.onHover};
  }
  width: ${(props) => (props.shouldFitContainer ? "100%" : "auto")};
`;

function Button(props) {
  const { shouldFitContainer } = props;

  return (
    <StyledButton {...props} shouldFitContainer={shouldFitContainer}>
      {props.children}
    </StyledButton>
  );
}

export default Button;
