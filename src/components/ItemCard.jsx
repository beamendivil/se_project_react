import { useContext } from "react";
import "../blocks/ItemCard.css";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemCard({
  item,
  onCardClick,
  onDeleteItem,
  onCardLike,
  showControls,
}) {
  const currentUser = useContext(CurrentUserContext);
  const handleClick = () => {
    if (onCardClick) {
      onCardClick(item);
    }
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    if (onDeleteItem) {
      onDeleteItem(item);
    }
  };

  const handleLike = (event) => {
    event.stopPropagation();
    if (!onCardLike || !item?._id) {
      return;
    }

    const likes = Array.isArray(item.likes) ? item.likes : [];
    const isLiked = currentUser?._id
      ? likes.some((id) => id === currentUser._id)
      : false;

    onCardLike({ id: item._id, isLiked });
  };

  // Add defensive checks to prevent null/undefined errors
  if (!item) {
    return null;
  }

  const likes = Array.isArray(item.likes) ? item.likes : [];
  const isLiked = currentUser?._id
    ? likes.some((id) => id === currentUser._id)
    : false;
  const itemLikeButtonClassName = `item-card__like-button ${
    isLiked ? "item-card__like-button_active" : ""
  } ${showControls ? "item-card__like-button_with-controls" : ""}`;

  return (
    <div className="item-card" onClick={handleClick}>
      <img
        src={item.imageUrl || item.link || ""}
        alt={item.name || "Clothing item"}
        className="item-card-image"
      />
      {currentUser?._id && (
        <button
          className={itemLikeButtonClassName}
          type="button"
          aria-label={isLiked ? "Unlike item" : "Like item"}
          onClick={handleLike}
        />
      )}
      {showControls && (
        <>
          <div className="item-card__weather-badge">
            {item.weather || "Unknown"}
          </div>
          <button
            className="item-card__delete-button"
            onClick={handleDeleteClick}
            type="button"
            aria-label={`Delete ${item.name || "item"}`}
          >
            Delete
          </button>
        </>
      )}
      <div className="item-card-label">
        <span className="item-card-name">{item.name || "Unknown item"}</span>
      </div>
    </div>
  );
}

export default ItemCard;
