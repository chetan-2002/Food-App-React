import React, {useContext} from "react";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = (props) => {
  const price = `$${props.meal.price.toFixed(2)}`;
  const cartCtx  = useContext(CartContext);
  const addToCartHandler = amount =>{
    cartCtx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      price: props.meal.price,
      amount: amount
    });

  }
 
  return (
    <li className={styles.meal}>
      <div >
        <h3>{props.meal.name}</h3>
        <div className={styles.description}>{props.meal.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
          <MealItemForm onAddToCart = {addToCartHandler}/>
      </div>
    </li>
  );
};
export default MealItem;
