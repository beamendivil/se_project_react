# WTWR (What to Wear?)

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Technologies Used

- **React 18.3.1** - Frontend library for building user interfaces
- **Vite 7.1.9** - Build tool and development server
- **OpenWeatherMap API** - Weather data provider
- **CSS3** - Styling with CSS Grid and Flexbox
- **JavaScript ES6+** - Modern JavaScript features
- **Geolocation API** - User location detection
- **Cabinet Grotesk** - Custom typography

## Features

- **Real-time Weather Data** - Fetches current weather based on user location
- **Location-based Recommendations** - Shows appropriate clothing for current weather
- **Interactive UI** - Add new clothing items through modal forms
- **Responsive Design** - Works on desktop and mobile devices
- **Weather Filtering** - Displays clothing items based on weather conditions (hot, warm, cold)
- **Like Functionality** - Heart icons on clothing cards
- **User Avatar** - Displays user profile with custom avatar
- **Geolocation Fallback** - Defaults to New York if location access denied

## Installation

1. Clone the repository:

```bash
git clone https://github.com/beamendivil/se_project_react.git
```

2. Navigate to the project directory:

```bash
cd se_project_react
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint code quality checks
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

## Project Structure

```
src/
├── components/          # React components
│   ├── App.jsx         # Main application component
│   ├── Header.jsx      # Header with navigation and user info
│   ├── Main.jsx        # Main content area
│   ├── WeatherCard.jsx # Weather display component
│   ├── ItemCard.jsx    # Individual clothing item cards
│   ├── ModalWithForm.jsx # Modal for adding new items
│   ├── ItemModal.jsx   # Modal for viewing item details
│   └── Footer.jsx      # Footer component
├── utils/              # Utility functions
│   ├── weatherApi.js   # Weather API integration
│   ├── constants.js    # API keys and configuration
│   └── defaultClothingItems.js # Default clothing data
├── assets/             # Images and static files
└── vendor/             # Third-party CSS (normalize.css)
```

## API Configuration

The app uses the OpenWeatherMap API. The API key is stored in `src/utils/constants.js`:

```javascript
const APIkey = "your-api-key-here";
const latitude = 40.7128; // Default NYC coordinates
const longitude = -74.006;
```

## Weather Conditions

The app categorizes weather into three types:

- **Hot** - 86°F and above
- **Warm** - 66°F to 85°F
- **Cold** - Below 66°F

## Deployment

The application is deployed on GitHub Pages. To deploy:

```bash
npm run deploy
```

## Links

- [Live Demo](https://beamendivil.github.io/se_project_react/)
- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)

## Author

**Bea Mendivil**

- GitHub: [@beamendivil](https://github.com/beamendivil)
