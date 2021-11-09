import React from "react";
import styles from "./Modal.module.css";
import { Fragment } from "react";
import reactDom from "react-dom";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick = {props.onClose}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
const portal = document.getElementById("overlay");
const Modal = (props) => {
  return (
    <Fragment>
      {reactDom.createPortal(<Backdrop onClose = {props.onClose}/>, portal)}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portal
      )}
    </Fragment>
  );
};
export default Modal;
