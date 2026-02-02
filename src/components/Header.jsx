import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import ToggleSwitch from "./ToggleSwitch";
import logoImage from "../assets/Logo (1).png";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Header({
  onAddClothesClick,
  onSignUp,
  onSignIn,
  isLoggedIn,
  weatherData,
}) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentLocation = weatherData?.city || "New York, NY";
  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || "";
  const userInitial = useMemo(
    () => (userName.trim() ? userName.trim()[0].toUpperCase() : "?"),
    [userName]
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <Link to="/" className="header__logo">
            <img
              src={logoImage}
              alt="WTWR Logo"
              className="header__logo-image"
            />
          </Link>
          <div className="header__date-location">
            <p className="header__date">
              {currentDate}, {currentLocation}
            </p>
          </div>
        </div>

        <div className="header__right">
          <ToggleSwitch />
          {isLoggedIn ? (
            <>
              <button
                className="header__add-button"
                onClick={onAddClothesClick}
                type="button"
              >
                + Add clothes
              </button>
              <Link to="/profile" className="header__user">
                <p className="header__user-name">{userName}</p>
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="header__user-avatar"
                  />
                ) : (
                  <div className="header__user-avatar-placeholder">
                    {userInitial}
                  </div>
                )}
              </Link>
            </>
          ) : (
            <div className="header__auth-buttons">
              <button
                className="header__auth-button"
                onClick={onSignUp}
                type="button"
              >
                Sign up
              </button>
              <button
                className="header__auth-button"
                onClick={onSignIn}
                type="button"
              >
                Log in
              </button>
            </div>
          )}
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
      </div>

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
          <ToggleSwitch />
          {isLoggedIn ? (
            <>
              <button
                className="header__mobile-add-button"
                onClick={onAddClothesClick}
                type="button"
              >
                + Add clothes
              </button>
              <Link to="/profile" className="header__mobile-user">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="header__mobile-user-avatar"
                  />
                ) : (
                  <div className="header__mobile-user-avatar-placeholder">
                    {userInitial}
                  </div>
                )}
                <p className="header__mobile-user-name">{userName}</p>
              </Link>
            </>
          ) : (
            <div className="header__mobile-auth-buttons">
              <button
                className="header__mobile-auth-button"
                onClick={onSignUp}
                type="button"
              >
                Sign up
              </button>
              <button
                className="header__mobile-auth-button"
                onClick={onSignIn}
                type="button"
              >
                Log in
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
