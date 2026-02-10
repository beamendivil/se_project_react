import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Modal from "./Modal";
import "../blocks/ItemModal.css";

function ItemModal({ isOpen, onClose, card, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  const handleDeleteClick = () => {
    onDeleteItem(card);
  };

  const isOwn =
    !!card &&
    !!currentUser?._id &&
    (card.owner === currentUser._id || card.owner?._id === currentUser._id);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      name="image"
      containerClassName="modal__container_type_image"
    >
      {card && (
        <>
          <img
            src={card.link || card.imageUrl || ""}
            alt={card.name || "Clothing item"}
            className="modal__image"
          />
          <div className="modal__footer">
            <h2 className="modal__caption">{card.name || "Unknown item"}</h2>
            <p className="modal__weather">
              Weather: {card.weather || "Unknown"}
            </p>
            {isOwn && (
              <button
                type="button"
                className="modal__delete-button"
                onClick={handleDeleteClick}
              >
                Delete item
              </button>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}

export default ItemModal;
