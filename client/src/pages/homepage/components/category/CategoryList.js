import React from "react";
import "./CategoryList.css";
import { Link } from "react-router-dom";

function CategoryList() {
  return (
    <div className="categoryList">
      <div className="categoryList__container">
        <div className="categoryList__items">
          <Link
            to={{
              pathname: "/men",
              state: { category: "men" },
            }}
            className="categoryList__category"
          >
            <p className="categoryList__link">Men</p>
            <img src="./images/category/men.jpeg" />
          </Link>

          <Link
            to={{
              pathname: "/women",
              state: { category: "women" },
            }}
            className="categoryList__category"
          >
            <p className="categoryList__link">Women</p>
            <img src="./images/category/women.jpeg" />
          </Link>

          <Link
            to={{
              pathname: "/kids",
              state: { category: "kids" },
            }}
            className="categoryList__category"
          >
            <p className="categoryList__link">Kids</p>
            <img src="./images/category/kids.jpeg" />
          </Link>

          <Link
            to={{
              pathname: "/shoes",
              state: { category: "shoes" },
            }}
            className="categoryList__category"
          >
            <p className="categoryList__link">Shoes</p>
            <img src="./images/category/shoes.jpeg" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
