import React, {useState} from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting , setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item , amount :1});
  };
  const CartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            item={item}
            onRemove={cartItemRemoveHandler.bind(null , item.id)}
            onAdd={cartItemAddHandler.bind(null , item)}
          />
        );
      })}
    </ul>
  );
  const orderHandler = () => {
    setIsCheckout(true);
  }
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://food-ordering-app-df053-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user : userData,
        ordreredItems : cartCtx.items,
      }),
    })
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && <React.Fragment>
      {CartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      { isCheckout && <Checkout onCancel={props.onClose} onConfirm = {submitOrderHandler}></Checkout>}
      {!isCheckout && <div className={styles.actions}>
        <button className={styles["button-alt"]} onClick={props.onClose}>
          Cancel
        </button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
      </div>}
      </React.Fragment>}
      {isSubmitting && <p>Sending Order to the database...</p>}
      {didSubmit && <p>Order sent successfully</p>}
    </Modal>
  );
};
export default Cart;
