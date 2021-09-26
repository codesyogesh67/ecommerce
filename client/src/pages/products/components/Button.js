import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./FilteredProduct.css";
import "./ProductsList.css";
import { pushToCart } from "../../../features/cart/cartSlice";
import { selectUser, updateUser } from "../../../features/auth/authSlice";
import {
  updateMessageStatus,
  updateMessage,
} from "../../../features/messageSlice";

function Button(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const addToCart = (obj) => {
    if (user) {
      dispatch(pushToCart(obj));
    } else {
      const message = "You are not logged in.";
      dispatch(updateMessage(message));
      dispatch(updateMessageStatus(true));
    }
  };

  return (
    <button
      onClick={() => addToCart(props.obj)}
      className="productsList__productButton"
    >
      {props.message}
    </button>
  );
}

export default Button;
