import { useContext, useMemo } from "react";
import ItemCard from "./ItemCard";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/ClothesSection.css";

function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClothesClick,
  onDeleteItem,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = useMemo(() => {
    if (!currentUser?._id) {
      return [];
    }

    return (clothingItems || []).filter(
      (item) => item?.owner === currentUser._id || item?.owner?._id === currentUser._id
    );
  }, [clothingItems, currentUser]);

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
        {userItems.map((item) => (
          <li key={item._id} className="clothes-section__item">
            <ItemCard 
              item={item} 
              onCardClick={onCardClick} 
              onDeleteItem={onDeleteItem}
              onCardLike={onCardLike}
              showControls={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
