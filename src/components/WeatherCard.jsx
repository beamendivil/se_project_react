import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  // Access the Fahrenheit temperature from the nested structure
  const temperature = weatherData?.temperature?.F ?? 75;

  return (
    <div className="weather-card">
      <div className="weather-temperature">{temperature}°F</div>
      <div className="weather-title">Sprint 10: WTWR</div>
    </div>
  );
}

export default WeatherCard;
