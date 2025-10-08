import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleClick = () => {
    if (onCardClick) {
      onCardClick(item);
    }
  };

  return (
    <div className="item-card" onClick={handleClick}>
      <img src={item.imageUrl} alt={item.name} className="item-card-image" />
      <div className="item-card-label">
        <span className="item-card-name">{item.name}</span>
      </div>
    </div>
  );
}

export default ItemCard;
