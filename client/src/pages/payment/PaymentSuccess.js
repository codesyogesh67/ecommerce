import React from "react";
import Footer from "../../components/footer/Footer";
import "./Payment.css";
import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <>
      <div className="paymentSuccess__container">
        Success, Your order has been placed.
        <Link to="/" className="paymentSuccess__back">
          Back to HomePage
        </Link>
      </div>

      <Footer />
    </>
  );
}

export default PaymentSuccess;
