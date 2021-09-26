import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import { Link, useHistory } from "react-router-dom";
import { selectCart } from "../../../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../../features/auth/authSlice";
import { auth } from "../../../firebase";
import Searchbar from "./Searchbar";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

function Links() {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignout = () => {
    auth.signOut();
    dispatch(logout());
    history.push("/");
  };

  return (
    <div className="links">
      <Link to="/checkout">
        <IconButton>
          <ShoppingCartIcon className="links__cartIcon" />
          {cart.length > 0 && (
            <p className="links__cartLength">{cart.length}</p>
          )}
        </IconButton>
      </Link>
      {user === null ? (
        <Link to="/login">
          <IconButton>
            <PersonIcon className="links__personIcon" />
          </IconButton>
        </Link>
      ) : (
        <button className="links__logout" onClick={handleSignout}>
          <ExitToAppOutlinedIcon />
        </button>
      )}
    </div>
  );
}

export default Links;
