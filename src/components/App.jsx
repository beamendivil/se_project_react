import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Main from "./Main.jsx";
import Profile from "./Profile";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import defaultClothingItems from "../utils/defaultClothingItems";

import "../App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Fetch weather data and set default clothing items on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      // Set default clothing items
      setClothingItems(defaultClothingItems);

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
    };

    loadInitialData();
  }, []);

  const handleOpenAddClothesModal = () => {
    setActiveModal("add-clothes");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedItem(null);
  };

  const handleAddGarmentSubmit = (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const newItem = {
      _id: Date.now(), // Simple ID generation
      name: formData.get("name"),
      link: formData.get("imageUrl"),
      weather: formData.get("weather"),
    };

    // Add the new item to clothing items
    setClothingItems((prevItems) => [...prevItems, newItem]);

    // Close the modal
    handleCloseModal();
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setActiveModal("item-details");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
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

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Router>
          <Header
            onAddClothesClick={handleOpenAddClothesModal}
            weatherData={weatherData}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAddClothesClick={handleOpenAddClothesModal}
                />
              }
            />
          </Routes>

          <Footer />

          <ModalWithForm
            isOpen={activeModal === "add-clothes"}
            onClose={handleCloseModal}
            onSubmit={handleAddGarmentSubmit}
            title="Add New Clothes"
            name="add-clothes"
            buttonText="Add garment"
          >
            <label className="modal__label">
              Name
              <input
                type="text"
                className="modal__input"
                name="name"
                placeholder="Name"
                required
              />
            </label>

            <label className="modal__label">
              Image URL
              <input
                type="url"
                className="modal__input"
                name="imageUrl"
                placeholder="Image URL"
                required
              />
            </label>

            <fieldset className="modal__radio-buttons">
              <legend className="modal__legend">
                Select the weather type:
              </legend>
              <label className="modal__label modal__label_type_radio">
                <input
                  type="radio"
                  name="weather"
                  value="hot"
                  className="modal__radio-input"
                  required
                />
                Hot
              </label>
              <label className="modal__label modal__label_type_radio">
                <input
                  type="radio"
                  name="weather"
                  value="warm"
                  className="modal__radio-input"
                  required
                  defaultChecked
                />
                Warm
              </label>
              <label className="modal__label modal__label_type_radio">
                <input
                  type="radio"
                  name="weather"
                  value="cold"
                  className="modal__radio-input"
                  required
                />
                Cold
              </label>
            </fieldset>
          </ModalWithForm>

          <ItemModal
            isOpen={activeModal === "item-details"}
            onClose={handleCloseModal}
            card={selectedItem}
          />
        </Router>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
