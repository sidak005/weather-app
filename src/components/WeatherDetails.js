import React from 'react';
import { Wind, Eye, Droplets, Thermometer } from 'lucide-react';
import { formatWindSpeed } from '../utils/weatherHelpers';

const WeatherDetails = ({ weather }) => {
  if (!weather) return null;

  const details = [
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${formatWindSpeed(weather.wind?.speed)} m/s`
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${weather.main?.humidity}%`
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${(weather.visibility / 1000).toFixed(1)} km`
    },
    {
      icon: Thermometer,
      label: 'Pressure',
      value: `${weather.main?.pressure} hPa`
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 fade-in">
      {details.map((detail, index) => {
        const IconComponent = detail.icon;
        return (
          <div key={index} className="glass rounded-xl p-4 smooth-transition hover:scale-105">
            <div className="flex items-center mb-2">
              <IconComponent className="w-5 h-5 text-white/80 mr-2" />
              <span className="text-white/80 text-sm">{detail.label}</span>
            </div>
            <div className="text-xl font-semibold text-white">
              {detail.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherDetails;