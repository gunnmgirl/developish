import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const StyledCaption = styled.div`
  color: ${(props) => props.theme.onActive};
`;

const FormControl = (props) => {
  const { label, caption, children, disabled, error, positive } = props;
  return (
    <Container>
      {label && <label>{label}</label>}
      {React.cloneElement(children, { disabled, error, positive })}
      {caption && (
        <StyledCaption error={error} positive={positive}>
          {caption}
        </StyledCaption>
      )}
    </Container>
  );
};

export default FormControl;
