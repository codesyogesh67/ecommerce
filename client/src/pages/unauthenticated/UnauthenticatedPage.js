import React from "react";
import { Link } from "react-router-dom";
import "./Unauthenticated.css";
import Footer from "../../components/footer/Footer";

function UnauthenticatedPage() {
  return (
    <>
      <div className="unauthenticatedPage__container">
        <div className="unauthenticatedPage__main">
          You are not logged in. Please
          <Link className="unauthenticatedPage__link" to="/login">
            {" "}
            Log in{" "}
          </Link>
          <span>to proceed...</span>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UnauthenticatedPage;
