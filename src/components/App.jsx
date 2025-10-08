import { useState, useEffect } from "react";

import Header from "./Header";
import Main from "./main.jsx";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";

import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import defaultClothingItems from "../utils/defaultClothingItems";

import "../App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);

  // Fetch weather data and set default clothing items on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Fetch weather data
        const data = await getForecastWeather();
        const weather = parseWeatherData(data);
        setWeatherData(weather);

        // Set default clothing items (normalized to match our component expectations)
        const normalizedClothingItems = defaultClothingItems.map((item) => ({
          id: item._id,
          name: item.name,
          imageUrl: item.link,
          weather: item.weather.toLowerCase(), // Ensure consistent casing
          description: `A ${item.name.toLowerCase()} perfect for ${item.weather.toLowerCase()} weather.`,
        }));

        setClothingItems(normalizedClothingItems);
      } catch (error) {
        console.error("Error loading initial data:", error);
        // Set fallback data
        setWeatherData({
          city: "New York",
          temperature: { F: 68, C: 20 },
          condition: "Partly Cloudy",
          weatherType: "warm",
        });
        setClothingItems([]);
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

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setActiveModal("item-details");
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
    <div className="app">
      <Header
        onAddClothesClick={handleOpenAddClothesModal}
        weatherData={weatherData}
      />

      <Main
        weatherData={weatherData}
        clothingItems={clothingItems}
        onCardClick={handleCardClick}
      />

      <Footer />

      <ModalWithForm
        isOpen={activeModal === "add-clothes"}
        onClose={handleCloseModal}
        title="Add New Clothes"
        name="add-clothes"
        buttonText="Add garment"
      >
        {/* Form content will be added here */}
        <p>Form for adding new clothes will go here.</p>
      </ModalWithForm>

      <ItemModal
        activeModal={activeModal}
        onClose={handleCloseModal}
        card={selectedItem}
      />
    </div>
  );
}

export default App;
