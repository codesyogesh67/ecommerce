import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import ProductsList from "./components/ProductsList";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message";
import {
  selectMessage,
  selectMessageStatus,
  updateMessage,
  updateMessageStatus,
} from "../../features/messageSlice";
import Footer from "../../components/footer/Footer";

function Products() {
  const messageStatus = useSelector(selectMessageStatus);
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateMessageStatus(false));
  }, []);
  return (
    <>
      {messageStatus && (
        <div className="products__message">
          <Message message={message} />
        </div>
      )}
      <ProductsList />
      <Footer />
    </>
  );
}

export default Products;
