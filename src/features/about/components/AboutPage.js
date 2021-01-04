import React from "react";
import styled from "styled-components";

import Header from "../../components/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24rem;
  flex-grow: 1;
  justify-content: center;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const StyledP = styled.p`
  font-size: 1.6rem;
  margin: 1rem 0;
`;

const StyledH2 = styled.h2`
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const About = () => {
  return (
    <MainContainer>
      <Header />
      <Container>
        <StyledH2>About Us</StyledH2>
        <StyledP>
          Developish is a venture-builder/startup studio. We focus on software
          design and development consulting services for early-stage startups
          and new products. We also invest in a few startups every year.
        </StyledP>
        <StyledP>
          Unlike the average consultancy or agency, we provide an end-to-end
          support structure for startups. We are very hands-on and we are not
          afraid of any technical challenge. We built over 65+ products from
          scratch, including social networks, search engines, crypto trading
          systems, mobile apps and hardware devices. We built FinTech,
          HealthTech, and products in many other verticals.
        </StyledP>
        <StyledP>
          We understand that creating successful startups requires focus,
          commitment, and determination and that creating startups is a hard
          challenge in business and technology. We exist to help startups and
          founders survive and thrive in a difficult environment and make an
          impact on the world and the economy.
        </StyledP>
      </Container>
    </MainContainer>
  );
};

export default About;
