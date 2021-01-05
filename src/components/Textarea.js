import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  resize: ${(props) => props.resize && "none"};
  border: 1px solid ${(props) => props.theme.onPrimary};
  border-radius: 4px;
`;

const Textarea = (props) => {
  const { resize } = props;
  return <StyledTextarea {...props} resize={resize}></StyledTextarea>;
};

export default Textarea;
