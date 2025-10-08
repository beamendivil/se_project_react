import { useState } from "react";
import "./Header.css";

function Header({ onAddClothesClick, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentLocation = weatherData?.city || "New York, NY";
  const userName = "Terrence Tegegne";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          <span className="header__logo-text">wtwr°</span>
        </div>
        <div className="header__date-location">
          <p className="header__date">
            {currentDate}, {currentLocation}
          </p>
        </div>
      </div>

      <div className="header__right">
        <button
          className="header__add-button"
          onClick={onAddClothesClick}
          type="button"
        >
          + Add clothes
        </button>
        <div className="header__user">
          <p className="header__user-name">{userName}</p>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        className={`header__mobile-menu-btn ${
          isMobileMenuOpened
            ? "header__mobile-menu-btn_close"
            : "header__mobile-menu-btn_hamburger"
        }`}
        onClick={toggleMobileMenu}
        type="button"
        aria-label="Toggle mobile menu"
      >
        <span className="header__mobile-menu-line"></span>
        <span className="header__mobile-menu-line"></span>
        <span className="header__mobile-menu-line"></span>
      </button>

      {/* Mobile menu overlay */}
      <div
        className={`header__mobile-menu ${
          isMobileMenuOpened ? "header__mobile-menu_opened" : ""
        }`}
      >
        <div className="header__mobile-menu-content">
          <div className="header__mobile-date-location">
            <p className="header__mobile-date">{currentDate}</p>
            <p className="header__mobile-location">{currentLocation}</p>
          </div>
          <button
            className="header__mobile-add-button"
            onClick={onAddClothesClick}
            type="button"
          >
            + Add clothes
          </button>
          <div className="header__mobile-user">
            <p className="header__mobile-user-name">{userName}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
