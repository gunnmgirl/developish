import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "./routing/history";
import LandingPage from "./features/landing/components/LandingPage";
import Contact from "./features/contact/components/ContactPage";
import About from "./features/about/components/AboutPage";
import PageNotFound from "./components/PageNotFound";
import Apply from "./features/application/components/Apply";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/apply" component={Apply} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
