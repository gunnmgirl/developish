import React from "react";
import styled from "styled-components";

import Header from "../../../components/Header";
import landingBackgroundImage from "../images/LandingBackgroundImage.jpg";
import Button from "../../../components/Button";
import history from "../../../routing/history";

const Container = styled.div`
  background: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  flex-grow: 1;
  color: ${(props) => props.theme.onSecondary};
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const OverlayBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5rem;
`;

const StyledH1 = styled.h1`
  font-size: 3rem;
  font-weight: 700;
`;

const StyledH2 = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  width: 60%;
`;

const StyledButton = styled(Button)`
  width: 256px;
`;

function LandingPage() {
  function handleOnClick() {
    history.push("/apply");
  }

  return (
    <MainContainer>
      <Header />
      <Container image={landingBackgroundImage}>
        <OverlayBackground>
          <Wrapper>
            <StyledH1>
              We are obsessed with building amazing products with the best
              founders
            </StyledH1>
            <StyledH2>
              Our mission is to help entrepreneurs launch new products &
              services, iterate and succeed faster.
            </StyledH2>
            <StyledButton onClick={handleOnClick}>Apply</StyledButton>
          </Wrapper>
        </OverlayBackground>
      </Container>
    </MainContainer>
  );
}

export default LandingPage;
