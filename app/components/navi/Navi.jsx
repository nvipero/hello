import React from "react";
import NaviItem from "./NaviItem.jsx";

export default () => (
  <nav>
    <ul>
      <NaviItem link="/">Koti</NaviItem>
      <NaviItem link="/about">Tietoa</NaviItem>
      <NaviItem link="/work">Portfolio</NaviItem>
    </ul>
  </nav>);
