import ItemCard from "./ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onCardClick, onAddClothesClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__add-button"
          onClick={onAddClothesClick}
          type="button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <li key={item.id || item._id} className="clothes-section__item">
            <ItemCard item={item} onCardClick={onCardClick} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
