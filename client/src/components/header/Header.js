import React from "react";
import "./Header.css";
import Logo from "./components/Logo";
import Searchbar from "./components/Searchbar";
import Links from "./components/Links";

function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <Logo />
        <Searchbar />
        <Links />
      </div>
    </div>
  );
}

export default Header;
