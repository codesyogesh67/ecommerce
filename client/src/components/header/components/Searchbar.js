import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { data } from "../../../data";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { updateFilteredData } from "../../../features/products/productSlice";

function Searchbar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [showSearch, setShowSearch] = useState(false);

  const handleChange = (value) => {
    setInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const list = [];
    if (input == "") {
      history.push("/");
    } else {
      data.filter((product) => {
        if (product.name.toLowerCase().includes(input)) {
          list.push(product);
        }
        return history.push(`/search/${input}`);
      });
      dispatch(updateFilteredData(list));
    }
    setInput("");
  };

  const showSearchBar = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="searchbar">
      <form className="searchbar__form" onSubmit={handleSubmit}>
        <input
          value={input}
          className={!showSearch ? "searchbar__input" : "searchbar__showInput"}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search..."
        />
        <div
          className={!showSearch ? "searchbar__icon" : "searchbar__showIcon"}
        >
          <SearchIcon onClick={showSearchBar} />
        </div>
      </form>
    </div>
  );
}

export default Searchbar;
