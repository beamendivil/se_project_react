import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import Footer from "./Footer";
import AddItemModal from "./AddItemModal/AddItemModal";
import ItemModal from "./ItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import EditProfileModal from "./EditProfileModal";
import ProtectedRoute from "./ProtectedRoute";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../utils/api";
import { register, authorize, checkToken } from "../utils/auth";

import "../blocks/App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // Fetch weather data and clothing items on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // Fetch clothing items from the server
        const items = await getItems();
        setClothingItems(items);
      } catch (error) {
        console.error("Error loading clothing items:", error);
        setClothingItems([]);
      }

      try {
        // Try to fetch weather data
        const data = await getForecastWeather();
        const weather = parseWeatherData(data);
        setWeatherData(weather);
      } catch (error) {
        console.error("Error loading weather data:", error);
        // Set fallback weather data
        setWeatherData({
          city: "New York",
          temperature: { F: 68, C: 20 },
          condition: "Partly Cloudy",
          weatherType: "warm",
        });
      }
      setIsLoading(false);
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Token validation failed:", error);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser({});
      });
  }, []);

  const handleOpenAddClothesModal = () => {
    setActiveModal("add-clothes");
  };

  const handleOpenSignUpModal = () => {
    setActiveModal("signup");
  };

  const handleOpenSignInModal = () => {
    setActiveModal("login");
  };

  const handleSwitchToSignUp = () => {
    setActiveModal("signup");
  };

  const handleSwitchToLogin = () => {
    setActiveModal("login");
  };

  const handleOpenEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedItem(null);
    setItemToDelete(null);
  };

  const handleAddItem = async (newItem, resetForm) => {
    try {
      if (!isLoggedIn) {
        return;
      }

      const token = localStorage.getItem("jwt");

      // Add the new item to the server
      const createdItem = await addItem(newItem, token);

      // Add the new item to the beginning of clothing items array
      setClothingItems((prevItems) => [createdItem, ...prevItems]);

      // Reset the form after successful submission
      resetForm();

      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error("Error adding item:", error);
      // You could add error handling UI here if needed
    }
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setActiveModal("item-details");
  };

  const openConfirmationModal = (item) => {
    setItemToDelete(item);
    setActiveModal("delete-confirmation");
  };

  const handleCardDelete = async (item) => {
    try {
      if (!isLoggedIn) {
        return;
      }

      const token = localStorage.getItem("jwt");
      const itemId = item._id;

      // Delete the item from the server by its Mongo-style _id
      await deleteItem(itemId, token);

      // Optimistically remove the item from local state
      setClothingItems((prevItems) =>
        prevItems.filter((clothingItem) => clothingItem._id !== itemId)
      );

      // Close all modals and reset state
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting item:", error);
      // You could add error handling UI here if needed
    }
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (activeModal) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [activeModal]);

  const handleLogin = async ({ email, password }, resetForm) => {
    try {
      const res = await authorize({ email, password });

      if (res?.token) {
        localStorage.setItem("jwt", res.token);
        const userData = await checkToken(res.token);
        setCurrentUser(userData);
        setIsLoggedIn(true);
        if (resetForm) {
          resetForm();
        }
        handleCloseModal();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async ({ name, avatar, email, password }, resetForm) => {
    try {
      await register({ name, avatar, email, password });
      await handleLogin({ email, password }, resetForm);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleUpdateUser = async ({ name, avatar }, resetForm) => {
    try {
      const token = localStorage.getItem("jwt");
      const updatedUser = await updateUserProfile({ name, avatar }, token);
      setCurrentUser(updatedUser);
      if (resetForm) {
        resetForm();
      }
      handleCloseModal();
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleCardLike = ({ id, isLiked }) => {
    if (!isLoggedIn) {
      return;
    }

    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((items) =>
            items.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((error) => {
          console.error("Error liking item:", error);
        });
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((items) =>
            items.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((error) => {
          console.error("Error unliking item:", error);
        });
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Router>
            <Header
              onAddClothesClick={handleOpenAddClothesModal}
              onSignUp={handleOpenSignUpModal}
              onSignIn={handleOpenSignInModal}
              isLoggedIn={isLoggedIn}
              weatherData={weatherData}
            />

            <Routes>
              <Route
                path="/"
                element={
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                    />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        clothingItems={clothingItems}
                        onCardClick={handleCardClick}
                        onAddClothesClick={handleOpenAddClothesModal}
                        onDeleteItem={openConfirmationModal}
                        onCardLike={handleCardLike}
                        onEditProfile={handleOpenEditProfileModal}
                        onSignOut={handleSignOut}
                      />
                    </ProtectedRoute>
                  )
                }
              />
            </Routes>

            <Footer />

            <AddItemModal
              isOpen={activeModal === "add-clothes"}
              onAddItem={handleAddItem}
              onCloseModal={handleCloseModal}
            />

            <ItemModal
              isOpen={activeModal === "item-details"}
              onClose={handleCloseModal}
              card={selectedItem}
              onDeleteItem={openConfirmationModal}
            />

            <DeleteConfirmationModal
              isOpen={activeModal === "delete-confirmation"}
              onClose={handleCloseModal}
              onConfirmDelete={handleCardDelete}
              itemToDelete={itemToDelete}
            />

            <RegisterModal
              isOpen={activeModal === "signup"}
              onRegister={handleRegister}
              onCloseModal={handleCloseModal}
              onSwitchToLogin={handleSwitchToLogin}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onLogin={handleLogin}
              onCloseModal={handleCloseModal}
              onSwitchToRegister={handleSwitchToSignUp}
            />

            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onUpdateUser={handleUpdateUser}
              onCloseModal={handleCloseModal}
            />
          </Router>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
