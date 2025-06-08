// Get weather icon based on condition
export const getWeatherIcon = (weatherMain) => {
  const iconMap = {
    clear: '☀️',
    clouds: '☁️',
    rain: '🌧️',
    drizzle: '🌦️',
    thunderstorm: '⛈️',
    snow: '❄️',
    mist: '🌫️',
    fog: '🌫️',
    haze: '🌫️'
  };
  
  return iconMap[weatherMain?.toLowerCase()] || '☁️';
};

// Get background gradient based on weather
export const getBackgroundGradient = (weatherMain) => {
  const gradientMap = {
    clear: 'from-blue-400 via-blue-500 to-blue-600',
    clouds: 'from-gray-400 via-gray-500 to-gray-600',
    rain: 'from-gray-600 via-gray-700 to-gray-800',
    drizzle: 'from-blue-500 via-blue-600 to-blue-700',
    thunderstorm: 'from-gray-800 via-gray-900 to-black',
    snow: 'from-blue-200 via-blue-300 to-blue-400',
    mist: 'from-gray-300 via-gray-400 to-gray-500',
    fog: 'from-gray-300 via-gray-400 to-gray-500',
    haze: 'from-yellow-200 via-yellow-300 to-yellow-400'
  };
  
  return gradientMap[weatherMain?.toLowerCase()] || 'from-blue-400 via-blue-500 to-blue-600';
};

// Format temperature
export const formatTemp = (temp) => {
  return Math.round(temp);
};

// Format wind speed
export const formatWindSpeed = (speed) => {
  return Math.round(speed * 10) / 10;
};

// Get current date and time
export const getCurrentDateTime = () => {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return now.toLocaleDateString('en-US', options);
};