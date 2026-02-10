import { useContext, useMemo } from "react";
import "../blocks/SideBar.css";
import CurrentUserContext from "../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || "";
  const userInitial = useMemo(
    () => (userName.trim() ? userName.trim()[0].toUpperCase() : "?"),
    [userName]
  );

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName}
            className="sidebar__user-avatar"
          />
        ) : (
          <div className="sidebar__user-avatar-placeholder">
            {userInitial}
          </div>
        )}
        <p className="sidebar__user-name">{userName}</p>
      </div>
      <button
        className="sidebar__edit-button"
        type="button"
        onClick={onEditProfile}
      >
        Edit profile
      </button>
      <button
        className="sidebar__signout-button"
        type="button"
        onClick={onSignOut}
      >
        Sign out
      </button>
    </div>
  );
}

export default SideBar;
