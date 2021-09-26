import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/homepage/Home";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Products from "./pages/products/Products";
import Checkout from "./pages/checkout/Checkout";
import Payment from "./pages/payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Login from "./pages/auth/Login";
import { auth } from "./firebase";
import { BrowserRouter as Router } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/auth/authSlice";
import Register from "./pages/auth/Register";
import { selectInput, loadProducts } from "./features/products/productSlice";
import FilteredProduct from "./pages/products/components/FilteredProduct";
import { data } from "./data";
import { selectUser } from "./features/auth/authSlice";
import UnauthenticatedPage from "./pages/unauthenticated/UnauthenticatedPage";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(selectUser);
  const locationState = location.state;
  const stripePromise = loadStripe(
    `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
  );

  useEffect(() => {
    dispatch(loadProducts(data));
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            userId: authUser.id,
            email: authUser.email,
            name: authUser.displayName,
          })
        );
      }
    });
  }, []);

  return (
    <>
      <ScrollToTop>
        <Header />
      </ScrollToTop>

      {/* <div className="app__mainbody"> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search/:handle" component={FilteredProduct} />
        <Route exact path="/checkout">
          {user !== null ? <Checkout /> : <UnauthenticatedPage />}
        </Route>
        <Route exact path="/payment">
          {user !== null ? (
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          ) : (
            <UnauthenticatedPage />
          )}
        </Route>
        <Route exact path="/paymentSuccess" component={PaymentSuccess} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        {locationState ? (
          <Route exact path="/:handle" component={Products} />
        ) : (
          <Route exact path="/:handle" component={Home} />
        )}
      </Switch>

      {/* </div> */}
    </>
  );
}

export default App;
