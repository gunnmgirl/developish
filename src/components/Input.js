import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  background-color: ${(props) => props.theme.primary};
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.onPrimary};
  border-radius: 4px;
  color: ${(props) => props.theme.onPrimary};
  width: 100%;
  height: 2rem;
`;

const Input = (props) => {
  return <StyledInput {...props}></StyledInput>;
};

export default Input;
