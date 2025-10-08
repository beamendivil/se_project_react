import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  // Default values if no weather data provided
  const temperature = weatherData?.temperature ?? 75;

  return (
    <div className="weather-card">
      <div className="weather-temperature">{temperature}°F</div>
      <div className="weather-title">Sprint 10: WTWR</div>
    </div>
  );
}

export default WeatherCard;
