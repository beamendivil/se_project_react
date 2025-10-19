import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card }) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container modal__container_type_image">
        <button type="button" className="modal__close" onClick={onClose} />
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
