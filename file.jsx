import React, { useState, useEffect } from 'react';
import {
  Cloud, Sun, CloudRain, CloudSnow,
  Wind, Eye, Droplets, Thermometer,
  MapPin, Search, Loader2
} from 'lucide-react';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('Sydney');

  const API_KEY = 'your_api_key_here'; // <-- Replace with your actual API key
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const getWeatherIcon = (weatherMain, size = 'w-16 h-16') => {
    const iconProps = { className: `${size} text-white drop-shadow-lg` };

    switch (weatherMain?.toLowerCase()) {
      case 'clear':
        return <Sun {...iconProps} className={`${iconProps.className} text-yellow-300`} />;
      case 'clouds':
        return <Cloud {...iconProps} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain {...iconProps} className={`${iconProps.className} text-blue-300`} />;
      case 'snow':
        return <CloudSnow {...iconProps} className={`${iconProps.className} text-blue-100`} />;
      default:
        return <Cloud {...iconProps} />;
    }
  };

  const getBackgroundGradient = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case 'clear':
        return 'from-blue-400 via-blue-500 to-blue-600';
      case 'clouds':
        return 'from-gray-400 via-gray-500 to-gray-600';
      case 'rain':
      case 'drizzle':
        return 'from-gray-600 via-gray-700 to-gray-800';
      case 'snow':
        return 'from-blue-200 via-blue-300 to-blue-400';
      default:
        return 'from-blue-400 via-blue-500 to-blue-600';
    }
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Weather data not found');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please check the city name and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (city.trim()) {
      setSearchCity(city.trim());
      fetchWeather(city.trim());
    }
  };

  useEffect(() => {
    fetchWeather(searchCity);
  }, []);

  const weatherMain = weather?.weather?.[0]?.main;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(weatherMain)} p-4`}>
      <div className="max-w-md mx-auto">

        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-white mb-2">Weather App</h1>
          <p className="text-white/80">Get current weather conditions</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              placeholder="Enter city name..."
              className="w-full px-4 py-3 pr-12 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-md rounded-lg border border-red-300/30">
            <p className="text-white text-center">{error}</p>
          </div>
        )}

        {weather && !loading && (
          <div className="space-y-6">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="w-5 h-5 text-white/80 mr-2" />
                  <h2 className="text-xl font-semibold text-white">
                    {weather.name}, {weather.sys?.country}
                  </h2>
                </div>
                <p className="text-white/80 capitalize">
                  {weather.weather?.[0]?.description}
                </p>
              </div>

              <div className="flex items-center justify-center mb-6">
                {getWeatherIcon(weatherMain, 'w-20 h-20')}
                <div className="ml-4">
                  <div className="text-4xl font-bold text-white">
                    {Math.round(weather.main?.temp)}°C
                  </div>
                  <div className="text-white/80">
                    Feels like {Math.round(weather.main?.feels_like)}°C
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                <div className="flex items-center mb-2">
                  <Wind className="w-5 h-5 text-white/80 mr-2" />
                  <span className="text-white/80 text-sm">Wind Speed</span>
                </div>
                <div className="text-xl font-semibold text-white">
                  {weather.wind?.speed} m/s
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                <div className="flex items-center mb-2">
                  <Droplets className="w-5 h-5 text-white/80 mr-2" />
                  <span className="text-white/80 text-sm">Humidity</span>
                </div>
                <div className="text-xl font-semibold text-white">
                  {weather.main?.humidity}%
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                <div className="flex items-center mb-2">
                  <Eye className="w-5 h-5 text-white/80 mr-2" />
                  <span className="text-white/80 text-sm">Visibility</span>
                </div>
                <div className="text-xl font-semibold text-white">
                  {(weather.visibility / 1000).toFixed(1)} km
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                <div className="flex items-center mb-2">
                  <Thermometer className="w-5 h-5 text-white/80 mr-2" />
                  <span className="text-white/80 text-sm">Pressure</span>
                </div>
                <div className="text-xl font-semibold text-white">
                  {weather.main?.pressure} hPa
                </div>
              </div>
            </div>
          </div>  
        )}

        {loading && (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
            <p className="text-white/80">Loading weather data...</p>
          </div>
        )}

        <div className="text-center mt-12 pb-8">
          <p className="text-white/60 text-sm">
            Built with React • Powered by OpenWeatherMap
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
