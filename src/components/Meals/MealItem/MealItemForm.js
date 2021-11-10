import React,  {useState,useRef} from "react";

import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const [amountIsValid ,setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (enteredAmountNumber < 1 || enteredAmountNumber >5 || enteredAmount.trim().length === 0) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);

    
  };
  return (
    <form className={styles.form} onSubmit= {submitHandler}>
      <Input
        ref = {amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>
  );
};
export default MealItemForm;
