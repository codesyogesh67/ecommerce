import React, { useEffect, useState } from "react";
import "./FilteredProduct.css";
import "./ProductsList.css";
import { useSelector, useDispatch } from "react-redux";
import { pushToCart } from "../../../features/cart/cartSlice";
import Button from "./Button";
import {
  selectMessageStatus,
  selectMessage,
} from "../../../features/messageSlice";
import Message from "../../../components/Message";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  selectData,
  selectFilteredData,
} from "../../../features/products/productSlice";
import Footer from "../../../components/footer/Footer";

function FilteredProduct() {
  const data = useSelector(selectData);
  const dispatch = useDispatch();
  const messageStatus = useSelector(selectMessageStatus);
  const message = useSelector(selectMessage);

  const filterData = useSelector(selectFilteredData);

  return (
    <>
      <div className="filteredProducts">
        {messageStatus && <Message message={message} />}

        <div className="filteredProduct__title">{filterData.category}</div>
        <div className="filteredProductsList__list">
          {filterData.length > 0 ? (
            filterData.map((each) => (
              <div className="filteredProductsList__product" key={each.id}>
                <img
                  src={`../images/products/${each.category}/${each.image}`}
                  alt={each.name}
                />
                <p className="productsList__productName">{each.name}</p>
                <p className="productsList__productPrice">$ {each.price}</p>

                <Button obj={each} message="Add to Cart" />
              </div>
            ))
          ) : (
            <Message message="The item you search is not found." />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FilteredProduct;
