import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import { getCurrentWeather, getWeatherByCoords } from './utils/api';
import { getBackgroundGradient, getCurrentDateTime } from './utils/weatherHelpers';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (city, lat, lon) => {
    setLoading(true);
    setError('');
    
    try {
      let data;
      if (lat && lon) {
        data = await getWeatherByCoords(lat, lon);
      } else {
        data = await getCurrentWeather(city);
      }
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load default city on app start
    handleSearch('Sydney');
  }, []);

  const weatherMain = weather?.weather?.[0]?.main;
  const backgroundGradient = getBackgroundGradient(weatherMain);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} p-4 smooth-transition`}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-white mb-2">Weather App</h1>
          <p className="text-white/80">{getCurrentDateTime()}</p>
        </div>

        {/* Search */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 glass rounded-lg fade-in">
            <p className="text-white text-center">{error}</p>
          </div>
        )}

        {/* Weather Display */}
        {weather && !loading && (
          <div className="space-y-6">
            <WeatherCard weather={weather} />
            <WeatherDetails weather={weather} />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/80">Loading weather data...</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <p className="text-white/60 text-sm">
            Built with React • Powered by OpenWeatherMap
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;