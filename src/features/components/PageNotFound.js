import React from "react";
import styled from "styled-components";
import Header from "./Header";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const StyledH1 = styled.h1`
  padding: 4rem 5rem;
`;

function PageNotFound() {
  return (
    <MainContainer>
      <Header />
      <StyledH1>Oops, not found</StyledH1>
    </MainContainer>
  );
}

export default PageNotFound;
