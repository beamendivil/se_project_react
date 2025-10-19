import { APIkey, latitude, longitude } from "./constants";

// Function to get user's current location
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        // Fallback to New York if geolocation fails
        resolve({
          latitude: latitude,
          longitude: longitude,
        });
      }
    );
  });
};

export const getForecastWeather = async () => {
  try {
    const location = await getCurrentLocation();
    const weatherPromise = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${APIkey}`
    ).then(processServerResponse);

    return weatherPromise;
  } catch (error) {
    // Fallback to New York coordinates if location fails
    const weatherPromise = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
    ).then(processServerResponse);

    return weatherPromise;
  }
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const city = data.name;
  const condition = data.weather[0]?.main || "Clear";

  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
    city: city,
    condition: condition,
    weatherType: getWeatherCondition(temperature),
  };
  return weather;
};

export const getWeatherCondition = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};
