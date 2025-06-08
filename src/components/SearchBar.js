import React, { useState } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSearch(null, position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          placeholder="Enter city name..."
          className="w-full px-4 py-3 pr-20 rounded-lg glass text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 smooth-transition"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
          <button
            onClick={handleGeolocation}
            className="p-2 text-white/80 hover:text-white smooth-transition"
            title="Use current location"
          >
            <MapPin className="w-5 h-5" />
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="p-2 text-white/80 hover:text-white smooth-transition"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;