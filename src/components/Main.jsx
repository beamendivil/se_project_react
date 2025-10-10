import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "./Main.css";

function Main({ weatherData, clothingItems, onCardClick }) {
  // Determine weather type based on temperature
  const temperature = weatherData?.temperature?.F || 75;
  const currentWeatherType =
    temperature >= 75 ? "hot" : temperature >= 60 ? "warm" : "cold";

  // Filter items based on weather type with defensive checks
  const filteredItems = (clothingItems || []).filter((item) => {
    return item && item.weather === currentWeatherType;
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="main__items">
        <ul className="main__items-list">
          {filteredItems.map((item) => (
            <li key={item.id || item._id} className="main__item">
              <ItemCard item={item} onCardClick={onCardClick} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
