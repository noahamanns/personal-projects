export const getWeatherData = async (cityName) => {
    console.log('Fetching weather for:', cityName);

    const response = await fetch(
        `https://weather-server-production-c15e.up.railway.app/api/weather?city=${cityName}`
    );
    return response.json();
};