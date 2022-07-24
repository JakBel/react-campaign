import React from "react";
import ReactDom from "react-dom";
import Axios from "axios";
import classes from "./Modal.module.css";

const Modal = (props) => {
    if (!props.open) return null;

    return ReactDom.createPortal(
        <>
            <div className={classes.overlay} />
            <div className={classes.modal}>
                <button onClick={props.onClose}>Close</button>
            </div>
        </>,
        document.getElementById("portal")
    );
};

export default Modal;
