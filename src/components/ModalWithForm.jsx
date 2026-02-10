import Modal from "./Modal";
import "../blocks/ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  name,
  isOpen,
  onSubmit,
  isFormValid = true,
  footerContent,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} name={name}>
      <h3 className="modal__title">{title}</h3>
      <form className="modal__form" name={name} onSubmit={onSubmit}>
        {children}
        {footerContent ? (
          <div className="modal__actions">
            <button
              type="submit"
              className={`modal__submit ${
                !isFormValid ? "modal__submit_disabled" : ""
              }`}
              disabled={!isFormValid}
            >
              {buttonText}
            </button>
            {footerContent}
          </div>
        ) : (
          <button
            type="submit"
            className={`modal__submit ${
              !isFormValid ? "modal__submit_disabled" : ""
            }`}
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
        )}
      </form>
    </Modal>
  );
}

export default ModalWithForm;
