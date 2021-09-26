import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Logo() {
  const dispatch = useDispatch();
  return (
    <Link to="/" className="logo">
      Shop-In
    </Link>
  );
}

export default Logo;
