import React from "react";
import LeftCompartment from "./LeftCompartment";
import RightCompartment from "./RightCompartment";
import "./Banner.css";

function Banner() {
  return (
    <div className="banner">
      <div className="banner__container">
        <LeftCompartment />
        <RightCompartment />
      </div>
    </div>
  );
}

export default Banner;
