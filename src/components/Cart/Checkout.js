import classes from "./Checkout.module.css";
import { useRef, useState } from "react";
const isEmpty = (value) => {
  return value.trim() === "";
};
const isNotFiveCharacters = (value) => {
    return value.length === 6;}
const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode : true,});
    
  const nameInputRef = useRef(null);
  const postalCodeInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode) && isNotFiveCharacters(enteredPostalCode);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    
    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredAddressIsValid,
        city: enteredCityIsValid,
        postalCode : enteredPostalCodeIsValid,
    });
    const formIsValid =enteredAddressIsValid && enteredCityIsValid && enteredNameIsValid && enteredPostalCodeIsValid;

    if (!formIsValid) {
        return;
    }
    props.onConfirm({
        name : enteredName,
        street : enteredAddress,
        city : enteredCity,
        postalCode : enteredPostalCode,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter your name</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={addressInputRef} />
        {!formInputsValidity.street && <p>Please enter your street</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && <p>Please enter your postal code</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter your city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
