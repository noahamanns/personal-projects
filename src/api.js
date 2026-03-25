export const getWeatherData = async (cityName) => {
    console.log('Fetching weather for:', cityName);

    const response = await fetch(
        `https://weather-server-vwqu.onrender.com/api/weather?city=${cityName}`
    );
    return response.json();
};