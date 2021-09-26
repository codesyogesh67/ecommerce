import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { data } from "../../../data";
import { useDispatch, useSelector } from "react-redux";
import "./ProductsList.css";
import { pushToCart, selectCart } from "../../../features/cart/cartSlice";
import { selectUser } from "../../../features/auth/authSlice";
import Message from "../../../components/Message";
import {
  updateMessage,
  updateMessageStatus,
} from "../../../features/messageSlice";
import Button from "./Button";

function ProductsList() {
  const location = useLocation();
  const [list, setList] = useState([]);
  const categoryName = location.state?.category;
  const dispatch = useDispatch();
  const cartList = useSelector(selectCart);
  const user = useSelector(selectUser);

  useEffect(() => {
    const filteredList = [];
    data.filter((obj) =>
      obj.category === categoryName ? filteredList.push(obj) : null
    );
    setList(filteredList);
  }, []);

  return (
    <div className="productsList">
      <div className="productsList__title">{categoryName}</div>
      <div className="productsList__list">
        {list.map((obj) => (
          <div key={obj.id} className="productsList__product">
            <img src={`./images/products/${obj.category}/${obj.image}`} />
            <p className="productsList__productName">{obj.name}</p>
            <p className="productsList__productPrice">$ {obj.price}</p>

            <Button obj={obj} message="Add to Cart" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
