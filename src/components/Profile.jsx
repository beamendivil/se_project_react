import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  onAddClothesClick,
  onDeleteItem,
  onCardLike,
  onEditProfile,
  onSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddClothesClick={onAddClothesClick}
          onDeleteItem={onDeleteItem}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
