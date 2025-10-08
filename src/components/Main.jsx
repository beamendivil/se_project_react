import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "./Main.css";

function Main({ weatherData, clothingItems, onCardClick }) {
  // Use weatherType from weatherData (provided by weather API)
  const currentWeatherType = weatherData?.weatherType || "warm";

  // Filter items based on weather type
  const filteredItems = clothingItems.filter((item) => {
    // This is a basic filter - in reality you'd have more complex logic
    return (
      item.weather.toLowerCase().includes(currentWeatherType) ||
      item.weather.toLowerCase() === "all"
    );
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__items">
        <ul className="main__items-list">
          {filteredItems.map((item) => (
            <li key={item.id} className="main__item">
              <ItemCard item={item} onCardClick={onCardClick} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
