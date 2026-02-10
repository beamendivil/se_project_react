import { useEffect } from "react";
import "../blocks/Modal.css";

function Modal({ isOpen, onClose, name, children, containerClassName = "" }) {
  // Handle Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${name ? `modal_type_${name}` : ""} ${
        isOpen ? "modal_opened" : ""
      }`}
      onClick={handleOverlayClick}
    >
      <div className={`modal__container ${containerClassName}`}>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        />
        {children}
      </div>
    </div>
  );
}

export default Modal;
