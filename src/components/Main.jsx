import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "./Main.css";

function Main({ weatherData, clothingItems, onCardClick }) {
  // Get the weather type from the weatherData
  const currentWeatherType = weatherData?.weatherType || "warm";

  // Filter items based on weather type with defensive checks
  const filteredItems = (clothingItems || []).filter((item) => {
    if (!item || !item.weather) return false;
    // Case-insensitive comparison to handle "Hot" vs "hot"
    return item.weather.toLowerCase() === currentWeatherType.toLowerCase();
  });

  return (
    <main className="main">
      <div className="main__inner">
        <WeatherCard weatherData={weatherData} />
        <section className="main__items">
          <p className="main__clothing-text">
            Today is {weatherData?.temperature?.F || 75}°F / You may want to
            wear:
          </p>
          <ul className="main__items-list">
            {filteredItems.map((item) => (
              <li key={item.id || item._id} className="main__item">
                <ItemCard item={item} onCardClick={onCardClick} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Main;
