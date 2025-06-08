import React from 'react';
import { MapPin } from 'lucide-react';
import { getWeatherIcon, formatTemp } from '../utils/weatherHelpers';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="glass rounded-2xl p-6 mb-6 fade-in">
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
        <div className="text-6xl mr-4">
          {getWeatherIcon(weather.weather?.[0]?.main)}
        </div>
        <div>
          <div className="text-4xl font-bold text-white">
            {formatTemp(weather.main?.temp)}°C
          </div>
          <div className="text-white/80">
            Feels like {formatTemp(weather.main?.feels_like)}°C
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;