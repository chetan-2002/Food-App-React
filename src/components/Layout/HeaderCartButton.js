import React , {useContext} from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const cartCtx =useContext(CartContext);
  const numberOfItems = cartCtx.items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  return (
    <button className = {styles.button} onClick = {props.onClick}>
      <span className = {styles.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your cart</span>
      <span className = {styles.badge}>{numberOfItems}</span>
    </button>
  );
};
export default HeaderCartButton;
