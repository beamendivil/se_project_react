import ModalWithForm from "./ModalWithForm.jsx";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirmDelete,
  itemToDelete,
}) {
  const handleConfirmClick = () => {
    onConfirmDelete(itemToDelete);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure you want to delete this item?"
      name="delete-confirmation"
      buttonText="Yes, delete item"
      onSubmit={handleConfirmClick}
    >
      <p className="delete-modal__warning">This action is irreversible.</p>
      <div className="delete-modal__buttons">
        <button
          type="button"
          className="delete-modal__cancel-button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </ModalWithForm>
  );
}

export default DeleteConfirmationModal;
