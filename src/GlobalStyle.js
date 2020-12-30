import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
  }
  
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  
  body, h1, h2, a {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
  }

  `;

export default GlobalStyle;
