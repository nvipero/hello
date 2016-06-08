import React from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory } from "react-router";

import App from "./components/App.jsx";
import About from "./components/About.jsx";
import Work from "./components/Work.jsx";
import NoMatch from "./components/NoMatch.jsx";

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="work" component={Work}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById("react-content"));
