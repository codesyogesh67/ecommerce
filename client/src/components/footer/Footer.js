import React from "react";
import Logo from "../header/components/Logo";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__links">
          <p>Quick Links</p>
          <Link to="#">Refunds and Exchanges</Link>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms {"&"} Conditions</Link>
          <Link to="#">Contact Us</Link>
        </div>
        <div className="footer__info">Only Available to US residents.</div>

        <div className="footer__emailbar">
          <div className="footer__barTitle">
            News, Discounts, GiveAway {"&"} more.
          </div>
          <div className="footer__form">
            <input placeholder="Email Address" />
            <button>Subscribe</button>
          </div>
        </div>

        <div className="footer__social">Instagram and Youtube</div>
        <div className="footer__pay">By Stripe, Paypal and Mastercard</div>
        <div className="footer__endingLogo">2021, shopin</div>
      </div>
    </div>
  );
}

export default Footer;
