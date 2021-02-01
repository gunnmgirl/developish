import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import history from "./routing/history";
import LandingPage from "./features/landing/components/LandingPage";
import About from "./features/about/components/AboutPage";
import PageNotFound from "./features/components/PageNotFound";
import Apply from "./features/application/components/Apply";
import GlobalStyle from "./GlobalStyle";
import defaultTheme from "./themes/defaultTheme";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/about" component={About} />
          <Route path="/apply" component={Apply} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
