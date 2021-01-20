import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  width: 100%;
`;

const StyledCaption = styled.div`
  color: ${(props) => props.theme.onActive};
  margin-top: 0.4rem;
`;

const FormControl = (props) => {
  const { label, caption, children } = props;
  return (
    <Container>
      {label && <label>{label}</label>}
      {React.cloneElement(children)}
      {caption && <StyledCaption>{caption}</StyledCaption>}
    </Container>
  );
};

export default FormControl;
