const API_KEY = 'b50f31873318fd0dc312b89d71917afa'
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const getCurrentWeather = async (city) => {
  try {
    console.log(`Fetching weather for: ${city}`);
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
    console.log(`Request URL: ${url}`);
    
    const response = await fetch(url);
    console.log(`Response status: ${response.status}`);
    
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      console.error('OpenWeather error:', data);
      throw new Error(data.message || 'Weather data not found');
    }

    return data;
  } catch (error) {
    console.error('Network or API error:', error.message);
    throw error;
  }
};


// Get weather by coordinates
export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

// Get 5-day forecast
export const getForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Forecast data not found');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};