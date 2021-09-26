import React, { useState } from "react";
import Title from "../../components/Title";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  removeItem,
  updateQuantity,
  updateTotalAmount,
} from "../../features/cart/cartSlice";
import "./CartPage.css";
import { Link } from "react-router-dom";

function CartPage() {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const cartList = useSelector(selectCart);

  const changeQuantity = (value, id) => {
    dispatch(updateQuantity({ value, id }));
    setQuantity(value);
  };
  let totalAmount;
  totalAmount = cartList.reduce((a, b) => a + Number(b.price) * b.quantity, 0);

  const updateCart = () => {
    dispatch(updateTotalAmount(totalAmount));
  };
  return (
    <div className="cartPage">
      <div className="cartPage__container">
        <Title title="Cart" />
        <Link to="/" className="cartPage__back">
          {"<<<"} Back to Shopping
        </Link>
        {cartList.length > 0 ? (
          <div className="cartPage__list">
            {cartList.map((product) => (
              <div key={product.id}>
                <div className="cartPage__product">
                  <div className="cartPage__productInfo">
                    <p className="cartPage__productName">{product.name}</p>
                    <p className="cartPage__productQuantity">
                      Qty:
                      <select
                        value={product.quantity}
                        onChange={(e) =>
                          changeQuantity(e.target.value, product.id)
                        }
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </p>
                    <span className="cartPage__productPrice">
                      ${product.price * product.quantity}
                    </span>
                  </div>

                  <div className="cartPage__image">
                    <img
                      src={`./images/products/${product.category}/${product.image}`}
                    />
                  </div>

                  <button
                    onClick={() => dispatch(removeItem(product.id))}
                    className="cartPage__removeItem"
                  >
                    Remove
                  </button>
                </div>
                <div className="cartPage__productDivider" />
              </div>
            ))}
            <div className="cartPage__productDivider" />
            <div className="cartPage__footer">
              <p className="cartPage__totalAmount">
                Total Amount :$ {totalAmount}
              </p>
              <Link
                className="cartPage__Payment"
                to="/payment"
                onClick={updateCart}
              >
                Proceed to Payment >>>
              </Link>
            </div>
          </div>
        ) : (
          <div className="cartList__empty"> The cart is empty.</div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
