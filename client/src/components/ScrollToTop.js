import React from "react";
import { withRouter } from "react-router-dom";

function ScrollToTop(prevProps) {
  const { location } = prevProps;

  if (location.pathanme !== prevProps.location.pathname) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }
  const { children } = prevProps;
  return children;
}

export default withRouter(ScrollToTop);
