import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleClick = () => {
    if (onCardClick) {
      onCardClick(item);
    }
  };

  const handleLikeClick = (event) => {
    event.stopPropagation(); // Prevent card click when clicking like button
    // TODO: Add like functionality here
  };

  // Add defensive checks to prevent null/undefined errors
  if (!item) {
    return null;
  }

  return (
    <div className="item-card" onClick={handleClick}>
      <img
        src={item.link || item.imageUrl || ""}
        alt={item.name || "Clothing item"}
        className="item-card-image"
      />
      <button
        className="item-card__like-button"
        onClick={handleLikeClick}
        type="button"
        aria-label={`Like ${item.name || "item"}`}
      >
        <svg
          className="item-card__like-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>
      <div className="item-card-label">
        <span className="item-card-name">{item.name || "Unknown item"}</span>
      </div>
    </div>
  );
}

export default ItemCard;
