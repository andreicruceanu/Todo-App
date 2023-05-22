import React, { useState } from "react";
import "./Modal.css";
import { useEffect } from "react";

const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return (
    <div className={`${isOpen ? "modal-wrapper" : "modal-hidden"}`}>
      <div className="modal-content">
        <i
          onClick={closeModal}
          className="close-icon fa fa-times-circle-o"
          aria-hidden="true"
        ></i>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
