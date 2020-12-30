import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import history from "./routing/history";
import LandingPage from "./features/landing/components/LandingPage";
import Contact from "./features/contact/components/ContactPage";
import About from "./features/about/components/AboutPage";
import PageNotFound from "./components/PageNotFound";
import Apply from "./features/application/components/Apply";
import GlobalStyle from "./GlobalStyle";
import defaultTheme from "./themes/defaultTheme";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/apply" component={Apply} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
