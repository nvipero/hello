import React from "react";

import Navi from "./navi/Navi.jsx";

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    return (
      <div className="wrapper">
        <h1>hello world</h1>
        <Navi />
        {this.props.children}
      </div>
    );
  }
}
