import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleClick = () => {
    if (onCardClick) {
      onCardClick(item);
    }
  };

  // Add defensive checks to prevent null/undefined errors
  if (!item) {
    return null;
  }

  return (
    <div className="item-card" onClick={handleClick}>
      <img
        src={item.imageUrl || item.link || ""}
        alt={item.name || "Clothing item"}
        className="item-card-image"
      />
      <div className="item-card-label">
        <span className="item-card-name">{item.name || "Unknown item"}</span>
      </div>
    </div>
  );
}

export default ItemCard;
