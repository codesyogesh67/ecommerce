import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import CartPage from "../checkout/CartPage";
import "./Payment.css";
import axios from "./axios";
import {
  useElements,
  useStripe,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTotalAmount,
  updateQuantity,
  updateCart,
  selectCart,
} from "../../features/cart/cartSlice";
import Footer from "../../components/footer/Footer";
import { useHistory, Link, Redirect } from "react-router-dom";
import Message from "../../components/Message";

function Payment() {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const history = useHistory();
  const elements = useElements();
  const totalAmount = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectCart);
  const [buttonLabel, setButtonLabel] = useState("Pay now");
  const [message, setMessage] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonLabel("Loading");
    if (!stripe || !elements) {
      return;
    }

    const { clientSecret } = await axios({
      method: "post",
      url: `/payments/create?total=${totalAmount * 100}`,
    }).then((res) => res.data);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((paymentIntent) => {
        if (paymentIntent?.paymentIntent?.status === "succeeded") {
          dispatch(updateCart());
          history.push("/paymentSuccess");
        } else {
          setMessage(true);
          setError(paymentIntent.error.message);
          setTimeout(() => {
            setMessage(false);
            setButtonLabel("Pay now");
          }, 2000);
        }
      });
  };
  return (
    <>
      {totalQuantity.length < 1 ? (
        <Redirect to="/" />
      ) : (
        <>
          <div className="payment__wrapper">
            <Title title="Payment" />
            <Link to="/checkout" className="payment__back">
              {"<<"} Back to Cart
            </Link>
            {message && <Message message={error} />}
            <div className="payment__container">
              <div className="payment__box">
                <p>
                  Total Items:<span>{totalQuantity?.length}</span>{" "}
                </p>
                <p>
                  Total Amount: <span>$ {totalAmount}</span>
                </p>

                <form onSubmit={handleSubmit}>
                  <CardElement
                    className="payment__cardElement"
                    hidePostalCode={true}
                  />
                  <button className="payment__button">{buttonLabel}</button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

export default Payment;
