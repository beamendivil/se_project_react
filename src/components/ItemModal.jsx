import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card }) {
  // Don't render if modal is not active or card is null
  if (!card || activeModal !== "item-details") {
    return null;
  }

  return (
    <div className="modal modal_opened">
      <div className="modal__container modal__container_type_image">
        <button type="button" className="modal__close" onClick={onClose} />
        <img
          src={card.imageUrl || card.link || ""}
          alt={card.name || "Clothing item"}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name || "Unknown item"}</h2>
          <p className="modal__weather">Weather: {card.weather || "Unknown"}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
