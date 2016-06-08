import React from "react";
import { Link} from "react-router";

export default class NaviItem extends React.Component {
  static propTypes = {
    link: React.PropTypes.string.isRequired,
    children: React.PropTypes.string.isRequired
  };

  render() {
    return (
      <li>
        <Link to={this.props.link}>{this.props.children}</Link>
      </li>
    );
  }
}
